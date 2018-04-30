using System.Diagnostics;
using Newtonsoft.Json;
using SkyBlog.Api.Business;
using SkyBlog.Model;
using SkyBlog.Model.Base;
using SkyBlog.Model.Business;

namespace SkyBlog.Api
{
    class Program
    {
        static void Main(string[] args)
        {
            var authApi = AuthApi.GetInstance();
            var articleApi = ArticleApi.GetInstance();

            DataResult<PageInfo<Article>> result = articleApi.List(1, 10);
            string json = JsonConvert.SerializeObject(result);
            Debug.WriteLine(json);
        }
    }
}
