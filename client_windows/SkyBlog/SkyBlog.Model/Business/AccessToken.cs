namespace SkyBlog.Model.Business
{
    /// <summary>
    /// 授权令牌
    /// </summary>
    public class AccessToken
    {
        /// <summary>
        /// 令牌字符串，应放入Header中
        /// </summary>
        public string Token { get; set; }

        /// <summary>
        /// 过期时间
        /// </summary>
        public int Expire { get; set; }

        /// <summary>
        /// 授权的用户对象
        /// </summary>
        public User User { get; set; }
    }
}
