using System;
using System.Windows.Forms;
using DSkin.Forms;
using SkyBlog.Api.Business;
using SkyBlog.Model.Business;
using static System.String;

namespace SkyBlog
{
    public partial class EditForm : DSkinForm
    {
        private ArticleApi _articleApi;

        public Article Article { get; set; }

        public EditForm()
        {
            InitializeComponent();
            _articleApi = ArticleApi.GetInstance();
        }

        private void EditForm_Load(object sender, EventArgs e)
        {
            if (Article == null)
            {
                Text = @"新增文章 - SkyBlog";
                return;
            }

            Text = $@"编辑 - {Article.Title}";
            TitleTextBox.Text = Article.Title;
            SubTitleTextBox.Text = Article.SubTitle;
            var content = Article.Content.Replace("\n", "\r\n");
            ContentTextBox.Text = content;
        }

        private void SaveButton_Click(object sender, EventArgs e)
        {
            if (CheckArticle())
            {
                SaveArticle();
            }
        }

        private void ExitButton_Click(object sender, EventArgs e)
        {
            if (DSkinMessageBox.Show("确定要放弃编辑并关闭吗？","放弃编辑并关闭",
                    MessageBoxButtons.OKCancel) == DialogResult.OK)
            {
                Close();
            }
        }

        private void SaveAndExitButton_Click(object sender, EventArgs e)
        {
            if (!CheckArticle()) return;

            if (DSkinMessageBox.Show("确定要保存并关闭吗？", "保存并关闭",
                    MessageBoxButtons.OKCancel) != DialogResult.OK) return;

            if (SaveArticle())
            {
                Close();
            }
        }

        private Article GetArticle()
        {
            return new Article()
            {
                Title = TitleTextBox.Text,
                SubTitle = SubTitleTextBox.Text,
                Content = ContentTextBox.Text
            };
        }

        private bool SaveArticle()
        {
            bool success;
            if (Article == null)
            {
                var result = _articleApi.Insert(GetArticle());
                success = result.IsSuccess();
                DSkinMessageBox.Show(success ? "新增文章成功" : result.Message, "新增文章");
            }
            else
            {
                var result = _articleApi.Update(GetArticle());
                success = result.IsSuccess();
                DSkinMessageBox.Show(success ? "修改文章成功" : result.Message, "修改文章");
            }

            return success;
        }

        private bool CheckArticle()
        {
            if (CheckTextBox(TitleTextBox))
            {
                DSkinMessageBox.Show("文章标题不能为空", "不能为空");
                return false;
            }

            if (CheckTextBox(SubTitleTextBox))
            {
                DSkinMessageBox.Show("文章副标题不能为空", "不能为空");
                return false;
            }

            if (CheckTextBox(ContentTextBox))
            {
                DSkinMessageBox.Show("文章内容不能为空", "不能为空");
                return false;
            }

            return true;
        }

        private static bool CheckTextBox(TextBox textBox)
        {
            return textBox.Text.Trim() != Empty;
        }
    }
}
