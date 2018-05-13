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

        /// <summary>
        /// 当前登录用户
        /// </summary>
        private User _loginUser;

        public MainForm()
        {
            InitializeComponent();

            _articles = new Dictionary<int, ArticleListItem>();

            _articleApi = ArticleApi.Instance;
            _storageService = StorageService.Instance;
            _authApi = AuthApi.Instance;

            _webUrl = ConfigurationManager.AppSettings["webUrl"];
        }

        private void MainForm_Load(object sender, EventArgs e)
        {
            RequestArticles(1);
            AutoLogin();
        }

        /// <summary>
        /// 自动登陆
        /// </summary>
        private void AutoLogin()
        {
            var loginSettingsStorage = _storageService.GetLoginSettingsStorage();
            if (!loginSettingsStorage.AutoLogin)
            {
                // 没有选择'自动登陆'则设置状态为'登出'
                Logout();
                return;
            }

            var result = _authApi.Refresh(loginSettingsStorage.Token);
            if (!result.IsSuccess())
            {
                // Token刷新失败则设置状态为'登出'
                Logout();
                return;
            }

            // 保存新Token
            loginSettingsStorage.Token = result.Entity.Token;
            _storageService.SaveStorage(loginSettingsStorage);

            _loginUser = result.Entity.User;
            AfterLogin();
        }

        /// <summary>
        /// 登陆
        /// </summary>
        private void Login()
        {
            // 打开登录框
            var loginForm = new LoginForm()
            {
                LoginAction = user => { _loginUser = user; }
            };

            var result = loginForm.ShowDialog();
            if (result == DialogResult.OK)
            {
                AfterLogin();
            }
        }

        /// <summary>
        /// 登陆成功后调用的方法
        /// </summary>
        private void AfterLogin()
        {
            SetLoginStatus(true);
        }

        /// <summary>
        /// 登出
        /// </summary>
        private void Logout()
        {
            _loginUser = null;

            SetLoginStatus(false);

            // 取消'自动登陆'，清除Token
            var storage = _storageService.GetLoginSettingsStorage();
            storage.AutoLogin = false;
            storage.Token = null;
            _storageService.SaveStorage(storage);
        }

        /// <summary>
        /// 设置登陆状态
        /// </summary>
        /// <param name="isLogin">是否登陆</param>
        private void SetLoginStatus(bool isLogin)
        {
            SetToolStrip(isLogin);
            SetMenuStrip(isLogin);
        }

        /// <summary>
        /// 设置工具栏
        /// </summary>
        /// <param name="isLogin">是否登陆</param>
        private void SetToolStrip(bool isLogin)
        {
            // 用户按钮
            UserToolStripDropDownButton.Visible = isLogin;
            if (isLogin)
            {
                UserToolStripDropDownButton.Text = $@"{_loginUser.Username} | {_loginUser.Nickname}";
            }

            // 登陆按钮
            LoginButton.Visible = !isLogin;

            // '新增文章'按钮
            NewButton.Enabled = isLogin;
        }

        /// <summary>
        /// 设置右键菜单
        /// </summary>
        /// <param name="isLogin">是否登陆</param>
        private void SetMenuStrip(bool isLogin)
        {
            // 用户MenuItem
            if (isLogin)
            {
                UserToolStripMenuItem.Text = _loginUser.Nickname;
            }

            // '修改文章'MenuItem
            EditToolStripMenuItem.Enabled = isLogin;

            // '删除文章'MenuItem
            DeleteToolStripMenuItem.Enabled = isLogin;

            // 登陆MenuItem
            LoginToolStripMenuItem.Visible = !isLogin;

            // 用户MenuItem
            UserToolStripMenuItem.Visible = isLogin;
        }

        /// <summary>
        /// 新增/修改文章
        /// </summary>
        /// <param name="isNew">是否为新文章</param>
        private void EditArticle(bool isNew)
        {
            // 新文章直接传入null
            var article = isNew ? null : _selectArticle;
            new EditForm
            {
                Article = article,
                SuccessAction = () => RequestArticles(1)
            }.ShowDialog();
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
