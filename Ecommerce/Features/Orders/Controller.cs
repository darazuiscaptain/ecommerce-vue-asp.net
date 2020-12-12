using Ecommerce.Data;
using Ecommerce.Data.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        public async Task<IActionResult> Create([FromBody] CreateOrderModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var user = await _db.Users.SingleAsync(x => x.UserName == HttpContext.User.Identity.Name);
            var order = new Order
            {
                DeliveryAddress = new Address
                {
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    Address1 = model.Address1,
                    Address2 = model.Address2,
                    TownCity = model.TownCity,
                    County = model.County,
                    Postcode = model.Postcode
                },
                Items = model.Items.Select(x => new OrderItem
                {
                    ProductId = x.ProductId,
                    ColourId = x.ColourId,
                    StorageId = x.StorageId,
                    Quantity = x.Quantity
                }).ToList()
            };
            user.Orders.Add(order);
            await _db.SaveChangesAsync();
        }
    }
}
