namespace SkyBlog.Model.LocalStorage
{
    /// <inheritdoc />
    /// <summary>
    /// 登陆设置存储
    /// </summary>
    public class LoginSettingsStorage : IStorable
    {
        /// <summary>
        /// 存储文件名
        /// </summary>
        public const string FileName = "login.json";

        /// <summary>
        /// 记住密码
        /// </summary>
        public bool RemeberMe { get; set; }

        /// <summary>
        /// 自动登陆
        /// </summary>
        public bool AutoLogin { get; set; }

        /// <summary>
        /// 授权令牌
        /// </summary>
        public string Token { get; set; }

        public string GetFileName()
        {
            return FileName;
        }
    }
}
