using Ecommerce.Data;
using Ecommerce.Data.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stripe;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Ecommerce.Features.Orders
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly EcommerceContext _db;

        public OrdersController(EcommerceContext db)
        {
            this._db = db;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateOrderViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var user = await _db.Users.SingleAsync(x => x.UserName == HttpContext.User.Identity.Name);
            var order = new Data.Entities.Order
            {
                DeliveryAddress = new Data.Entities.Address
                {
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    Address1 = model.Address1,
                    Address2 = model.Address2,
                    TownCity = model.TownCity,
                    County = model.County,
                    Postcode = model.Postcode
                },
                Items = model.Items.Select(x => new Data.Entities.OrderItem
                {
                    ProductId = x.ProductId,
                    ColourId = x.ColourId,
                    StorageId = x.StorageId,
                    Quantity = x.Quantity
                }).ToList()
            };
            user.Orders.Add(order);
            await _db.SaveChangesAsync();

            var total = await _db.Orders
                .Where(x => x.Id == order.Id)
                .Select(x => Convert.ToInt32(x.Items.Sum(i => i.ProductVariant.Price * i.Quantity) * 100))
                .SingleAsync();

            //var charges = new StripeChargeService();
            //var charge = await charges.CreateAsync(new StripeChargeCreateOptions
            //{
            //    Amount = total,
            //    Description = $"Order {order.Id} payment",
            //    Currency = "GBP",
            //    SourceTokenOrExistingSourceId = model.StripeToken
            //});
            //if (string.IsNullOrEmpty(charge.FailureCode))
            //{
            //    order.PaymentStatus = PaymentStatus.Paid;
            //}
            //else
            //{
            //    order.PaymentStatus = PaymentStatus.Declined;
            //}

            var options = new ChargeCreateOptions
            {
                Amount = total,
                Description = $"Order {order.Id} payment",
                Currency = "GBP",
                Source = model.StripeToken
            };

            var service = new ChargeService();
            var charge = service.Create(options);
            if (string.IsNullOrEmpty(charge.FailureCode))
            {
                order.PaymentStatus = PaymentStatus.Paid;
            }
            else
            {
                order.PaymentStatus = PaymentStatus.Declined;
            }

            await _db.SaveChangesAsync();
            return Ok(new CreateOrderResponseViewModel(order.Id, order.PaymentStatus));
        }
    }
}
