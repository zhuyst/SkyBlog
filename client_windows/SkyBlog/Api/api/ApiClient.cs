using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RestSharp;
using Api.model;

namespace Api
{
    public class ApiClient
    {
        private static readonly string AUTH_HEADER = "Token";

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

        public DataResult<T> Get<T>(RestRequest request) where T : BaseModel,new()
        {
            HandleRequest(request);
            return _client.Get<DataResult<T>>(request).Data;
        }

        public DataResult<T> Post<T>(RestRequest request) where T : BaseModel, new()
        {
            HandleRequest(request);
            return _client.Post<DataResult<T>>(request).Data;
        }

        public DataResult<T> Put<T>(RestRequest request) where T : BaseModel, new()
        {
            HandleRequest(request);
            return _client.Put<DataResult<T>>(request).Data;
        }

        public DataResult<T> Patch<T>(RestRequest request) where T : BaseModel, new()
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

        private void HandleRequest(RestRequest request)
        {
            request.AddHeader(AUTH_HEADER, Token);
        }
    }
}
