using RestSharp;
using SkyBlog.Api.Base;
using SkyBlog.Model.Base;
using SkyBlog.Model.Business;

namespace SkyBlog.Api.Business
{
    public class AuthApi
    {
        private const string AuthApiUrl = "/auth";

        private readonly ApiClient _client;

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
            const string url = AuthApiUrl + "/login";
            var request = new RestRequest(url);

            request.AddParameter("username", username);
            request.AddParameter("password", password);

            return _client.Post<AccessToken>(request);
        }

        public DataResult<AccessToken> Refresh(string token)
        {
            const string url = AuthApiUrl + "/refresh";
            var request = new RestRequest(url);

            request.AddParameter("Token", token);

            return _client.Post<AccessToken>(request);
        }
    }
}
