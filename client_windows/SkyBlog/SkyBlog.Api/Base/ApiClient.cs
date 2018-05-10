using System.Configuration;
using RestSharp;
using SkyBlog.Model.Base;

namespace SkyBlog.Api.Base
{
    public class ApiClient
    {
        private const string AuthHeader = "Token";

        private readonly RestClient _client;

        private static ApiClient _instance;

        public string Token { get; set; }

        private ApiClient()
        {
            var apiServerUrl = ConfigurationManager.ConnectionStrings["apiServerUrl"].ConnectionString;
            _client = new RestClient(apiServerUrl);
        }

        public static ApiClient GetInstance()
        {
            return _instance ?? (_instance = new ApiClient());
        }

        public DataResult<T> Get<T>(RestRequest request) where T : new()
        {
            HandleRequest(request);
            return _client.Get<DataResult<T>>(request).Data;
        }

        public DataResult<T> Post<T>(RestRequest request) where T : new()
        {
            HandleRequest(request);
            return _client.Post<DataResult<T>>(request).Data;
        }

        public DataResult<T> Put<T>(RestRequest request) where T : new()
        {
            HandleRequest(request);
            return _client.Put<DataResult<T>>(request).Data;
        }

        public DataResult<T> Patch<T>(RestRequest request) where T : new()
        {
            HandleRequest(request);
            return _client.Patch<DataResult<T>>(request).Data;
        }

        public Result Delete(RestRequest request)
        {
            HandleRequest(request);
            return _client.Delete<Result>(request).Data;
        }

        public RestClient GetRestClient()
        {
            return _client;
        }

        private void HandleRequest(IRestRequest request)
        {
            request.AddHeader(AuthHeader, Token);
        }
    }
}
