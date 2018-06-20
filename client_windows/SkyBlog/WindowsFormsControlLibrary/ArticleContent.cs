using System.Resources;using WindowsFormsControlLibrary.Properties;
using DSkin.Controls;
using Markdig;

namespace WindowsFormsControlLibrary
{
    /// <summary>
    /// Markdown文章
    /// </summary>
    public partial class ArticleContent : DSkinHtmlLabel
    {
        /// <summary>
        /// CSS文本
        /// </summary>
        private static readonly string Css;

        public ArticleContent()
        {
            InitializeComponent();
        }

        static ArticleContent()
        {
            // 读取CSS文件
            var manager = new ResourceManager("WindowsFormsControlLibrary.Properties.Resources",
                typeof(Resources).Assembly);
            Css = manager.GetString("markdown");
        }

        /// <summary>
        /// Markdown转HTML
        /// </summary>
        public void Convert()
        {
            BaseStylesheet = Css;
            var result = Markdown.ToHtml(Text);

            // 处理HtmlLabel无法响应<pre>导致的问题
            result = result.Replace("&lt;", "[").Replace("&gt;", "]");

            Text = $@"<div>{result}</div>";
        }
    }
}
