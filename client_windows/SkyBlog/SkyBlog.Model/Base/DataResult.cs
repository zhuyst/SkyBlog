namespace SkyBlog.Model.Base
{
    public class DataResult<T> : Result where T : new()
    {
        public T Entity { get; set; }
    }
}
