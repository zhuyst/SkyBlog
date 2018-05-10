using System.Configuration;
using RestSharp;
using SkyBlog.Model.Base;

namespace SkyBlog.Api.Base
{
    public class ApiClient
    {
        private const string AuthHeader = "Token";

        public readonly RestClient Client;

        private static ApiClient _instance;

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

        private void HandleRequest(IRestRequest request)
        {
            request.AddHeader(AuthHeader, Token);
        }
    }
}
