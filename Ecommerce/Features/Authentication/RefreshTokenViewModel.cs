using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace Ecommerce.Features.Authentication
{
    public class RefreshTokenViewModel
    {
        [Required, JsonProperty("refresh_token")]
        public string RefreshToken { get; set; }
    }
}
