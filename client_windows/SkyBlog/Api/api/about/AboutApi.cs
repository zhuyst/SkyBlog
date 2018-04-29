using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RestSharp;

namespace Api.api.about
{
    public class AboutApi
    {
        private static readonly string ABOUT_API_URL = "/about";

        private ApiClient _client;

        private static AboutApi _instance;

        private AboutApi()
        {
            _client = ApiClient.GetInstance();
        }

        public static AboutApi GetInstance()
        {
            return _instance ?? (_instance = new AboutApi());
        }

        public DataResult<About> Get()
        {
            var url = ABOUT_API_URL + "/";
            var request = new RestRequest(url);
            return _client.Get<About>(request);
        }

        public DataResult<About> Update(About about)
        {
            var url = ABOUT_API_URL + "/";
            var request = new RestRequest(url);

            request.AddJsonBody(new
            {
                content = about.Content
            });

            return _client.Put<About>(request);
        }
    }
}
