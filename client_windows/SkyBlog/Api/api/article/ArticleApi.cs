using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using RestSharp;
using Api.api.article.model;
using Api.model;

namespace Api.api.article
{
    public class ArticleApi
    {
        private static readonly string ARTICLE_API_URL = "/articles";

        private ApiClient _client;

        private static ArticleApi _instance;

        private ArticleApi()
        {
            _client = ApiClient.GetInstance();
        }

        public static ArticleApi GetInstance()
        {
            return _instance ?? (_instance = new ArticleApi());
        }

        public DataResult<Article> Get(int id)
        {
            var url = ARTICLE_API_URL + "/public/{id}";
            var request = new RestRequest(url);

            request.AddUrlSegment("id", id);

            return _client.Get<Article>(request);
        }

        public DataResult<PageInfo<Article>> List(int pageNum, int pageSize)
        {
            var url = ARTICLE_API_URL + "/public/list/";
            var request = new RestRequest(url);

            request.AddQueryParameter("pageNum", pageNum.ToString());
            request.AddQueryParameter("pageSize", pageSize.ToString());

            return _client.Get<PageInfo<Article>>(request);
        }

        public DataResult<Article> Update(Article article)
        {
            var url = ARTICLE_API_URL + "/" + article.Id;
            var request = new RestRequest(url);

            request.AddJsonBody(GetArticleJson(article));

            return _client.Put<Article>(request);
        }

        public DataResult<Article> Insert(Article article)
        {
            var url = ARTICLE_API_URL + "/";
            var request = new RestRequest(url);

            request.AddJsonBody(GetArticleJson(article));

            return _client.Post<Article>(request);
        }

        public Result Delete(int id)
        {
            var url = ARTICLE_API_URL + "/";
            var request = new RestRequest(url);
            return _client.Delete(request);
        }

        private object GetArticleJson(Article article)
        {
            return new
            {
                title = article.Title,
                sub_title = article.SubTitle,
                content = article.Content
            };
        }
    }
}
