using System;
using RestSharp;
using SkyBlog.Api.Base;
using SkyBlog.Model.Base;
using SkyBlog.Model.Business;

namespace SkyBlog.Api.Business
{
    /// <summary>
    /// 授权API
    /// </summary>
    public class AuthApi
    {
        private static readonly Lazy<AuthApi> LInstance = 
            new Lazy<AuthApi>(() => new AuthApi());

        public static AuthApi Instance = LInstance.Value;

        private const string AuthApiUrl = "/auth";

        private readonly ApiClient _client;

        private AuthApi()
        {
            _client = ApiClient.Instance;
        }

        /// <summary>
        /// 登陆
        /// </summary>
        /// <param name="username">用户名</param>
        /// <param name="password">密码</param>
        /// <returns>授权Token</returns>
        public DataResult<AccessToken> Login(string username,string password)
        {
            const string url = AuthApiUrl + "/login";
            var request = new RestRequest(url);

            request.AddParameter("username", username);
            request.AddParameter("password", password);

            var result = _client.Post<AccessToken>(request);
            SetToken(result);
            return result;
        }

        /// <summary>
        /// 刷新Token，使用老Token换取新Token
        /// </summary>
        /// <param name="token">老Token</param>
        /// <returns>新Token</returns>
        public DataResult<AccessToken> Refresh(string token)
        {
            const string url = AuthApiUrl + "/refresh";
            var request = new RestRequest(url);

            request.AddParameter("Token", token);

            var result = _client.Post<AccessToken>(request);
            SetToken(result);
            return result;
        }

        /// <summary>
        /// 为<see cref="ApiClient"/>设置Token
        /// </summary>
        /// <param name="result">Token对象</param>
        private void SetToken(DataResult<AccessToken> result)
        {
            if (result.IsSuccess())
            {
                _client.Token = result.Entity.Token;
            }
        }
    }
}
