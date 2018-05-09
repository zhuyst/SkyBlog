using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Drawing;
using System.Windows.Forms;
using WindowsFormsControlLibrary;
using DSkin.Controls;
using SkyBlog.Api.Business;
using SkyBlog.Model.Base;
using SkyBlog.Model.Business;

namespace SkyBlog
{
    partial class MainForm
    {
        private const int PageSize = 10;

        private readonly ArticleApi _articleApi;

        private readonly Dictionary<int, ArticleListItem> _articles;

        private Article _selectArticle;

        private int _pageNum = 1;
       
        private void RequestArticles(int pageNum)
        {
            _pageNum = pageNum;
            var page = _articleApi.List(_pageNum, PageSize).Entity;
            SetArticlePageInfo(page);
            SetArticleList(page.List);
        }

        private void SetArticleList(IEnumerable<Article> list)
        {
            ArticleListPanel.Items.Clear();

            var init = false;
            foreach (var article in list)
            {
                var item = new ArticleListItem(article,GetArticleUrl(article.Id));
                _articles[article.Id] = item;
                ArticleListPanel.Items.Add(item);

                if (init) continue;
                SelectArticle(item);
                init = true;
            }
            ArticleListPanel.LayoutContent();
        }

        private void SetArticlePageInfo(PageInfo<Article> page)
        {
            var pageNum = page.PageNum;
            var pages = page.Pages;

            ArticlePageInfo.Text = $@"第 {pageNum} 页,共 {pages} 页";

            if (pageNum == 1)
            {
                DisableButton(PrevPageButton);
            }
            else
            {
                EnableButton(PrevPageButton);
            }

            if (pageNum == pages)
            {
                DisableButton(NextPageButton);
            }
            else
            {
                EnableButton(NextPageButton);
            }
        }

        private static void DisableButton(DSkinButton button)
        {
            button.Enabled = false;
            button.BaseColor = Color.FromArgb(245, 245, 245);
        }

        private static void EnableButton(DSkinButton button)
        {
            button.Enabled = true;
            button.BaseColor = Color.FromArgb(133, 186, 233);
        }

        private void ArticleList_ItemClick(object sender, ItemClickEventArgs e)
        {
            foreach (var article in _articles)
            {
                article.Value.BackColor = Color.Transparent;
                article.Value.Selected = false;
            }

            var item = (ArticleListItem)e.Control;
            SelectArticle(item);
        }

        private void SelectArticle(ArticleListItem item)
        {
            item.Selected = true;
            item.BackColor = Color.FromArgb(255, 217, 237, 247);
            SetArticleInfo(item.Article);
        }

        private void SetArticleInfo(Article article)
        {
            _selectArticle = article;
            ArticleTitleLabel.Text = article.Title;
            ArticleSubTitleLabel.Text = article.SubTitle;
            ArticleCreateDateLabel.Text = $@"文章发布时间：{article.CreateDate}";
            ArticleUpdateDateLabel.Text = $@"最后修改时间：{article.UpdateDate}";
            ArticleClassifyLabel.Text = $@"分类：{article.Classify.Name}";
            ArticleContentLabel.Text = article.Content;
            ArticleContentLabel.Convert();
        }

        private void PrevPageButton_Click(object sender, EventArgs e)
        {
            RequestArticles(_pageNum - 1);
        }

        private void NextPageButton_Click(object sender, EventArgs e)
        {
            RequestArticles(_pageNum + 1);
        }

        private void ViewToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Process.Start(GetArticleUrl(_selectArticle.Id));
        }

        private void CopyToolStripMenuItem_Click(object sender, EventArgs e)
        {
            var selectText = ArticleContentLabel.SelectedText;
            if (selectText != "")
            {
                Clipboard.SetDataObject(selectText);
            }
        }

        private void AllSelectToolStripMenuItem_Click(object sender, EventArgs e)
        {
            ArticleContentLabel.SelectAll();
        }

        private static string GetArticleUrl(int id)
        {
            return $"{_webUrl}/article/content/{id}/full";
        }
    }
}
