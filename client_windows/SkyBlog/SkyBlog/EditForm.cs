using System;
using System.Windows.Forms;
using DSkin.Forms;
using SkyBlog.Api.Business;
using SkyBlog.Model.Business;

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
            if (Article == null) return;

            Text = $@"编辑 - {Article.Title}";
            TitleTextBox.Text = Article.Title;
            SubTitleTextBox.Text = Article.SubTitle;
            var content = Article.Content.Replace("\n", "\r\n");
            ContentTextBox.Text = content;
        }

        private void SaveButton_Click(object sender, EventArgs e)
        {
            DSkinMessageBox.Show("保存成功","保存");
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
            if (DSkinMessageBox.Show("确定要保存并关闭吗？", "保存并关闭",
                    MessageBoxButtons.OKCancel) == DialogResult.OK)
            {
                Close();
            }
        }
    }
}
