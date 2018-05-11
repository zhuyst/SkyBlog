using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Drawing;
using System.Windows.Forms;
using WindowsFormsControlLibrary;
using DSkin.Controls;
using DSkin.Forms;
using SkyBlog.Api.Business;
using SkyBlog.Model.Base;
using SkyBlog.Model.Business;

namespace SkyBlog
{
    partial class MainForm
    {
        /// <summary>
        /// 请求的页面大小
        /// </summary>
        private const int PageSize = 10;

        private readonly ArticleApi _articleApi;

        /// <summary>
        /// 当前显示的文章列表
        /// </summary>
        private readonly Dictionary<int, ArticleListItem> _articles;

        /// <summary>
        /// 当前选中的文章
        /// </summary>
        private Article _selectArticle;

        /// <summary>
        /// 当前文章页码
        /// </summary>
        private int _pageNum = 1;
       
        /// <summary>
        /// 请求文章列表
        /// </summary>
        /// <param name="pageNum">页码</param>
        private void RequestArticles(int pageNum)
        {
            _pageNum = pageNum;
            var page = _articleApi.List(_pageNum, PageSize).Entity;
            SetArticlePageInfo(page);
            SetArticleList(page.List);
        }

        /// <summary>
        /// 将文章渲染到文章列表上
        /// </summary>
        /// <param name="list">要渲染的文章列表</param>
        private void SetArticleList(IEnumerable<Article> list)
        {
            // 清空当前列表
            ArticleListPanel.Items.Clear();

            var init = false;
            foreach (var article in list)
            {
                // 将文章渲染到文章列表上
                var item = new ArticleListItem(article);
                _articles[article.Id] = item;
                ArticleListPanel.Items.Add(item);

                // 默认选中列表第一篇文章
                if (init) continue;
                SelectArticle(item);
                init = true;
            }
            ArticleListPanel.LayoutContent();
        }

        /// <summary>
        /// 设置分页信息
        /// </summary>
        /// <param name="page">分页对象</param>
        private void SetArticlePageInfo(PageInfo<Article> page)
        {
            var pageNum = page.PageNum;
            var pages = page.Pages;

            // 设置分页信息
            ArticlePageInfo.Text = $@"第 {pageNum} 页,共 {pages} 页";

            // 启动/禁用上一页及下一页按钮
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

        /// <summary>
        /// 禁用按钮
        /// </summary>
        /// <param name="button">要禁用的按钮</param>
        private static void DisableButton(DSkinButton button)
        {
            button.Enabled = false;
            button.BaseColor = Color.FromArgb(245, 245, 245);
        }

        /// <summary>
        /// 启动按钮
        /// </summary>
        /// <param name="button">要启动的按钮</param>
        private static void EnableButton(DSkinButton button)
        {
            button.Enabled = true;
            button.BaseColor = Color.FromArgb(133, 186, 233);
        }

        /// <summary>
        /// 选中一篇文章
        /// </summary>
        /// <param name="item">选中的文章</param>
        private void SelectArticle(ArticleListItem item)
        {
            item.Selected = true;
            item.BackColor = Color.FromArgb(255, 217, 237, 247);
            SetArticleInfo(item.Article);
        }

        /// <summary>
        /// 设置文章详情信息
        /// </summary>
        /// <param name="article">要设置的文章</param>
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
        /// <summary>
        /// 获取Web上的文章URL
        /// </summary>
        /// <param name="id">文章ID</param>
        /// <returns>文章URL</returns>
        private static string GetArticleUrl(int id)
        {
            return $"{_webUrl}/article/content/{id}/full";
        }

        /// <summary>
        /// 删除当前选中的文章
        /// </summary>
        private void DeleteArticle()
        {
            if (DSkinMessageBox.Show($"确定要删除 {_selectArticle.Title} 吗？", "删除文章",
                    MessageBoxButtons.OKCancel) != DialogResult.OK) return;

            var result = _articleApi.Delete(_selectArticle.Id);
            DSkinMessageBox.Show(result.IsSuccess() ? "删除成功" : result.Message, "删除文章");

            // 如果删除成功，刷新文章列表
            if (result.IsSuccess())
            {
                RequestArticles(_pageNum);
            }
        }

        private void ArticleList_ItemClick(object sender, ItemClickEventArgs e)
        {
            // 取消其他文章的选中状态
            foreach (var article in _articles)
            {
                article.Value.BackColor = Color.Transparent;
                article.Value.Selected = false;
            }

            // 选中点击的文章
            var item = (ArticleListItem)e.Control;
            SelectArticle(item);
        }

        private void PrevPageButton_Click(object sender, EventArgs e)
        {
            // 请求上一页
            RequestArticles(_pageNum - 1);
        }

        private void NextPageButton_Click(object sender, EventArgs e)
        {
            // 请求下一页
            RequestArticles(_pageNum + 1);
        }

        private void ViewToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Process.Start(GetArticleUrl(_selectArticle.Id));
        }

        private void CopyToolStripMenuItem_Click(object sender, EventArgs e)
        {
            // 复制选中文本
            var selectText = ArticleContentLabel.SelectedText;
            if (selectText != "")
            {
                Clipboard.SetDataObject(selectText);
            }
        }

        private void AllSelectToolStripMenuItem_Click(object sender, EventArgs e)
        {
            // 全选
            ArticleContentLabel.SelectAll();
        }
    }
}
