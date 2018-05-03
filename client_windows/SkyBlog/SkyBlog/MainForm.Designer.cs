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
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(MainForm));
            this.ArticleTitleLabel = new DSkin.Controls.DSkinLabel();
            this.ArticleSubTitleLabel = new DSkin.Controls.DSkinLabel();
            this.ArticleListPanel = new DSkin.Controls.DSkinListBox();
            this.SkyBlogTitlePanel = new DSkin.Controls.DSkinNewPanel();
            this.SkyBlogTitleLabel = new DSkin.Controls.DSkinLabel();
            this.dSkinNewPanel1 = new DSkin.Controls.DSkinNewPanel();
            this.dSkinNewPanel2 = new DSkin.Controls.DSkinNewPanel();
            this.dSkinFlowLayoutPanel1 = new DSkin.Controls.DSkinFlowLayoutPanel();
            this.ArticleContentLabel = new WindowsFormsControlLibrary.ArticleContent();
            this.ArticleClassifyLabel = new DSkin.Controls.DSkinLabel();
            this.ArticleUpdateDateLabel = new DSkin.Controls.DSkinLabel();
            this.ArticleCreateDateLabel = new DSkin.Controls.DSkinLabel();
            ((System.ComponentModel.ISupportInitialize)(this.ArticleListPanel)).BeginInit();
            this.SkyBlogTitlePanel.SuspendLayout();
            this.dSkinNewPanel2.SuspendLayout();
            this.dSkinFlowLayoutPanel1.SuspendLayout();
            this.SuspendLayout();
            // 
            // ArticleTitleLabel
            // 
            this.ArticleTitleLabel.Font = new System.Drawing.Font("微软雅黑", 14F, System.Drawing.FontStyle.Bold);
            this.ArticleTitleLabel.Location = new System.Drawing.Point(23, 23);
            this.ArticleTitleLabel.Name = "ArticleTitleLabel";
            this.ArticleTitleLabel.Size = new System.Drawing.Size(104, 34);
            this.ArticleTitleLabel.TabIndex = 2;
            this.ArticleTitleLabel.Text = "文章标题";
            // 
            // ArticleSubTitleLabel
            // 
            this.ArticleSubTitleLabel.Font = new System.Drawing.Font("微软雅黑", 10F, System.Drawing.FontStyle.Bold);
            this.ArticleSubTitleLabel.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(77)))), ((int)(((byte)(77)))), ((int)(((byte)(77)))));
            this.ArticleSubTitleLabel.Location = new System.Drawing.Point(23, 63);
            this.ArticleSubTitleLabel.Name = "ArticleSubTitleLabel";
            this.ArticleSubTitleLabel.Size = new System.Drawing.Size(92, 25);
            this.ArticleSubTitleLabel.TabIndex = 3;
            this.ArticleSubTitleLabel.Text = "文章副标题";
            // 
            // ArticleListPanel
            // 
            this.ArticleListPanel.BackColor = System.Drawing.Color.WhiteSmoke;
            this.ArticleListPanel.Location = new System.Drawing.Point(0, 62);
            this.ArticleListPanel.Margin = new System.Windows.Forms.Padding(0);
            this.ArticleListPanel.Name = "ArticleListPanel";
            this.ArticleListPanel.ScrollBarWidth = 12;
            this.ArticleListPanel.Size = new System.Drawing.Size(360, 600);
            this.ArticleListPanel.TabIndex = 3;
            this.ArticleListPanel.Text = "dSkinListBox1";
            this.ArticleListPanel.Value = 0D;
            this.ArticleListPanel.ItemClick += new System.EventHandler<DSkin.Controls.ItemClickEventArgs>(this.ArticleList_ItemClick);
            // 
            // SkyBlogTitlePanel
            // 
            this.SkyBlogTitlePanel.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(49)))), ((int)(((byte)(112)))), ((int)(((byte)(143)))));
            this.SkyBlogTitlePanel.Controls.Add(this.SkyBlogTitleLabel);
            this.SkyBlogTitlePanel.Location = new System.Drawing.Point(0, 0);
            this.SkyBlogTitlePanel.Name = "SkyBlogTitlePanel";
            this.SkyBlogTitlePanel.Size = new System.Drawing.Size(360, 60);
            this.SkyBlogTitlePanel.TabIndex = 4;
            this.SkyBlogTitlePanel.Text = "dSkinNewPanel1";
            // 
            // SkyBlogTitleLabel
            // 
            this.SkyBlogTitleLabel.Dock = System.Windows.Forms.DockStyle.Fill;
            this.SkyBlogTitleLabel.Font = new System.Drawing.Font("微软雅黑", 18F, System.Drawing.FontStyle.Bold);
            this.SkyBlogTitleLabel.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(217)))), ((int)(((byte)(237)))), ((int)(((byte)(247)))));
            this.SkyBlogTitleLabel.Location = new System.Drawing.Point(0, 0);
            this.SkyBlogTitleLabel.Margin = new System.Windows.Forms.Padding(0);
            this.SkyBlogTitleLabel.Name = "SkyBlogTitleLabel";
            this.SkyBlogTitleLabel.Size = new System.Drawing.Size(360, 60);
            this.SkyBlogTitleLabel.TabIndex = 3;
            this.SkyBlogTitleLabel.Text = "SkyBlog";
            this.SkyBlogTitleLabel.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            this.SkyBlogTitleLabel.TextEffect = DSkin.DirectUI.TextEffects.Forme;
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
            // dSkinNewPanel2
            // 
            this.dSkinNewPanel2.BackColor = System.Drawing.Color.Transparent;
            this.dSkinNewPanel2.Controls.Add(this.dSkinFlowLayoutPanel1);
            this.dSkinNewPanel2.Controls.Add(this.ArticleClassifyLabel);
            this.dSkinNewPanel2.Controls.Add(this.ArticleUpdateDateLabel);
            this.dSkinNewPanel2.Controls.Add(this.ArticleCreateDateLabel);
            this.dSkinNewPanel2.Controls.Add(this.ArticleSubTitleLabel);
            this.dSkinNewPanel2.Controls.Add(this.ArticleTitleLabel);
            this.dSkinNewPanel2.Location = new System.Drawing.Point(360, 60);
            this.dSkinNewPanel2.Name = "dSkinNewPanel2";
            this.dSkinNewPanel2.Padding = new System.Windows.Forms.Padding(20);
            this.dSkinNewPanel2.Size = new System.Drawing.Size(842, 602);
            this.dSkinNewPanel2.TabIndex = 6;
            this.dSkinNewPanel2.Text = "dSkinNewPanel2";
            // 
            // dSkinFlowLayoutPanel1
            // 
            this.dSkinFlowLayoutPanel1.AutoScroll = true;
            this.dSkinFlowLayoutPanel1.BackColor = System.Drawing.Color.Transparent;
            this.dSkinFlowLayoutPanel1.BitmapCache = false;
            this.dSkinFlowLayoutPanel1.Controls.Add(this.ArticleContentLabel);
            this.dSkinFlowLayoutPanel1.FlowDirection = System.Windows.Forms.FlowDirection.TopDown;
            this.dSkinFlowLayoutPanel1.Location = new System.Drawing.Point(17, 107);
            this.dSkinFlowLayoutPanel1.Name = "dSkinFlowLayoutPanel1";
            this.dSkinFlowLayoutPanel1.RightBottom = ((System.Drawing.Image)(resources.GetObject("dSkinFlowLayoutPanel1.RightBottom")));
            this.dSkinFlowLayoutPanel1.Size = new System.Drawing.Size(816, 489);
            this.dSkinFlowLayoutPanel1.TabIndex = 7;
            // 
            // ArticleContentLabel
            // 
            this.ArticleContentLabel.AutoSize = false;
            this.ArticleContentLabel.AutoSizeHeightOnly = true;
            this.ArticleContentLabel.BaseStylesheet = "";
            this.ArticleContentLabel.Location = new System.Drawing.Point(3, 3);
            this.ArticleContentLabel.Name = "ArticleContentLabel";
            this.ArticleContentLabel.Size = new System.Drawing.Size(790, 25);
            this.ArticleContentLabel.TabIndex = 0;
            this.ArticleContentLabel.Text = "articleContent1";
            // 
            // ArticleClassifyLabel
            // 
            this.ArticleClassifyLabel.Font = new System.Drawing.Font("微软雅黑", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.ArticleClassifyLabel.Location = new System.Drawing.Point(598, 79);
            this.ArticleClassifyLabel.Name = "ArticleClassifyLabel";
            this.ArticleClassifyLabel.Size = new System.Drawing.Size(98, 22);
            this.ArticleClassifyLabel.TabIndex = 6;
            this.ArticleClassifyLabel.Text = "分类：未分类";
            // 
            // ArticleUpdateDateLabel
            // 
            this.ArticleUpdateDateLabel.Font = new System.Drawing.Font("微软雅黑", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.ArticleUpdateDateLabel.Location = new System.Drawing.Point(598, 51);
            this.ArticleUpdateDateLabel.Name = "ArticleUpdateDateLabel";
            this.ArticleUpdateDateLabel.Size = new System.Drawing.Size(244, 22);
            this.ArticleUpdateDateLabel.TabIndex = 5;
            this.ArticleUpdateDateLabel.Text = "最后修改时间：2018-04-23 15:32";
            // 
            // ArticleCreateDateLabel
            // 
            this.ArticleCreateDateLabel.Font = new System.Drawing.Font("微软雅黑", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.ArticleCreateDateLabel.Location = new System.Drawing.Point(598, 23);
            this.ArticleCreateDateLabel.Name = "ArticleCreateDateLabel";
            this.ArticleCreateDateLabel.Size = new System.Drawing.Size(244, 22);
            this.ArticleCreateDateLabel.TabIndex = 4;
            this.ArticleCreateDateLabel.Text = "文章发布时间：2018-04-23 15:32";
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
            this.Controls.Add(this.dSkinNewPanel2);
            this.Controls.Add(this.SkyBlogTitlePanel);
            this.Controls.Add(this.ArticleListPanel);
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
            ((System.ComponentModel.ISupportInitialize)(this.ArticleListPanel)).EndInit();
            this.SkyBlogTitlePanel.ResumeLayout(false);
            this.SkyBlogTitlePanel.PerformLayout();
            this.dSkinNewPanel2.ResumeLayout(false);
            this.dSkinNewPanel2.PerformLayout();
            this.dSkinFlowLayoutPanel1.ResumeLayout(false);
            this.ResumeLayout(false);

        }

        #endregion
        private DSkin.Controls.DSkinLabel ArticleTitleLabel;
        private DSkin.Controls.DSkinLabel ArticleSubTitleLabel;
        private DSkin.Controls.DSkinListBox ArticleListPanel;
        private DSkin.Controls.DSkinNewPanel SkyBlogTitlePanel;
        private DSkin.Controls.DSkinNewPanel dSkinNewPanel1;
        private DSkin.Controls.DSkinLabel SkyBlogTitleLabel;
        private DSkin.Controls.DSkinNewPanel dSkinNewPanel2;
        private DSkin.Controls.DSkinLabel ArticleCreateDateLabel;
        private DSkin.Controls.DSkinLabel ArticleClassifyLabel;
        private DSkin.Controls.DSkinLabel ArticleUpdateDateLabel;
        private DSkin.Controls.DSkinFlowLayoutPanel dSkinFlowLayoutPanel1;
        private WindowsFormsControlLibrary.ArticleContent ArticleContentLabel;
    }
}