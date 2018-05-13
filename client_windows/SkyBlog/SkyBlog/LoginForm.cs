using System;
using System.Windows.Forms;
using DSkin.Forms;
using SkyBlog.Api.Business;
using SkyBlog.Model.Business;
using SkyBlog.Model.LocalStorage;

namespace SkyBlog
{
    public partial class LoginForm : DSkinForm
    {
        /// <summary>
        /// 登陆成功时执行的Action
        /// </summary>
        public Action<User> LoginAction { get; set; }

        private readonly StorageService _storageService;

        private readonly AuthApi _authApi;

        public LoginForm()
        {
            InitializeComponent();

            _storageService = StorageService.Instance;
            _authApi = AuthApi.Instance;
        }

        private void LoginForm_Load(object sender, EventArgs e)
        {
            // 读取用户信息放入TextBox
            var userStorage = _storageService.GetUserStorage();
            UsernameTextBox.Text = userStorage.Username;
            PasswordTextBox.Text = userStorage.Password;

            // 读取登陆设置放入CheckBox
            var loginSettingsStorage = _storageService.GetLoginSettingsStorage();
            RememberCheckBox.Checked = loginSettingsStorage.RemeberMe;
            AutoLoginCheckBox.Checked = loginSettingsStorage.AutoLogin;
        }

        /// <summary>
        /// 登陆
        /// </summary>
        /// <param name="username">用户名</param>
        /// <param name="password">密码</param>
        private void Login(string username, string password)
        {
            var result = _authApi.Login(username, password);
            if (!result.IsSuccess())
            {
                DSkinMessageBox.Show(result.Message, "登陆失败", MessageBoxButtons.OK);
            }
            else
            {
                // 保存设置
                SaveSettings(result.Entity.Token);
                DialogResult = DialogResult.OK;

                // 调用登陆成功方法
                LoginAction?.Invoke(result.Entity.User);

                Close();
            }
        }

        private void SaveSettings(string token)
        {
            var loginSettingsStorage = new LoginSettingsStorage();

            // 记住密码时，存储用户信息
            if (RememberCheckBox.Checked)
            {
                loginSettingsStorage.RemeberMe = true;

                var userStorage = new UserStorage();

                var username = UsernameTextBox.Text;
                userStorage.Username = username;

                var password = PasswordTextBox.Text;
                userStorage.Password = password;

                _storageService.SaveStorage(userStorage);
            }

            // 自动登陆时，存储登陆设置
            if (AutoLoginCheckBox.Checked)
            {
                loginSettingsStorage.AutoLogin = true;
                loginSettingsStorage.Token = token;
            }
            _storageService.SaveStorage(loginSettingsStorage);
        }

        private void LoginButton_Click(object sender, EventArgs e)
        {
            // 表单验证
            var username = UsernameTextBox.Text;
            if (username.Trim() == string.Empty)
            {
                DSkinMessageBox.Show("用户名不能为空", "不能为空", MessageBoxButtons.OK);
                return;
            }

            var password = PasswordTextBox.Text;
            if (password.Trim() == string.Empty)
            {
                DSkinMessageBox.Show("密码不能为空", "不能为空", MessageBoxButtons.OK);
                return;
            }

            Login(username,password);
        }

        private void RememberCheckBox_CheckedChanged(object sender, EventArgs e)
        {
            // 如果取消'记住密码'，'自动登陆'也取消
            if (!RememberCheckBox.Checked)
            {
                AutoLoginCheckBox.Checked = false;
            }
        }

        private void AutoLoginCheckBox_CheckedChanged(object sender, EventArgs e)
        {
            // 如果启用'自动登陆'，'记住密码'也启用
            if (AutoLoginCheckBox.Checked)
            {
                RememberCheckBox.Checked = true;
            }
        }
    }
}
