namespace SkyBlog.Model.LocalStorage
{
    public class UserStorage : IStorable
    {
        public const string FileName = "user.json";

        public string Username { get; set; }

        public string Password { get; set; }

        public string GetFileName()
        {
            return FileName;
        }
    }
}
