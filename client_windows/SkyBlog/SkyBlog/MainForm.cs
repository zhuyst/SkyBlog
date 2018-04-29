using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using WindowsFormsControlLibrary;
using Api.api.article;
using Api.api.article.model;
using DSkin.DirectUI;
using DSkin.Forms;

namespace SkyBlog
{
    public partial class MainForm : DSkinForm
    {
        private readonly ArticleApi _articleApi;

        private Dictionary<int, ArticleListItem> articles;

        private int selectArticleId;

        public MainForm()
        {
            InitializeComponent();

            articles = new Dictionary<int, ArticleListItem>();
            _articleApi = ArticleApi.GetInstance();
        }

        private void MainForm_Load(object sender, EventArgs e)
        {
            foreach (var article in _articleApi.List(1,10).Entity.List)
            {
                var item = new ArticleListItem()
                {
                    Id = article.Id,
                    Title = article.Title,
                    Date = article.UpdateDate
                };
                articles[article.Id] = item;
                ArticleList.Items.Add(item);
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
            selectArticleId = item.Id;
            item.Selected = true;
            item.BackColor = Color.FromArgb(255, 217, 237, 247);
        }

        private void ArticleList_Click(object sender, EventArgs e)
        {

        }
    }
}
