using SkyBlog.Model.Base;

namespace SkyBlog.Model.Business
{
    public class User : BaseModel
    {
        public int Id { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }

        public string Nickname { get; set; }
    }
}
