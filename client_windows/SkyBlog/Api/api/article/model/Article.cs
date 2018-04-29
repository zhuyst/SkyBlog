using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Api.api.classify.model;
using Api.api.user.model;
using Api.model;

namespace Api.api.article.model
{
    public class Article : BaseModel
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
