using System;
using System.Collections.Generic;
using System.Drawing;
using WindowsFormsControlLibrary;
using DSkin.Forms;
using SkyBlog.Api.Business;
using SkyBlog.Model.Business;

namespace SkyBlog
{
    public partial class MainForm : DSkinForm
    {
        private readonly ArticleApi _articleApi;

        private Dictionary<int, ArticleListItem> articles;

        private Article selectArticle;

        public MainForm()
        {
            InitializeComponent();

            articles = new Dictionary<int, ArticleListItem>();
            _articleApi = ArticleApi.GetInstance();
        }

        private void MainForm_Load(object sender, EventArgs e)
        {
            var init = false;
            foreach (var article in _articleApi.List(1,10).Entity.List)
            {
                var item = new ArticleListItem(article);
                articles[article.Id] = item;
                ArticleList.Items.Add(item);

                if (init) continue;
                SelectArticle(item);
                init = true;
            }
            ArticleList.LayoutContent();
        }

        private void ArticleList_ItemClick(object sender, DSkin.Controls.ItemClickEventArgs e)
        {
            foreach (var article in articles)
            {
                article.Value.BackColor = Color.Transparent;
                article.Value.Selected = false;
            }

            var item = (ArticleListItem)e.Control;
            SelectArticle(item);
        }

        private void ArticleList_Click(object sender, EventArgs e)
        {

        }

        private void SelectArticle(ArticleListItem item)
        {
            item.Selected = true;
            item.BackColor = Color.FromArgb(255, 217, 237, 247);
            SetArticleInfo(item.Article);
        }

        private void SetArticleInfo(Article article)
        {
            selectArticle = article;
            ArticleTitle.Text = article.Title;
            ArticleSubTitle.Text = article.SubTitle;
        }
    }
}
