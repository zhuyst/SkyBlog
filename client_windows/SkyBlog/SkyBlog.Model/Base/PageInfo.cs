using System.Collections.Generic;

namespace SkyBlog.Model.Base
{
    /// <summary>
    /// 分页信息
    /// </summary>
    /// <typeparam name="T">被分页的类型</typeparam>
    public class PageInfo<T> where T : new()
    {
        /// <summary>
        /// 页码
        /// </summary>
        public int PageNum { get; set; }

        /// <summary>
        /// 总页数
        /// </summary>
        public int Pages { get; set; }

        /// <summary>
        /// 页面大小
        /// </summary>
        public int PageSize { get; set; }

        /// <summary>
        /// 总记录数
        /// </summary>
        public long Total { get; set; }

        /// <summary>
        /// 列表
        /// </summary>
        public List<T> List { get; set; }
    }
}
