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
            if (!result.IsSuccess())
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

            UserToolStripDropDownButton.Text = $@"{_loginUser.Username} | {_loginUser.Nickname}";

            UserToolStripMenuItem.Text = _loginUser.Nickname;

            NewButton.Enabled = true;

            EditToolStripMenuItem.Enabled = true;
            DeleteToolStripMenuItem.Enabled = true;

            LoginButton.Visible = false;
            UserToolStripDropDownButton.Visible = true;

            LoginToolStripMenuItem.Visible = false;
            UserToolStripMenuItem.Visible = true;
        }

        private void Logout()
        {
            _loginUser = null;

            NewButton.Enabled = false;

            EditToolStripMenuItem.Enabled = false;
            DeleteToolStripMenuItem.Enabled = false;

            LoginButton.Visible = true;
            UserToolStripDropDownButton.Visible = false;

            LoginToolStripMenuItem.Visible = true;
            UserToolStripMenuItem.Visible = false;

            var storage = _storageService.GetLoginSettingsStorage();
            storage.AutoLogin = false;
            storage.Token = null;
            _storageService.SaveStorage(storage);
        }

        private void WebIndex_Click(object sender, EventArgs e)
        {
            Process.Start(_webUrl);
        }

        private void ReloadButton_Click(object sender, EventArgs e)
        {
            RequestArticles(1);
        }

        private void EditArticle_Click(object sender, EventArgs e)
        {
            EditArticle(false);
        }

        private void EditArticle(bool isNew)
        {
            var article = isNew ? null : _selectArticle;
            new EditForm
            {
                Article = article
            }.ShowDialog();
        }

        private void Login_Click(object sender, EventArgs e)
        {
            Login();
        }

        private void Logout_Click(object sender, EventArgs e)
        {
            Logout();
        }

        private void NewButton_Click(object sender, EventArgs e)
        {
            EditArticle(true);
        }

        private void DeleteToolStripMenuItem_Click(object sender, EventArgs e)
        {
            DeleteArticle();
        }
    }
}
