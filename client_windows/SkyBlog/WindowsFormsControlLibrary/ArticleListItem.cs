using System;
using System.Drawing;
using System.Diagnostics;
using System.Windows.Forms;
using DSkin.DirectUI;
using SkyBlog.Model.Business;

namespace WindowsFormsControlLibrary
{
    public partial class ArticleListItem : DuiBaseControl
    {
        private readonly string _articleUrl;

        public int Id { get; set; }

        public Article Article;

        public bool Selected { get; set; }

        public ArticleListItem(Article article,string articleUrl)
        {
            InitializeComponent();

            Article = article;
            _articleUrl = articleUrl;

            Id = article.Id;
            Selected = false;
        }

        private void ArticleListItem_Load(object sender, EventArgs e)
        {
            ArticleTitle.Text = Article.Title;
            ArticleDate.Text = Article.UpdateDate;
        }

        private void ArticleListItem_MouseEnter(object sender, MouseEventArgs e)
        {
            if (!Selected)
            {
                BackColor = Color.AliceBlue;
            }
        }

        private void ArticleListItem_MouseLeave(object sender, EventArgs e)
        {
            if (!Selected)
            {
                BackColor = Color.Transparent;
            }
        }

    }
}
