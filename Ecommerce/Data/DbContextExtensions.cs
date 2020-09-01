using Ecommerce.Data.Entities;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ecommerce.Data
{
    public static class DbContextExtensions
    {
        public static UserManager<AppUser> UserManager { get; set; }

        public static void EnsureSeeded(this EcommerceContext context)
        {
            if (UserManager.FindByEmailAsync("stu@ratcliffe.io")
                .GetAwaiter().GetResult() == null)
            {
                var user = new AppUser
                {
                    FirstName = "Stu",
                    LastName = "Ratcliffe",
                    UserName = "stu@ratcliffe.io",
                    Email = "stu@ratcliffe.io",
                    EmailConfirmed = true,
                    LockoutEnabled = false
                };
                UserManager.CreateAsync(user, "Password1*")
                    .GetAwaiter().GetResult();
            }

            AddProducts(context);
        }

        private static void AddProducts(EcommerceContext context)
        {
            if (context.Products.Any() == false)
            {
                var products = new List<Product>()
                {
                    new Product
                    {
                        Name = "Samsung Galaxy S1",
                        Slug = "samsung-galaxy-s1",
                        Thumbnail = "https://via.placeholder.com/200x300",
                        ShortDescription =
                            "Samsung Galaxy S8 Android smartphone with true edge to edge display",
                        Price = 499.99M,
                        Description =
                            "sdjfa sjd;lkfj ;aejsahd fwejermmc k,sdjfwk eqwh ekfafj;asj d;jd; k;ek4njfd jdcu ygsdf uuayds asdfhehty sdfeh sdbdb.sdhfsa sadhfeh,sdh sdfh ahdse.",
                    },
                    new Product
                    {
                        Name = "Samsung Galaxy S2",
                        Slug = "samsung-galaxy-s2",
                        Thumbnail = "https://via.placeholder.com/200x300",
                        ShortDescription =
                            "Samsung Galaxy S8 Android smartphone with true edge to edge display",
                        Price = 499.99M,
                        Description =
                            "sdjfa sjd;lkfj ;aejsahd fwejermmc k,sdjfwk eqwh ekfafj;asj d;jd; k;ek4njfd jdcu ygsdf uuayds asdfhehty sdfeh sdbdb.sdhfsa sadhfeh,sdh sdfh ahdse.",
                    },
                    new Product
                    {
                        Name = "Samsung Galaxy S3",
                        Slug = "samsung-galaxy-s3",
                        Thumbnail = "https://via.placeholder.com/200x300",
                        ShortDescription =
                            "Samsung Galaxy S8 Android smartphone with true edge to edge display",
                        Price = 499.99M,
                        Description =
                            "sdjfa sjd;lkfj ;aejsahd fwejermmc k,sdjfwk eqwh ekfafj;asj d;jd; k;ek4njfd jdcu ygsdf uuayds asdfhehty sdfeh sdbdb.sdhfsa sadhfeh,sdh sdfh ahdse.",
                    },
                    new Product
                    {
                        Name = "Samsung Galaxy S4",
                        Slug = "samsung-galaxy-s4",
                        Thumbnail = "https://via.placeholder.com/200x300",
                        ShortDescription =
                            "Samsung Galaxy S8 Android smartphone with true edge to edge display",
                        Price = 499.99M,
                        Description =
                            "sdjfa sjd;lkfj ;aejsahd fwejermmc k,sdjfwk eqwh ekfafj;asj d;jd; k;ek4njfd jdcu ygsdf uuayds asdfhehty sdfeh sdbdb.sdhfsa sadhfeh,sdh sdfh ahdse.",
                    },
                };
                context.Products.AddRange(products);
                context.SaveChanges();
            }
        }
    }
}
