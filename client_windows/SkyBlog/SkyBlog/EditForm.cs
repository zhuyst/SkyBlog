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
            if (Article != null)
            {
                Text = $@"编辑 - {Article.Title}";
                TitleTextBox.Text = Article.Title;
            }
        }
    }
}
