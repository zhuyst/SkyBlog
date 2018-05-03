using System.Diagnostics;
using System.Resources;
using System.Web;
using WindowsFormsControlLibrary.Properties;
using DSkin.Controls;
using Markdig;

namespace WindowsFormsControlLibrary
{
    public partial class ArticleContent : DSkinHtmlLabel
    {
        private static string _css;

        public ArticleContent()
        {
            InitializeComponent();

            if (_css != null) return;
            var manager = new ResourceManager("WindowsFormsControlLibrary.Properties.Resources", typeof(Resources).Assembly);
            _css = manager.GetString("markdown");
        }

        public void Convert()
        {
            BaseStylesheet = _css;
            var result = Markdown.ToHtml(Text);
            result = HttpUtility.HtmlDecode(result);
            Text = result;
        }
    }
}
