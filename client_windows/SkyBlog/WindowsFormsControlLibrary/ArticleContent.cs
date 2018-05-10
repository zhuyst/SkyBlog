using System.Resources;
using System.Web;
using WindowsFormsControlLibrary.Properties;
using DSkin.Controls;
using Markdig;

namespace WindowsFormsControlLibrary
{
    public partial class ArticleContent : DSkinHtmlLabel
    {
        /// <summary>
        /// CSS文本
        /// </summary>
        private static readonly string _css;

        public ArticleContent()
        {
            InitializeComponent();
        }

        static ArticleContent()
        {
            // 读取CSS文件
            var manager = new ResourceManager("WindowsFormsControlLibrary.Properties.Resources",
                typeof(Resources).Assembly);
            _css = manager.GetString("markdown");
        }

        /// <summary>
        /// Markdown转HTML
        /// </summary>
        public void Convert()
        {
            BaseStylesheet = _css;
            var result = Markdown.ToHtml(Text);
            result = HttpUtility.HtmlDecode(result);
            Text = $@"<div>{result}</div>";
        }
    }
}
