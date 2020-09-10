using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Ecommerce.Data.Entities
{
    public class Image
    {
        public int Id { get; set; }

        public int ProductId { get; set; }

        [Required]
        public string Url { get; set; }

        public Product Product { get; set; }
    }
}
