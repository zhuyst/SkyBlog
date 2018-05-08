using System;
using System.Windows.Forms;
using DSkin.Controls;
using DSkin.DirectUI;
using SkyBlog.Model.Business;

namespace WindowsFormsControlLibrary
{
    public partial class UserToolStrip : DSkinToolStrip
    {
        public User LoginUser { get; set; }

        public EventHandler LoginHandler { get; set; }

        public EventHandler LogoutHandler { get; set; }

        public UserToolStrip()
        {
            InitializeComponent();
        }

        public void Logout()
        {
            Items.Clear();

            var button = new ToolStripButton("登陆");
            button.Click += LoginHandler;
            Items.Add(button);
        }

        public void AfterLogin(User user)
        {
            Items.Clear();

            LoginUser = user;

            var logoutButton = new ToolStripButton("注销");
            logoutButton.Click += LogoutHandler;

            var text = $"{user.Username} | {user.Nickname}";
            var dropDownButton = new ToolStripDropDownButton(text);
            dropDownButton.DropDownItems.Add(logoutButton);

            Items.Add(dropDownButton);
        }
    }
}
