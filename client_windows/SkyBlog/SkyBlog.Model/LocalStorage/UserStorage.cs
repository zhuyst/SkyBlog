namespace SkyBlog.Model.LocalStorage
{
    /// <inheritdoc />
    /// <summary>
    /// 用户信息存储
    /// </summary>
    public class UserStorage : IStorable
    {
        /// <summary>
        /// 存储文件名
        /// </summary>
        public const string FileName = "user.json";

        /// <summary>
        /// 用户名
        /// </summary>
        public string Username { get; set; }

        /// <summary>
        /// 密码
        /// </summary>
        public string Password { get; set; }

        public string GetFileName()
        {
            return FileName;
        }
    }
}
