using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Ecommerce.Data.Entities
{
    public class Feature
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public List<ProductFeature> ProductFeatures { get; set; } =
            new List<ProductFeature>();
    }
}
