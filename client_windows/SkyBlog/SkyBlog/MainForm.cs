using System;
using System.Collections.Generic;
using System.Configuration;
using System.Diagnostics;
using System.Windows.Forms;
using WindowsFormsControlLibrary;
using DSkin.Forms;
using SkyBlog.Api.Business;
using SkyBlog.Model.Business;
using SkyBlog.Model.LocalStorage;

namespace SkyBlog
{
    public partial class MainForm : DSkinForm
    {
        private readonly AuthApi _authApi;

        private readonly StorageService _storageService;

        private static string _webUrl;

        private User _loginUser;

        public MainForm()
        {
            InitializeComponent();

            _articles = new Dictionary<int, ArticleListItem>();

            _articleApi = ArticleApi.GetInstance();
            _storageService = StorageService.GetInstance();
            _authApi = AuthApi.GetInstance();

            _webUrl = ConfigurationManager.AppSettings["webUrl"];

            UserToolStrip.LoginHandler = (sender, args) => Login();
            UserToolStrip.LogoutHandler = (sender, args) => Logout();
        }

        private void MainForm_Load(object sender, EventArgs e)
        {
            RequestArticles(1);
            AutoLogin();
        }

        private void AutoLogin()
        {
            var loginSettingsStorage = _storageService.GetLoginSettingsStorage();
            if (!loginSettingsStorage.AutoLogin)
            {
                Logout();
                return;
            }

            var result = _authApi.Refresh(loginSettingsStorage.Token);
            if (result.Code != 200)
            {
                return;
            }

            loginSettingsStorage.Token = result.Entity.Token;
            _storageService.SaveStorage(loginSettingsStorage);

            _loginUser = result.Entity.User;
        }

        private void Login()
        {
            var loginForm = new LoginForm((user => { _loginUser = user; }));

            var result = loginForm.ShowDialog();
            if (result != DialogResult.OK) return;

            UserToolStrip.AfterLogin(_loginUser);
            EditButton.Show();
            DeleteButton.Show();

            EditToolStripMenuItem.Enabled = true;
            DeleteToolStripMenuItem.Enabled = true;
        }

        private void Logout()
        {
            _loginUser = null;

            UserToolStrip.Logout();

            EditButton.Hide();
            DeleteButton.Hide();

            EditToolStripMenuItem.Enabled = false;
            DeleteToolStripMenuItem.Enabled = false;
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

        private void SkyBlogTitleLabel_Click(object sender, EventArgs e)
        {
            Process.Start(_webUrl);
        }

        private void EditToolStripMenuItem_Click(object sender, EventArgs e)
        {
            EditArticle();
        }

        private void ViewIndexToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Process.Start(_webUrl);
        }

        private void ReloadButton_Click(object sender, EventArgs e)
        {
            RequestArticles(1);
        }

        private void EditButton_Click(object sender, EventArgs e)
        {
            EditArticle();
        }

        private void EditArticle()
        {
            new EditForm
            {
                Article = _selectArticle
            }.ShowDialog();
        }
    }
}
