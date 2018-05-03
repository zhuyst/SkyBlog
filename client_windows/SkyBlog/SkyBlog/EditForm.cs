using System.Windows.Forms;
using DSkin.Forms;
using SkyBlog.Model.Business;

namespace SkyBlog
{
    public partial class EditForm : DSkinForm
    {
        public Article Article { get; set; }

        public EditForm()
        {
            InitializeComponent();
        }

        private void EditForm_Load(object sender, System.EventArgs e)
        {
            if (Article == null) return;

            Text = $@"编辑 - {Article.Title}";
            TitleTextBox.Text = Article.Title;
            SubTitleTextBox.Text = Article.SubTitle;
            var content = Article.Content.Replace("\n", "\r\n");
            ContentTextBox.Text = content;
        }

        private void SaveButton_Click(object sender, System.EventArgs e)
        {

        }

        private void ExitButton_Click(object sender, System.EventArgs e)
        {

        }

        private void SaveAndExitButton_Click(object sender, System.EventArgs e)
        {

        }
    }
}
