using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Configuration;
using System.Drawing;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using DSkin.Controls;
using DSkin.DirectUI;
using SkyBlog.Model.Business;

namespace WindowsFormsControlLibrary
{
    public partial class ArticleListItem : DuiBaseControl
    {
        private static string _webUrl;

        public int Id { get; set; }

        public Article Article;

        public bool Selected { get; set; }

        public ArticleListItem(Article article)
        {
            InitializeComponent();
            Article = article;
            Id = article.Id;
            Selected = false;

            if (_webUrl == null)
            {
                _webUrl = ConfigurationManager.AppSettings["webUrl"];
            }
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

        private void ViewToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Process.Start(GetArticleUrl(Article.Id));
        }

        private static string GetArticleUrl(int id)
        {
            return $"{_webUrl}/article/content/{id}/full";
        }

    }
}
