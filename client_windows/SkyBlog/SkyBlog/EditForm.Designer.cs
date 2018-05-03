namespace SkyBlog
{
    partial class EditForm
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
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(EditForm));
            this.dSkinTableLayoutPanel1 = new DSkin.Controls.DSkinTableLayoutPanel();
            this.ContentTextBox = new DSkin.Controls.DSkinTextBox();
            this.ContentLabal = new DSkin.Controls.DSkinLabel();
            this.SubTitleTextBox = new DSkin.Controls.DSkinTextBox();
            this.dSkinLabel1 = new DSkin.Controls.DSkinLabel();
            this.TitleLabel = new DSkin.Controls.DSkinLabel();
            this.TitleTextBox = new DSkin.Controls.DSkinTextBox();
            this.dSkinNewPanel1 = new DSkin.Controls.DSkinNewPanel();
            this.ExitButton = new DSkin.Controls.DSkinButton();
            this.SaveAndExitButton = new DSkin.Controls.DSkinButton();
            this.SaveButton = new DSkin.Controls.DSkinButton();
            this.dSkinTableLayoutPanel1.SuspendLayout();
            this.dSkinNewPanel1.SuspendLayout();
            this.SuspendLayout();
            // 
            // dSkinTableLayoutPanel1
            // 
            this.dSkinTableLayoutPanel1.BackColor = System.Drawing.Color.Transparent;
            this.dSkinTableLayoutPanel1.BitmapCache = false;
            this.dSkinTableLayoutPanel1.ColumnCount = 2;
            this.dSkinTableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 12.19008F));
            this.dSkinTableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 87.80991F));
            this.dSkinTableLayoutPanel1.Controls.Add(this.ContentTextBox, 1, 2);
            this.dSkinTableLayoutPanel1.Controls.Add(this.ContentLabal, 0, 2);
            this.dSkinTableLayoutPanel1.Controls.Add(this.SubTitleTextBox, 1, 1);
            this.dSkinTableLayoutPanel1.Controls.Add(this.dSkinLabel1, 0, 1);
            this.dSkinTableLayoutPanel1.Controls.Add(this.TitleLabel, 0, 0);
            this.dSkinTableLayoutPanel1.Controls.Add(this.TitleTextBox, 1, 0);
            this.dSkinTableLayoutPanel1.Dock = System.Windows.Forms.DockStyle.Top;
            this.dSkinTableLayoutPanel1.Location = new System.Drawing.Point(14, 50);
            this.dSkinTableLayoutPanel1.Name = "dSkinTableLayoutPanel1";
            this.dSkinTableLayoutPanel1.RightBottom = ((System.Drawing.Image)(resources.GetObject("dSkinTableLayoutPanel1.RightBottom")));
            this.dSkinTableLayoutPanel1.RowCount = 3;
            this.dSkinTableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 50F));
            this.dSkinTableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 50F));
            this.dSkinTableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 166F));
            this.dSkinTableLayoutPanel1.Size = new System.Drawing.Size(972, 493);
            this.dSkinTableLayoutPanel1.TabIndex = 0;
            // 
            // ContentTextBox
            // 
            this.ContentTextBox.AcceptsReturn = true;
            this.ContentTextBox.BitmapCache = false;
            this.ContentTextBox.Dock = System.Windows.Forms.DockStyle.Fill;
            this.ContentTextBox.Font = new System.Drawing.Font("微软雅黑", 10F);
            this.ContentTextBox.Location = new System.Drawing.Point(128, 110);
            this.ContentTextBox.Margin = new System.Windows.Forms.Padding(10);
            this.ContentTextBox.Multiline = true;
            this.ContentTextBox.Name = "ContentTextBox";
            this.ContentTextBox.ScrollBars = System.Windows.Forms.ScrollBars.Vertical;
            this.ContentTextBox.Size = new System.Drawing.Size(834, 373);
            this.ContentTextBox.TabIndex = 5;
            this.ContentTextBox.TransparencyKey = System.Drawing.Color.Empty;
            this.ContentTextBox.WaterFont = new System.Drawing.Font("宋体", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.ContentTextBox.WaterText = "";
            this.ContentTextBox.WaterTextOffset = new System.Drawing.Point(0, 0);
            // 
            // ContentLabal
            // 
            this.ContentLabal.AllowDrop = true;
            this.ContentLabal.Dock = System.Windows.Forms.DockStyle.Fill;
            this.ContentLabal.Font = new System.Drawing.Font("微软雅黑", 10F, System.Drawing.FontStyle.Bold);
            this.ContentLabal.Location = new System.Drawing.Point(3, 103);
            this.ContentLabal.Name = "ContentLabal";
            this.ContentLabal.Size = new System.Drawing.Size(112, 387);
            this.ContentLabal.TabIndex = 4;
            this.ContentLabal.Text = "文章内容：(Markdown)";
            this.ContentLabal.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // SubTitleTextBox
            // 
            this.SubTitleTextBox.BitmapCache = false;
            this.SubTitleTextBox.Dock = System.Windows.Forms.DockStyle.Fill;
            this.SubTitleTextBox.Font = new System.Drawing.Font("微软雅黑", 10F);
            this.SubTitleTextBox.Location = new System.Drawing.Point(128, 60);
            this.SubTitleTextBox.Margin = new System.Windows.Forms.Padding(10);
            this.SubTitleTextBox.Name = "SubTitleTextBox";
            this.SubTitleTextBox.Size = new System.Drawing.Size(834, 29);
            this.SubTitleTextBox.TabIndex = 3;
            this.SubTitleTextBox.TransparencyKey = System.Drawing.Color.Empty;
            this.SubTitleTextBox.WaterFont = new System.Drawing.Font("宋体", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.SubTitleTextBox.WaterText = "";
            this.SubTitleTextBox.WaterTextOffset = new System.Drawing.Point(0, 0);
            // 
            // dSkinLabel1
            // 
            this.dSkinLabel1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.dSkinLabel1.Font = new System.Drawing.Font("微软雅黑", 10F, System.Drawing.FontStyle.Bold);
            this.dSkinLabel1.Location = new System.Drawing.Point(3, 53);
            this.dSkinLabel1.Name = "dSkinLabel1";
            this.dSkinLabel1.Size = new System.Drawing.Size(112, 44);
            this.dSkinLabel1.TabIndex = 2;
            this.dSkinLabel1.Text = "文章副标题：";
            this.dSkinLabel1.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // TitleLabel
            // 
            this.TitleLabel.Dock = System.Windows.Forms.DockStyle.Fill;
            this.TitleLabel.Font = new System.Drawing.Font("微软雅黑", 10F, System.Drawing.FontStyle.Bold);
            this.TitleLabel.Location = new System.Drawing.Point(3, 3);
            this.TitleLabel.Name = "TitleLabel";
            this.TitleLabel.Size = new System.Drawing.Size(112, 44);
            this.TitleLabel.TabIndex = 0;
            this.TitleLabel.Text = "文章标题：";
            this.TitleLabel.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // TitleTextBox
            // 
            this.TitleTextBox.BitmapCache = false;
            this.TitleTextBox.Font = new System.Drawing.Font("微软雅黑", 10F);
            this.TitleTextBox.Location = new System.Drawing.Point(128, 10);
            this.TitleTextBox.Margin = new System.Windows.Forms.Padding(10);
            this.TitleTextBox.Name = "TitleTextBox";
            this.TitleTextBox.Size = new System.Drawing.Size(828, 29);
            this.TitleTextBox.TabIndex = 1;
            this.TitleTextBox.TransparencyKey = System.Drawing.Color.Empty;
            this.TitleTextBox.WaterFont = new System.Drawing.Font("宋体", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.TitleTextBox.WaterText = "";
            this.TitleTextBox.WaterTextOffset = new System.Drawing.Point(0, 0);
            // 
            // dSkinNewPanel1
            // 
            this.dSkinNewPanel1.BackColor = System.Drawing.Color.Transparent;
            this.dSkinNewPanel1.Controls.Add(this.ExitButton);
            this.dSkinNewPanel1.Controls.Add(this.SaveAndExitButton);
            this.dSkinNewPanel1.Controls.Add(this.SaveButton);
            this.dSkinNewPanel1.Dock = System.Windows.Forms.DockStyle.Bottom;
            this.dSkinNewPanel1.Location = new System.Drawing.Point(14, 549);
            this.dSkinNewPanel1.Name = "dSkinNewPanel1";
            this.dSkinNewPanel1.Size = new System.Drawing.Size(972, 46);
            this.dSkinNewPanel1.TabIndex = 1;
            this.dSkinNewPanel1.Text = "dSkinNewPanel1";
            // 
            // ExitButton
            // 
            this.ExitButton.AdaptImage = true;
            this.ExitButton.BaseColor = System.Drawing.Color.FromArgb(((int)(((byte)(217)))), ((int)(((byte)(83)))), ((int)(((byte)(79)))));
            this.ExitButton.ButtonBorderColor = System.Drawing.Color.FromArgb(((int)(((byte)(212)))), ((int)(((byte)(63)))), ((int)(((byte)(58)))));
            this.ExitButton.ButtonBorderWidth = 1;
            this.ExitButton.DialogResult = System.Windows.Forms.DialogResult.None;
            this.ExitButton.Font = new System.Drawing.Font("微软雅黑", 10F, System.Drawing.FontStyle.Bold);
            this.ExitButton.ForeColor = System.Drawing.Color.White;
            this.ExitButton.HoverColor = System.Drawing.Color.Empty;
            this.ExitButton.HoverImage = null;
            this.ExitButton.IsPureColor = false;
            this.ExitButton.Location = new System.Drawing.Point(544, 3);
            this.ExitButton.Name = "ExitButton";
            this.ExitButton.NormalImage = null;
            this.ExitButton.PressColor = System.Drawing.Color.Empty;
            this.ExitButton.PressedImage = null;
            this.ExitButton.Radius = 10;
            this.ExitButton.ShowButtonBorder = true;
            this.ExitButton.Size = new System.Drawing.Size(136, 40);
            this.ExitButton.TabIndex = 5;
            this.ExitButton.Text = "放弃编辑并关闭";
            this.ExitButton.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            this.ExitButton.TextPadding = 0;
            this.ExitButton.Click += new System.EventHandler(this.ExitButton_Click);
            // 
            // SaveAndExitButton
            // 
            this.SaveAndExitButton.AdaptImage = true;
            this.SaveAndExitButton.BaseColor = System.Drawing.Color.FromArgb(((int)(((byte)(31)))), ((int)(((byte)(202)))), ((int)(((byte)(17)))));
            this.SaveAndExitButton.ButtonBorderColor = System.Drawing.Color.FromArgb(((int)(((byte)(76)))), ((int)(((byte)(174)))), ((int)(((byte)(76)))));
            this.SaveAndExitButton.ButtonBorderWidth = 1;
            this.SaveAndExitButton.DialogResult = System.Windows.Forms.DialogResult.None;
            this.SaveAndExitButton.Font = new System.Drawing.Font("微软雅黑", 10F, System.Drawing.FontStyle.Bold);
            this.SaveAndExitButton.ForeColor = System.Drawing.Color.White;
            this.SaveAndExitButton.HoverColor = System.Drawing.Color.Empty;
            this.SaveAndExitButton.HoverImage = null;
            this.SaveAndExitButton.IsPureColor = false;
            this.SaveAndExitButton.Location = new System.Drawing.Point(400, 3);
            this.SaveAndExitButton.Name = "SaveAndExitButton";
            this.SaveAndExitButton.NormalImage = null;
            this.SaveAndExitButton.PressColor = System.Drawing.Color.Empty;
            this.SaveAndExitButton.PressedImage = null;
            this.SaveAndExitButton.Radius = 10;
            this.SaveAndExitButton.ShowButtonBorder = true;
            this.SaveAndExitButton.Size = new System.Drawing.Size(100, 40);
            this.SaveAndExitButton.TabIndex = 4;
            this.SaveAndExitButton.Text = "保存并关闭";
            this.SaveAndExitButton.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            this.SaveAndExitButton.TextPadding = 0;
            this.SaveAndExitButton.Click += new System.EventHandler(this.SaveAndExitButton_Click);
            // 
            // SaveButton
            // 
            this.SaveButton.AdaptImage = true;
            this.SaveButton.BaseColor = System.Drawing.Color.FromArgb(((int)(((byte)(31)))), ((int)(((byte)(202)))), ((int)(((byte)(17)))));
            this.SaveButton.ButtonBorderColor = System.Drawing.Color.FromArgb(((int)(((byte)(76)))), ((int)(((byte)(174)))), ((int)(((byte)(76)))));
            this.SaveButton.ButtonBorderWidth = 1;
            this.SaveButton.DialogResult = System.Windows.Forms.DialogResult.None;
            this.SaveButton.Font = new System.Drawing.Font("微软雅黑", 10F, System.Drawing.FontStyle.Bold);
            this.SaveButton.ForeColor = System.Drawing.Color.White;
            this.SaveButton.HoverColor = System.Drawing.Color.Empty;
            this.SaveButton.HoverImage = null;
            this.SaveButton.IsPureColor = false;
            this.SaveButton.Location = new System.Drawing.Point(256, 3);
            this.SaveButton.Name = "SaveButton";
            this.SaveButton.NormalImage = null;
            this.SaveButton.PressColor = System.Drawing.Color.Empty;
            this.SaveButton.PressedImage = null;
            this.SaveButton.Radius = 10;
            this.SaveButton.ShowButtonBorder = true;
            this.SaveButton.Size = new System.Drawing.Size(100, 40);
            this.SaveButton.TabIndex = 3;
            this.SaveButton.Text = "保存";
            this.SaveButton.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            this.SaveButton.TextPadding = 0;
            this.SaveButton.Click += new System.EventHandler(this.SaveButton_Click);
            // 
            // EditForm
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
            this.ClientSize = new System.Drawing.Size(1000, 609);
            this.Controls.Add(this.dSkinNewPanel1);
            this.Controls.Add(this.dSkinTableLayoutPanel1);
            this.DoubleClickMaximized = false;
            this.DrawIcon = false;
            this.EnabledDWM = true;
            this.Font = new System.Drawing.Font("微软雅黑", 9F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.InheritTheme = true;
            this.Margin = new System.Windows.Forms.Padding(4);
            this.MaximizeBox = false;
            this.Name = "EditForm";
            this.Opacity = 0.95D;
            this.Padding = new System.Windows.Forms.Padding(10, 15, 10, 10);
            this.Text = "EditForm";
            this.Load += new System.EventHandler(this.EditForm_Load);
            this.dSkinTableLayoutPanel1.ResumeLayout(false);
            this.dSkinTableLayoutPanel1.PerformLayout();
            this.dSkinNewPanel1.ResumeLayout(false);
            this.ResumeLayout(false);

        }

        #endregion

        private DSkin.Controls.DSkinTableLayoutPanel dSkinTableLayoutPanel1;
        private DSkin.Controls.DSkinTextBox SubTitleTextBox;
        private DSkin.Controls.DSkinLabel dSkinLabel1;
        private DSkin.Controls.DSkinLabel TitleLabel;
        private DSkin.Controls.DSkinTextBox TitleTextBox;
        private DSkin.Controls.DSkinLabel ContentLabal;
        private DSkin.Controls.DSkinTextBox ContentTextBox;
        private DSkin.Controls.DSkinNewPanel dSkinNewPanel1;
        private DSkin.Controls.DSkinButton ExitButton;
        private DSkin.Controls.DSkinButton SaveAndExitButton;
        private DSkin.Controls.DSkinButton SaveButton;
    }
}