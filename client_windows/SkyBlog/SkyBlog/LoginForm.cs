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
        private readonly Action<User> _loginAction;

        private readonly StorageService _storageService;

        private readonly AuthApi _authApi;

        public LoginForm(Action<User> loginAction)
        {
            InitializeComponent();

            _storageService = StorageService.GetInstance();
            _authApi = AuthApi.GetInstance();

            _loginAction = loginAction;
        }

        private void LoginButton_Click(object sender, EventArgs e)
        {
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

        private void Login(string username,string password)
        {
            var result = _authApi.Login(username, password);
            if (!result.IsSuccess())
            {
                DSkinMessageBox.Show(result.Message, "登陆失败", MessageBoxButtons.OK);
            }
            else
            {
                SaveSettings(result.Entity.Token);
                DialogResult = DialogResult.OK;
                _loginAction?.Invoke(result.Entity.User);

                Close();
            }
        }

        private void LoginForm_Load(object sender, EventArgs e)
        {
            var userStorage = _storageService.GetUserStorage();
            UsernameTextBox.Text = userStorage.Username;
            PasswordTextBox.Text = userStorage.Password;

            var loginSettingsStorage = _storageService.GetLoginSettingsStorage();
            RememberCheckBox.Checked = loginSettingsStorage.RemeberMe;
            AutoLoginCheckBox.Checked = loginSettingsStorage.AutoLogin;
        }

        private void SaveSettings(string token)
        {
            var loginSettingsStorage = new LoginSettingsStorage();
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

            if (AutoLoginCheckBox.Checked)
            {
                loginSettingsStorage.AutoLogin = true;
                loginSettingsStorage.Token = token;
            }
            _storageService.SaveStorage(loginSettingsStorage);
        }

        private void RememberCheckBox_Click(object sender, EventArgs e)
        {
            AutoLoginCheckBox.Checked = false;
        }

        private void AutoLoginCheckBox_Click(object sender, EventArgs e)
        {
            RememberCheckBox.Checked = true;
        }
    }
}
