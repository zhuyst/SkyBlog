using RestSharp;
using SkyBlog.Api.Base;
using SkyBlog.Model.Base;
using SkyBlog.Model.Business;

namespace SkyBlog.Api.Business
{
    /// <summary>
    /// 关于API
    /// </summary>
    public class AboutApi
    {
        private const string AboutApiUrl = "/about";

        private readonly ApiClient _client;

        private static AboutApi _instance;

        private AboutApi()
        {
            _client = ApiClient.GetInstance();
        }

        public static AboutApi GetInstance()
        {
            return _instance ?? (_instance = new AboutApi());
        }

        /// <summary>
        /// 获取关于
        /// </summary>
        /// <returns>关于</returns>
        public DataResult<About> Get()
        {
            const string url = AboutApiUrl + "/";
            var request = new RestRequest(url);
            return _client.Get<About>(request);
        }

        /// <summary>
        /// 更新关于
        /// </summary>
        /// <param name="about">关于</param>
        /// <returns>更新后的关于</returns>
        public DataResult<About> Update(About about)
        {
            const string url = AboutApiUrl + "/";
            var request = new RestRequest(url);

            request.AddJsonBody(new
            {
                content = about.Content
            });

            return _client.Put<About>(request);
        }
    }
}
