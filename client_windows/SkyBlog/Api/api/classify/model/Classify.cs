using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Api.model;

namespace Api.api.classify.model
{
    public class Classify : BaseModel
    {
        public int Id { get; set; }

        public string Name { get; set; }
    }
}
