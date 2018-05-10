namespace SkyBlog.Model.Base
{
    public class Result
    {
        public const int SuccessCode = 200; 

        public int Code { get; set; }

        public string Message { get; set; }

        public bool IsSuccess()
        {
            return Code == SuccessCode;
        }
    }
}
