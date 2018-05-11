using System.Configuration;
using RestSharp;
using SkyBlog.Model.Base;

namespace SkyBlog.Api.Base
{
    /// <summary>
    /// API客户端
    /// </summary>
    public class ApiClient
    {
        /// <summary>
        /// 将放入RequestHeader的Key
        /// </summary>
        private const string AuthHeader = "Token";

        public readonly RestClient Client;

        private static ApiClient _instance;

        /// <summary>
        /// 授权令牌的值，需要赋值
        /// </summary>
        public string Token { get; set; }

        private ApiClient()
        {
            var apiServerUrl = ConfigurationManager.ConnectionStrings["apiServerUrl"].ConnectionString;
            Client = new RestClient(apiServerUrl);
        }

        public static ApiClient GetInstance()
        {
            return _instance ?? (_instance = new ApiClient());
        }

        public DataResult<T> Get<T>(RestRequest request) where T : new()
        {
            HandleRequest(request);
            return Client.Get<DataResult<T>>(request).Data;
        }

        public DataResult<T> Post<T>(RestRequest request) where T : new()
        {
            HandleRequest(request);
            return Client.Post<DataResult<T>>(request).Data;
        }

        public DataResult<T> Put<T>(RestRequest request) where T : new()
        {
            HandleRequest(request);
            return Client.Put<DataResult<T>>(request).Data;
        }

        public DataResult<T> Patch<T>(RestRequest request) where T : new()
        {
            HandleRequest(request);
            return Client.Patch<DataResult<T>>(request).Data;
        }

        public Result Delete(RestRequest request)
        {
            HandleRequest(request);
            return Client.Delete<Result>(request).Data;
        }

        /// <summary>
        /// 处理Request，将Token放入Header
        /// </summary>
        /// <param name="request">要被处理的Request</param>
        private void HandleRequest(IRestRequest request)
        {
            request.AddHeader(AuthHeader, Token);
        }
    }
}
