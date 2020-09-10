using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Ecommerce.Data.Entities
{
    public class Colour
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public List<ProductVariant> ProductVariants { get; set; } =
            new List<ProductVariant>();
    }
}
