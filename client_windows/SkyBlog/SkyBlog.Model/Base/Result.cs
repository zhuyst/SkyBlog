namespace SkyBlog.Model.Base
{
    /// <summary>
    /// 返回信息
    /// </summary>
    public class Result
    {
        /// <summary>
        /// 成功状态码
        /// </summary>
        public const int SuccessCode = 200; 

        /// <summary>
        /// 状态码
        /// </summary>
        public int Code { get; set; }

        /// <summary>
        /// 错误信息
        /// </summary>
        public string Message { get; set; }

        /// <summary>
        /// 判断是否成功
        /// </summary>
        /// <returns>是否成功</returns>
        public bool IsSuccess()
        {
            return Code == SuccessCode;
        }
    }
}
