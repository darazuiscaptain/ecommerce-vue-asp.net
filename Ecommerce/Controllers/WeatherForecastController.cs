using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ecommerce.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Ecommerce.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly EcommerceContext _db;

        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, EcommerceContext db)
        {
            _logger = logger;
            this._db = db;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            })
            .ToArray();
        }

        //[HttpPost, Authorize(Roles = "Customer")]
        [HttpPost]
        public async Task<IActionResult> TestUser(Receipt rec)
        {
            var token = HttpContext.Request.Headers["Authorization"];
            var userName = HttpContext.User.Identity.Name;
            var user = await _db.Users.SingleAsync(x => x.UserName == userName);
            var i = 0 ;
            i++;
            return Ok(rec.Test + ": " + user.FullName);
        }
    }

    public class Receipt
    {
        public string Test { get; set; }
    }
}
