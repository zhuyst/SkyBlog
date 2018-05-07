using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using DSkin.Forms;
using SkyBlog.Model.LocalStorage;

namespace SkyBlog
{
    public partial class LoginForm : DSkinForm
    {
        private readonly StorageService _storageService;

        public LoginForm()
        {
            InitializeComponent();
            _storageService = StorageService.GetInstance();
        }

        private void LoginButton_Click(object sender, EventArgs e)
        {
            SaveSettings("123");
            Close();
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

                userStorage.Token = token;

                _storageService.SaveStorage(userStorage);
            }

            loginSettingsStorage.AutoLogin = AutoLoginCheckBox.Checked;
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
