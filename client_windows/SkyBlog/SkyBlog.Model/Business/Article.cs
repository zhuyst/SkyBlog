namespace SkyBlog.Model.Business
{
    /// <summary>
    /// 文章
    /// </summary>
    public class Article
    {
        /// <summary>
        /// 唯一标识
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// 标题
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// 副标题
        /// </summary>
        public string SubTitle { get; set; }

        /// <summary>
        /// 作者ID
        /// </summary>
        public int AuthorId { get; set; }

        /// <summary>
        /// 作者对象
        /// </summary>
        public User Author { get; set; }

        /// <summary>
        /// 分类ID
        /// </summary>
        public int ClassifyId { get; set; }

        /// <summary>
        /// 分类对象
        /// </summary>
        public Classify Classify { get; set; }

        /// <summary>
        /// 内容（Markdown）
        /// </summary>
        public string Content { get; set; }

        /// <summary>
        /// 创建日期
        /// </summary>
        public string CreateDate { get; set; }

        /// <summary>
        /// 最后一次修改日期
        /// </summary>
        public string UpdateDate { get; set; }
    }
}
