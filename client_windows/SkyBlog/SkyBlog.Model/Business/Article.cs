namespace SkyBlog.Model.Business
{
    public class Article
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string SubTitle { get; set; }

        public int AuthorId { get; set; }

        public User Author { get; set; }

        public int ClassifyId { get; set; }

        public Classify Classify { get; set; }

        public string Content { get; set; }

        public string CreateDate { get; set; }

        public string UpdateDate { get; set; }
    }
}
