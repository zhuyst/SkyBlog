using System.Collections.Generic;

namespace SkyBlog.Model.Base
{
    public class PageInfo<T> : BaseModel where T : BaseModel, new()
    {
        public int PageNum { get; set; }

        public int Pages { get; set; }

        public int PageSize { get; set; }

        public long Total { get; set; }

        public List<T> List { get; set; }
    }
}
