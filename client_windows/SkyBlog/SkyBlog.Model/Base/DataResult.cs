namespace SkyBlog.Model.Base
{
    /// <inheritdoc />
    /// <summary>
    /// 带对象的返回信息
    /// </summary>
    /// <typeparam name="T">返回的对象类型</typeparam>
    public class DataResult<T> : Result where T : new()
    {
        /// <summary>
        /// 对象实体
        /// </summary>
        public T Entity { get; set; }
    }
}
