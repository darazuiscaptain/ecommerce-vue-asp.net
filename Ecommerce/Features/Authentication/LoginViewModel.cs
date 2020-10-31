using System.ComponentModel.DataAnnotations;

namespace Ecommerce.Features.Authentication
{
    public class LoginViewModel
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
