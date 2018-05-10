namespace SkyBlog.Model.LocalStorage
{
    /// <summary>
    /// 本地存储接口
    /// </summary>
    public interface IStorable
    {
        /// <summary>
        /// 获取存储文件的文件名
        /// </summary>
        /// <returns>存储文件的文件名</returns>
        string GetFileName();
    }
}
