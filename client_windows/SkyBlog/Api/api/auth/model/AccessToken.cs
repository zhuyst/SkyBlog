using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Api.api.user.model;
using Api.model;

namespace Api.api.auth.model
{
    public class AccessToken : BaseModel
    {
        public string Token { get; set; }

        public string Expire { get; set; }

        public User User { get; set; }
    }
}
