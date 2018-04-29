using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using RestSharp;
using Api.api;
using Api.api.article;
using Api.api.article.model;
using Api.api.auth.model;
using Api.model;

namespace Api
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
