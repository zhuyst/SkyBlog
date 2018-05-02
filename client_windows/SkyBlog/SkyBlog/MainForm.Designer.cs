namespace SkyBlog
{
    partial class MainForm
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
            this.ArticleTitle = new DSkin.Controls.DSkinLabel();
            this.ArticleSubTitle = new DSkin.Controls.DSkinLabel();
            this.ArticleList = new DSkin.Controls.DSkinListBox();
            this.SkyBlogTitlePanel = new DSkin.Controls.DSkinNewPanel();
            this.dSkinNewPanel1 = new DSkin.Controls.DSkinNewPanel();
            this.SkyBlogTitle = new DSkin.Controls.DSkinLabel();
            ((System.ComponentModel.ISupportInitialize)(this.ArticleList)).BeginInit();
            this.SkyBlogTitlePanel.SuspendLayout();
            this.SuspendLayout();
            // 
            // ArticleTitle
            // 
            this.ArticleTitle.Font = new System.Drawing.Font("微软雅黑", 14F, System.Drawing.FontStyle.Bold);
            this.ArticleTitle.Location = new System.Drawing.Point(433, 140);
            this.ArticleTitle.Name = "ArticleTitle";
            this.ArticleTitle.Size = new System.Drawing.Size(104, 34);
            this.ArticleTitle.TabIndex = 2;
            this.ArticleTitle.Text = "文章标题";
            // 
            // ArticleSubTitle
            // 
            this.ArticleSubTitle.Font = new System.Drawing.Font("微软雅黑", 10F, System.Drawing.FontStyle.Bold);
            this.ArticleSubTitle.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(77)))), ((int)(((byte)(77)))), ((int)(((byte)(77)))));
            this.ArticleSubTitle.Location = new System.Drawing.Point(422, 218);
            this.ArticleSubTitle.Name = "ArticleSubTitle";
            this.ArticleSubTitle.Size = new System.Drawing.Size(92, 25);
            this.ArticleSubTitle.TabIndex = 3;
            this.ArticleSubTitle.Text = "文章副标题";
            // 
            // ArticleList
            // 
            this.ArticleList.BackColor = System.Drawing.Color.WhiteSmoke;
            this.ArticleList.Location = new System.Drawing.Point(0, 62);
            this.ArticleList.Margin = new System.Windows.Forms.Padding(0);
            this.ArticleList.Name = "ArticleList";
            this.ArticleList.ScrollBarWidth = 12;
            this.ArticleList.Size = new System.Drawing.Size(360, 600);
            this.ArticleList.TabIndex = 3;
            this.ArticleList.Text = "dSkinListBox1";
            this.ArticleList.Value = 0D;
            this.ArticleList.ItemClick += new System.EventHandler<DSkin.Controls.ItemClickEventArgs>(this.ArticleList_ItemClick);
            // 
            // SkyBlogTitlePanel
            // 
            this.SkyBlogTitlePanel.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(49)))), ((int)(((byte)(112)))), ((int)(((byte)(143)))));
            this.SkyBlogTitlePanel.Controls.Add(this.SkyBlogTitle);
            this.SkyBlogTitlePanel.Location = new System.Drawing.Point(0, 0);
            this.SkyBlogTitlePanel.Name = "SkyBlogTitlePanel";
            this.SkyBlogTitlePanel.Size = new System.Drawing.Size(360, 60);
            this.SkyBlogTitlePanel.TabIndex = 4;
            this.SkyBlogTitlePanel.Text = "dSkinNewPanel1";
            // 
            // dSkinNewPanel1
            // 
            this.dSkinNewPanel1.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(217)))), ((int)(((byte)(237)))), ((int)(((byte)(247)))));
            this.dSkinNewPanel1.Location = new System.Drawing.Point(360, 0);
            this.dSkinNewPanel1.Name = "dSkinNewPanel1";
            this.dSkinNewPanel1.Size = new System.Drawing.Size(779, 60);
            this.dSkinNewPanel1.TabIndex = 5;
            this.dSkinNewPanel1.Text = "dSkinNewPanel1";
            // 
            // SkyBlogTitle
            // 
            this.SkyBlogTitle.Dock = System.Windows.Forms.DockStyle.Fill;
            this.SkyBlogTitle.Font = new System.Drawing.Font("微软雅黑", 18F, System.Drawing.FontStyle.Bold);
            this.SkyBlogTitle.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(217)))), ((int)(((byte)(237)))), ((int)(((byte)(247)))));
            this.SkyBlogTitle.Location = new System.Drawing.Point(0, 0);
            this.SkyBlogTitle.Margin = new System.Windows.Forms.Padding(0);
            this.SkyBlogTitle.Name = "SkyBlogTitle";
            this.SkyBlogTitle.Size = new System.Drawing.Size(360, 60);
            this.SkyBlogTitle.TabIndex = 3;
            this.SkyBlogTitle.Text = "SkyBlog";
            this.SkyBlogTitle.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            this.SkyBlogTitle.TextEffect = DSkin.DirectUI.TextEffects.Forme;
            // 
            // MainForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(10F, 19F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(251)))), ((int)(((byte)(251)))), ((int)(((byte)(251)))));
            this.CanResize = false;
            this.CaptionBackColors = new System.Drawing.Color[] {
        System.Drawing.Color.FromArgb(((int)(((byte)(217)))), ((int)(((byte)(237)))), ((int)(((byte)(247)))))};
            this.CaptionCenter = true;
            this.CaptionColor = System.Drawing.Color.FromArgb(((int)(((byte)(49)))), ((int)(((byte)(112)))), ((int)(((byte)(143)))));
            this.CaptionFont = new System.Drawing.Font("宋体", 16.2F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.CaptionHeight = 60;
            this.CaptionShowMode = DSkin.TextShowModes.Ordinary;
            this.ClientSize = new System.Drawing.Size(1200, 663);
            this.Controls.Add(this.SkyBlogTitlePanel);
            this.Controls.Add(this.ArticleSubTitle);
            this.Controls.Add(this.ArticleList);
            this.Controls.Add(this.ArticleTitle);
            this.Controls.Add(this.dSkinNewPanel1);
            this.DoubleClickMaximized = false;
            this.DrawIcon = false;
            this.EnabledDWM = true;
            this.Font = new System.Drawing.Font("微软雅黑", 9F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.HaloColor = System.Drawing.SystemColors.GradientActiveCaption;
            this.HaloSize = 8;
            this.Margin = new System.Windows.Forms.Padding(4);
            this.MaximizeBox = false;
            this.Name = "MainForm";
            this.Opacity = 0.98D;
            this.Padding = new System.Windows.Forms.Padding(0);
            this.Radius = 20;
            this.ShowShadow = true;
            this.Text = "SkyBlog";
            this.Load += new System.EventHandler(this.MainForm_Load);
            ((System.ComponentModel.ISupportInitialize)(this.ArticleList)).EndInit();
            this.SkyBlogTitlePanel.ResumeLayout(false);
            this.SkyBlogTitlePanel.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion
        private DSkin.Controls.DSkinLabel ArticleTitle;
        private DSkin.Controls.DSkinLabel ArticleSubTitle;
        private DSkin.Controls.DSkinListBox ArticleList;
        private DSkin.Controls.DSkinNewPanel SkyBlogTitlePanel;
        private DSkin.Controls.DSkinNewPanel dSkinNewPanel1;
        private DSkin.Controls.DSkinLabel SkyBlogTitle;
    }
}