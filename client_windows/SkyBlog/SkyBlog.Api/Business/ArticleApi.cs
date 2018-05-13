using System;
using RestSharp;
using SkyBlog.Api.Base;
using SkyBlog.Model.Base;
using SkyBlog.Model.Business;

namespace SkyBlog.Api.Business
{
    /// <summary>
    /// 文章API
    /// </summary>
    public class ArticleApi
    {
        private static readonly Lazy<ArticleApi> LInstance = 
            new Lazy<ArticleApi>(() => new ArticleApi());

        public static ArticleApi Instance = LInstance.Value;

        private const string ArticleApiUrl = "/articles";

        private readonly ApiClient _client;

        private ArticleApi()
        {
            _client = ApiClient.Instance;
        }

        /// <summary>
        /// 获取单篇文章
        /// </summary>
        /// <param name="id">文章ID</param>
        /// <returns>文章对象</returns>
        public DataResult<Article> Get(int id)
        {
            const string url = ArticleApiUrl + "/public/{id}";
            var request = new RestRequest(url);

            request.AddUrlSegment("id", id);

            return _client.Get<Article>(request);
        }

        /// <summary>
        /// 获取文章列表（分页）
        /// </summary>
        /// <param name="pageNum">页码</param>
        /// <param name="pageSize">页面大小</param>
        /// <returns>文章列表（分页）</returns>
        public DataResult<PageInfo<Article>> List(int pageNum, int pageSize)
        {
            const string url = ArticleApiUrl + "/public/list/";
            var request = new RestRequest(url);

            request.AddQueryParameter("pageNum", pageNum.ToString());
            request.AddQueryParameter("pageSize", pageSize.ToString());

            return _client.Get<PageInfo<Article>>(request);
        }

        /// <summary>
        /// 更新文章
        /// </summary>
        /// <param name="article">文章对象</param>
        /// <returns>更新后的文章对象</returns>
        public DataResult<Article> Update(Article article)
        {
            const string url = ArticleApiUrl + "/{id}";
            var request = new RestRequest(url);

            request.AddUrlSegment("id",article.Id);
            request.AddJsonBody(GetArticleJson(article));

            return _client.Put<Article>(request);
        }

        /// <summary>
        /// 新增文章
        /// </summary>
        /// <param name="article">文章对象</param>
        /// <returns>新增后的文章对象</returns>
        public DataResult<Article> Insert(Article article)
        {
            const string url = ArticleApiUrl + "/";
            var request = new RestRequest(url);

            request.AddJsonBody(GetArticleJson(article));

            return _client.Post<Article>(request);
        }

        /// <summary>
        /// 删除文章
        /// </summary>
        /// <param name="id">文章ID</param>
        /// <returns>删除结果</returns>
        public Result Delete(int id)
        {
            const string url = ArticleApiUrl + "/{id}";
            var request = new RestRequest(url);

            request.AddUrlSegment("id", id);

            return _client.Delete(request);
        }

        /// <summary>
        /// 转换为文章的JSON对象
        /// </summary>
        /// <param name="article">被转换的文章对象</param>
        /// <returns>转换后的文章对象</returns>
        private static object GetArticleJson(Article article)
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
