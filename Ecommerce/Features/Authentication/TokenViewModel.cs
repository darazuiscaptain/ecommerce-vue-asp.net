﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace Ecommerce.Features.Authentication
{
    public class TokenViewModel
    {
        [JsonProperty("access_token")]
        public string AccessToken { get; set; }
        public DateTime Expiration { get; set; }
        [JsonProperty("refresh_token")]
        public string RefreshToken { get; set; }
        public IEnumerable<string> Roles { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
