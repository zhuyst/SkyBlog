namespace SkyBlog
{
    partial class LoginForm
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(LoginForm));
            this.dSkinTableLayoutPanel1 = new DSkin.Controls.DSkinTableLayoutPanel();
            this.dSkinPictureBox2 = new DSkin.Controls.DSkinPictureBox();
            this.dSkinTextBox1 = new DSkin.Controls.DSkinTextBox();
            this.UsernameTextBox = new DSkin.Controls.DSkinTextBox();
            this.dSkinPictureBox1 = new DSkin.Controls.DSkinPictureBox();
            this.LoginButton = new DSkin.Controls.DSkinButton();
            this.RememberCheckBox = new DSkin.Controls.DSkinCheckBox();
            this.AutoCheckBox = new DSkin.Controls.DSkinCheckBox();
            this.dSkinTableLayoutPanel1.SuspendLayout();
            this.SuspendLayout();
            // 
            // dSkinTableLayoutPanel1
            // 
            this.dSkinTableLayoutPanel1.BackColor = System.Drawing.Color.Transparent;
            this.dSkinTableLayoutPanel1.BitmapCache = false;
            this.dSkinTableLayoutPanel1.ColumnCount = 2;
            this.dSkinTableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 19.92188F));
            this.dSkinTableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 80.07813F));
            this.dSkinTableLayoutPanel1.Controls.Add(this.dSkinPictureBox2, 0, 1);
            this.dSkinTableLayoutPanel1.Controls.Add(this.dSkinTextBox1, 1, 1);
            this.dSkinTableLayoutPanel1.Controls.Add(this.UsernameTextBox, 1, 0);
            this.dSkinTableLayoutPanel1.Controls.Add(this.dSkinPictureBox1, 0, 0);
            this.dSkinTableLayoutPanel1.Dock = System.Windows.Forms.DockStyle.Top;
            this.dSkinTableLayoutPanel1.Location = new System.Drawing.Point(19, 55);
            this.dSkinTableLayoutPanel1.Name = "dSkinTableLayoutPanel1";
            this.dSkinTableLayoutPanel1.RightBottom = ((System.Drawing.Image)(resources.GetObject("dSkinTableLayoutPanel1.RightBottom")));
            this.dSkinTableLayoutPanel1.RowCount = 2;
            this.dSkinTableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 50F));
            this.dSkinTableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 50F));
            this.dSkinTableLayoutPanel1.Size = new System.Drawing.Size(502, 152);
            this.dSkinTableLayoutPanel1.TabIndex = 0;
            // 
            // dSkinPictureBox2
            // 
            this.dSkinPictureBox2.Dock = System.Windows.Forms.DockStyle.Fill;
            this.dSkinPictureBox2.Image = global::SkyBlog.Properties.Resources.password;
            this.dSkinPictureBox2.Images = new System.Drawing.Image[] {
        ((System.Drawing.Image)(global::SkyBlog.Properties.Resources.password))};
            this.dSkinPictureBox2.Location = new System.Drawing.Point(10, 86);
            this.dSkinPictureBox2.Margin = new System.Windows.Forms.Padding(10);
            this.dSkinPictureBox2.Name = "dSkinPictureBox2";
            this.dSkinPictureBox2.Size = new System.Drawing.Size(80, 56);
            this.dSkinPictureBox2.SizeMode = System.Windows.Forms.PictureBoxSizeMode.Zoom;
            this.dSkinPictureBox2.TabIndex = 5;
            this.dSkinPictureBox2.Text = "dSkinPictureBox2";
            // 
            // dSkinTextBox1
            // 
            this.dSkinTextBox1.BitmapCache = false;
            this.dSkinTextBox1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.dSkinTextBox1.Font = new System.Drawing.Font("微软雅黑", 12F);
            this.dSkinTextBox1.Location = new System.Drawing.Point(110, 99);
            this.dSkinTextBox1.Margin = new System.Windows.Forms.Padding(10, 23, 10, 10);
            this.dSkinTextBox1.Name = "dSkinTextBox1";
            this.dSkinTextBox1.Size = new System.Drawing.Size(382, 34);
            this.dSkinTextBox1.TabIndex = 3;
            this.dSkinTextBox1.TransparencyKey = System.Drawing.Color.Empty;
            this.dSkinTextBox1.WaterFont = new System.Drawing.Font("宋体", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.dSkinTextBox1.WaterText = "";
            this.dSkinTextBox1.WaterTextOffset = new System.Drawing.Point(0, 0);
            // 
            // UsernameTextBox
            // 
            this.UsernameTextBox.BitmapCache = false;
            this.UsernameTextBox.Dock = System.Windows.Forms.DockStyle.Fill;
            this.UsernameTextBox.Font = new System.Drawing.Font("微软雅黑", 12F);
            this.UsernameTextBox.Location = new System.Drawing.Point(110, 23);
            this.UsernameTextBox.Margin = new System.Windows.Forms.Padding(10, 23, 10, 10);
            this.UsernameTextBox.Name = "UsernameTextBox";
            this.UsernameTextBox.Size = new System.Drawing.Size(382, 34);
            this.UsernameTextBox.TabIndex = 2;
            this.UsernameTextBox.TransparencyKey = System.Drawing.Color.Empty;
            this.UsernameTextBox.WaterFont = new System.Drawing.Font("宋体", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.UsernameTextBox.WaterText = "";
            this.UsernameTextBox.WaterTextOffset = new System.Drawing.Point(0, 0);
            // 
            // dSkinPictureBox1
            // 
            this.dSkinPictureBox1.Image = global::SkyBlog.Properties.Resources.username;
            this.dSkinPictureBox1.Images = new System.Drawing.Image[] {
        ((System.Drawing.Image)(global::SkyBlog.Properties.Resources.username))};
            this.dSkinPictureBox1.Location = new System.Drawing.Point(3, 3);
            this.dSkinPictureBox1.Name = "dSkinPictureBox1";
            this.dSkinPictureBox1.Size = new System.Drawing.Size(94, 70);
            this.dSkinPictureBox1.SizeMode = System.Windows.Forms.PictureBoxSizeMode.Zoom;
            this.dSkinPictureBox1.TabIndex = 4;
            this.dSkinPictureBox1.Text = "dSkinPictureBox1";
            // 
            // LoginButton
            // 
            this.LoginButton.AdaptImage = true;
            this.LoginButton.BaseColor = System.Drawing.Color.FromArgb(((int)(((byte)(133)))), ((int)(((byte)(186)))), ((int)(((byte)(233)))));
            this.LoginButton.ButtonBorderColor = System.Drawing.Color.Gray;
            this.LoginButton.ButtonBorderWidth = 1;
            this.LoginButton.ButtonStyle = DSkin.DirectUI.ButtonStyles.Style1;
            this.LoginButton.DialogResult = System.Windows.Forms.DialogResult.None;
            this.LoginButton.Dock = System.Windows.Forms.DockStyle.Bottom;
            this.LoginButton.Font = new System.Drawing.Font("微软雅黑", 12F, System.Drawing.FontStyle.Bold);
            this.LoginButton.HoverColor = System.Drawing.Color.Empty;
            this.LoginButton.HoverImage = null;
            this.LoginButton.IsPureColor = false;
            this.LoginButton.Location = new System.Drawing.Point(19, 269);
            this.LoginButton.Name = "LoginButton";
            this.LoginButton.NormalImage = null;
            this.LoginButton.PressColor = System.Drawing.Color.Empty;
            this.LoginButton.PressedImage = null;
            this.LoginButton.Radius = 25;
            this.LoginButton.ShowButtonBorder = true;
            this.LoginButton.Size = new System.Drawing.Size(502, 40);
            this.LoginButton.TabIndex = 1;
            this.LoginButton.Text = "登陆";
            this.LoginButton.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            this.LoginButton.TextPadding = 0;
            // 
            // RememberCheckBox
            // 
            this.RememberCheckBox.CheckAlign = System.Drawing.ContentAlignment.MiddleLeft;
            this.RememberCheckBox.Checked = false;
            this.RememberCheckBox.CheckFlagColor = System.Drawing.Color.FromArgb(((int)(((byte)(93)))), ((int)(((byte)(151)))), ((int)(((byte)(2)))));
            this.RememberCheckBox.CheckFlagColorDisabled = System.Drawing.Color.Gray;
            this.RememberCheckBox.CheckRectBackColorDisabled = System.Drawing.Color.Silver;
            this.RememberCheckBox.CheckRectBackColorHighLight = System.Drawing.Color.FromArgb(((int)(((byte)(246)))), ((int)(((byte)(239)))), ((int)(((byte)(219)))));
            this.RememberCheckBox.CheckRectBackColorNormal = System.Drawing.Color.FromArgb(((int)(((byte)(246)))), ((int)(((byte)(239)))), ((int)(((byte)(219)))));
            this.RememberCheckBox.CheckRectBackColorPressed = System.Drawing.Color.FromArgb(((int)(((byte)(239)))), ((int)(((byte)(226)))), ((int)(((byte)(188)))));
            this.RememberCheckBox.CheckRectColor = System.Drawing.Color.DodgerBlue;
            this.RememberCheckBox.CheckRectColorDisabled = System.Drawing.Color.Gray;
            this.RememberCheckBox.CheckRectWidth = 14;
            this.RememberCheckBox.CheckState = System.Windows.Forms.CheckState.Unchecked;
            this.RememberCheckBox.Font = new System.Drawing.Font("微软雅黑", 10F, System.Drawing.FontStyle.Bold);
            this.RememberCheckBox.InnerPaddingWidth = 2;
            this.RememberCheckBox.InnerRectInflate = 3;
            this.RememberCheckBox.Location = new System.Drawing.Point(129, 222);
            this.RememberCheckBox.Name = "RememberCheckBox";
            this.RememberCheckBox.Size = new System.Drawing.Size(96, 28);
            this.RememberCheckBox.SpaceBetweenCheckMarkAndText = 3;
            this.RememberCheckBox.TabIndex = 2;
            this.RememberCheckBox.Text = "记住密码";
            this.RememberCheckBox.TextColorDisabled = System.Drawing.Color.Gray;
            this.RememberCheckBox.TextRenderingHint = System.Drawing.Text.TextRenderingHint.SystemDefault;
            // 
            // AutoCheckBox
            // 
            this.AutoCheckBox.CheckAlign = System.Drawing.ContentAlignment.MiddleLeft;
            this.AutoCheckBox.Checked = false;
            this.AutoCheckBox.CheckFlagColor = System.Drawing.Color.FromArgb(((int)(((byte)(93)))), ((int)(((byte)(151)))), ((int)(((byte)(2)))));
            this.AutoCheckBox.CheckFlagColorDisabled = System.Drawing.Color.Gray;
            this.AutoCheckBox.CheckRectBackColorDisabled = System.Drawing.Color.Silver;
            this.AutoCheckBox.CheckRectBackColorHighLight = System.Drawing.Color.FromArgb(((int)(((byte)(246)))), ((int)(((byte)(239)))), ((int)(((byte)(219)))));
            this.AutoCheckBox.CheckRectBackColorNormal = System.Drawing.Color.FromArgb(((int)(((byte)(246)))), ((int)(((byte)(239)))), ((int)(((byte)(219)))));
            this.AutoCheckBox.CheckRectBackColorPressed = System.Drawing.Color.FromArgb(((int)(((byte)(239)))), ((int)(((byte)(226)))), ((int)(((byte)(188)))));
            this.AutoCheckBox.CheckRectColor = System.Drawing.Color.DodgerBlue;
            this.AutoCheckBox.CheckRectColorDisabled = System.Drawing.Color.Gray;
            this.AutoCheckBox.CheckRectWidth = 14;
            this.AutoCheckBox.CheckState = System.Windows.Forms.CheckState.Unchecked;
            this.AutoCheckBox.Font = new System.Drawing.Font("微软雅黑", 10F, System.Drawing.FontStyle.Bold);
            this.AutoCheckBox.InnerPaddingWidth = 2;
            this.AutoCheckBox.InnerRectInflate = 3;
            this.AutoCheckBox.Location = new System.Drawing.Point(317, 222);
            this.AutoCheckBox.Name = "AutoCheckBox";
            this.AutoCheckBox.Size = new System.Drawing.Size(96, 28);
            this.AutoCheckBox.SpaceBetweenCheckMarkAndText = 3;
            this.AutoCheckBox.TabIndex = 3;
            this.AutoCheckBox.Text = "自动登陆";
            this.AutoCheckBox.TextColorDisabled = System.Drawing.Color.Gray;
            this.AutoCheckBox.TextRenderingHint = System.Drawing.Text.TextRenderingHint.SystemDefault;
            // 
            // LoginForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(10F, 19F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(251)))), ((int)(((byte)(251)))), ((int)(((byte)(251)))));
            this.CanResize = false;
            this.CaptionBackColors = new System.Drawing.Color[] {
        System.Drawing.Color.FromArgb(((int)(((byte)(217)))), ((int)(((byte)(237)))), ((int)(((byte)(247)))))};
            this.CaptionCenter = true;
            this.CaptionFont = new System.Drawing.Font("微软雅黑", 12F, System.Drawing.FontStyle.Bold);
            this.CaptionHeight = 35;
            this.CaptionOffset = new System.Drawing.Point(90, 0);
            this.ClientSize = new System.Drawing.Size(540, 328);
            this.Controls.Add(this.AutoCheckBox);
            this.Controls.Add(this.RememberCheckBox);
            this.Controls.Add(this.LoginButton);
            this.Controls.Add(this.dSkinTableLayoutPanel1);
            this.DoubleClickMaximized = false;
            this.DrawIcon = false;
            this.EnabledDWM = true;
            this.Font = new System.Drawing.Font("微软雅黑", 9F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.Margin = new System.Windows.Forms.Padding(4);
            this.MaximizeBox = false;
            this.Name = "LoginForm";
            this.Opacity = 0.98D;
            this.Padding = new System.Windows.Forms.Padding(15, 20, 15, 15);
            this.Radius = 20;
            this.Text = "登陆";
            this.dSkinTableLayoutPanel1.ResumeLayout(false);
            this.dSkinTableLayoutPanel1.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private DSkin.Controls.DSkinTableLayoutPanel dSkinTableLayoutPanel1;
        private DSkin.Controls.DSkinButton LoginButton;
        private DSkin.Controls.DSkinTextBox UsernameTextBox;
        private DSkin.Controls.DSkinTextBox dSkinTextBox1;
        private DSkin.Controls.DSkinCheckBox RememberCheckBox;
        private DSkin.Controls.DSkinCheckBox AutoCheckBox;
        private DSkin.Controls.DSkinPictureBox dSkinPictureBox2;
        private DSkin.Controls.DSkinPictureBox dSkinPictureBox1;
    }
}