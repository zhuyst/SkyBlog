using RestSharp;
using SkyBlog.Api.Base;
using SkyBlog.Model.Base;
using SkyBlog.Model.Business;

namespace SkyBlog.Api.Business
{
    public class ArticleApi
    {
        private const string ArticleApiUrl = "/articles";

        private readonly ApiClient _client;

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
            const string url = ArticleApiUrl + "/public/{id}";
            var request = new RestRequest(url);

            request.AddUrlSegment("id", id);

            return _client.Get<Article>(request);
        }

        public DataResult<PageInfo<Article>> List(int pageNum, int pageSize)
        {
            const string url = ArticleApiUrl + "/public/list/";
            var request = new RestRequest(url);

            request.AddQueryParameter("pageNum", pageNum.ToString());
            request.AddQueryParameter("pageSize", pageSize.ToString());

            return _client.Get<PageInfo<Article>>(request);
        }

        public DataResult<Article> Update(Article article)
        {
            const string url = ArticleApiUrl + "/{id}";
            var request = new RestRequest(url);

            request.AddUrlSegment("id",article.Id);
            request.AddJsonBody(GetArticleJson(article));

            return _client.Put<Article>(request);
        }

        public DataResult<Article> Insert(Article article)
        {
            const string url = ArticleApiUrl + "/";
            var request = new RestRequest(url);

            request.AddJsonBody(GetArticleJson(article));

            return _client.Post<Article>(request);
        }

        public Result Delete(int id)
        {
            const string url = ArticleApiUrl + "/";
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
