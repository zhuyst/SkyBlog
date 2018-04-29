using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Api.model;

namespace Api
{
    public class DataResult<T> : Result where T : BaseModel,new()
    {
        public T Entity { get; set; }
    }
}
