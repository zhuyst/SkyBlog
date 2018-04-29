using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RestSharp;
using Api.api.auth.model;

namespace Api.api
{
    public class AuthApi
    {
        private static readonly string AUTH_API_URL = "/auth";

        private ApiClient _client;

        private static AuthApi _instance;

        private AuthApi()
        {
            _client = ApiClient.GetInstance();
        }

        public static AuthApi GetInstance()
        {
            return _instance ?? (_instance = new AuthApi());
        }

        public DataResult<AccessToken> Login(string username,string password)
        {
            var url = AUTH_API_URL + "/login";
            var request = new RestRequest(url);

            request.AddParameter("username", username);
            request.AddParameter("password", password);

            return _client.Post<AccessToken>(request);
        }

        public DataResult<AccessToken> Refresh(string token)
        {
            var url = AUTH_API_URL + "/refresh";
            var request = new RestRequest(url);

            request.AddParameter("Token", token);

            return _client.Post<AccessToken>(request);
        }
    }
}
