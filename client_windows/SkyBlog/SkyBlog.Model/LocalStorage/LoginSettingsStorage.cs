namespace SkyBlog.Model.LocalStorage
{
    public class LoginSettingsStorage : IStorable
    {
        public const string FileName = "login.json";

        public bool RemeberMe { get; set; }

        public bool AutoLogin { get; set; }

        public string Token { get; set; }

        public string GetFileName()
        {
            return FileName;
        }
    }
}
