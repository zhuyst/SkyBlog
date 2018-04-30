namespace SkyBlog.Model.Base
{
    public class DataResult<T> : Result where T : BaseModel,new()
    {
        public T Entity { get; set; }
    }
}
