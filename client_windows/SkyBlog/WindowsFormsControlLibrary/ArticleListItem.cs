using System;
using System.Drawing;
using System.Windows.Forms;
using DSkin.DirectUI;
using SkyBlog.Model.Business;

namespace WindowsFormsControlLibrary
{
    /// <summary>
    /// 文章列表条目
    /// </summary>
    public partial class ArticleListItem : DuiBaseControl
    {
        /// <summary>
        /// 文章ID
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// 文章
        /// </summary>
        public Article Article;

        /// <summary>
        /// 是否被选中
        /// </summary>
        public bool Selected { get; set; }

        public ArticleListItem(Article article)
        {
            InitializeComponent();

            Article = article;

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
