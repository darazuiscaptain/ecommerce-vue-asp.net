﻿using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ecommerce.Features.Products
{
    public class ProductDetailsViewModel
    {
        public int Id { get; set; }
        public string Slug { get; set; }
        public string Name { get; set; }
        public string ShortDescription { get; set; }
        public string Thumbnail { get; set; }
        public IEnumerable<string> Images { get; set; }
        public IEnumerable<string> Features { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public IEnumerable<SelectListItem> Colours { get; set; }
        public IEnumerable<SelectListItem> Storage { get; set; }
        public IEnumerable<ProductVariantViewModel> Variants { get; set; }
    }
}
