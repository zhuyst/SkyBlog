using System;
using System.Windows.Forms;
using DSkin.Forms;
using SkyBlog.Api.Business;
using SkyBlog.Model.Business;

namespace SkyBlog
{
    public partial class EditForm : DSkinForm
    {
        /// <summary>
        /// 成功时调用的Action
        /// </summary>
        public Action SuccessAction { get; set; }

        /// <summary>
        /// 文章对象
        /// 如果为null则为新增文章，否则为编辑文章
        /// </summary>
        public Article Article { get; set; }

        private readonly ArticleApi _articleApi;

        public EditForm()
        {
            InitializeComponent();
            _articleApi = ArticleApi.GetInstance();
        }

        private void EditForm_Load(object sender, EventArgs e)
        {
            // 如果Article为null，则是新增文章
            if (Article == null)
            {
                Text = @"新增文章 - SkyBlog";
                return;
            }

            // 否则是编辑文章，将文章信息放入各个TextBox
            Text = $@"编辑文章 - {Article.Title}";
            TitleTextBox.Text = Article.Title;
            SubTitleTextBox.Text = Article.SubTitle;

            // TextBox的换行符为\r\n，需要转换
            var content = Article.Content.Replace("\n", "\r\n");
            ContentTextBox.Text = content;
        }

        /// <summary>
        /// 从TextBox获取文章对象
        /// </summary>
        /// <returns>获取的文章对象</returns>
        private Article GetArticle()
        {
            return new Article()
            {
                Title = TitleTextBox.Text,
                SubTitle = SubTitleTextBox.Text,
                Content = ContentTextBox.Text
            };
        }

        /// <summary>
        /// 保存文章
        /// </summary>
        /// <returns>是否保存成功</returns>
        private bool SaveArticle()
        {
            bool success;

            // 如果Article为null，则是新增文章
            if (Article == null)
            {
                var result = _articleApi.Insert(GetArticle());
                success = result.IsSuccess();
                DSkinMessageBox.Show(success ? "新增文章成功" : result.Message, "新增文章");
            }

            // 否则是编辑文章
            else
            {
                var result = _articleApi.Update(GetArticle());
                success = result.IsSuccess();
                DSkinMessageBox.Show(success ? "修改文章成功" : result.Message, "修改文章");
            }

            // 成功时调用
            if (success)
            {
                SuccessAction?.Invoke();
            }

            return success;
        }

        /// <summary>
        /// 表单验证
        /// </summary>
        /// <returns>表单验证是否通过</returns>
        private bool CheckArticle()
        {
            if (!CheckTextBox(TitleTextBox))
            {
                DSkinMessageBox.Show("文章标题不能为空", "不能为空");
                return false;
            }

            if (!CheckTextBox(SubTitleTextBox))
            {
                DSkinMessageBox.Show("文章副标题不能为空", "不能为空");
                return false;
            }

            if (!CheckTextBox(ContentTextBox))
            {
                DSkinMessageBox.Show("文章内容不能为空", "不能为空");
                return false;
            }

            return true;
        }

        /// <summary>
        /// 检查TextBox是否为空
        /// </summary>
        /// <param name="textBox">要检查的TextBox</param>
        /// <returns>是否为空</returns>
        private static bool CheckTextBox(TextBox textBox)
        {
            return textBox.Text.Trim() != string.Empty;
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
        
    }
}
