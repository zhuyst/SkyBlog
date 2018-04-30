using SkyBlog.Model.Base;

namespace SkyBlog.Model.Business
{
    public class AccessToken : BaseModel
    {
        public string Token { get; set; }

        public string Expire { get; set; }

        public User User { get; set; }
    }
}
