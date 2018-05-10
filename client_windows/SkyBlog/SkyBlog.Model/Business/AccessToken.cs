namespace SkyBlog.Model.Business
{
    public class AccessToken
    {
        public string Token { get; set; }

        public string Expire { get; set; }

        public User User { get; set; }
    }
}
