using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Api.model
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
