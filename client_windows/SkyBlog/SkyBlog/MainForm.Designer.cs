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
            this.ArticlePanel = new DSkin.Controls.DSkinNewPanel();
            this.ContentMenuStrip = new DSkin.Controls.DSkinContextMenuStrip();
            this.CopyToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.AllSelectToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.toolStripSeparator1 = new System.Windows.Forms.ToolStripSeparator();
            this.ViewToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.EditToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.dSkinFlowLayoutPanel1 = new DSkin.Controls.DSkinFlowLayoutPanel();
            this.ArticleContentLabel = new WindowsFormsControlLibrary.ArticleContent();
            this.ArticleClassifyLabel = new DSkin.Controls.DSkinLabel();
            this.ArticleUpdateDateLabel = new DSkin.Controls.DSkinLabel();
            this.ArticleCreateDateLabel = new DSkin.Controls.DSkinLabel();
            this.dSkinNewPanel2 = new DSkin.Controls.DSkinNewPanel();
            this.NextPageButton = new DSkin.Controls.DSkinButton();
            this.PrevPageButton = new DSkin.Controls.DSkinButton();
            this.ArticlePageInfo = new DSkin.Controls.DSkinLabel();
            ((System.ComponentModel.ISupportInitialize)(this.ArticleListPanel)).BeginInit();
            this.SkyBlogTitlePanel.SuspendLayout();
            this.ArticlePanel.SuspendLayout();
            this.ContentMenuStrip.SuspendLayout();
            this.dSkinFlowLayoutPanel1.SuspendLayout();
            this.dSkinNewPanel2.SuspendLayout();
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
            this.SkyBlogTitleLabel.Cursor = System.Windows.Forms.Cursors.Hand;
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
            this.SkyBlogTitleLabel.Click += new System.EventHandler(this.SkyBlogTitleLabel_Click);
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
            // ArticlePanel
            // 
            this.ArticlePanel.BackColor = System.Drawing.Color.Transparent;
            this.ArticlePanel.ContextMenuStrip = this.ContentMenuStrip;
            this.ArticlePanel.Controls.Add(this.dSkinFlowLayoutPanel1);
            this.ArticlePanel.Controls.Add(this.ArticleClassifyLabel);
            this.ArticlePanel.Controls.Add(this.ArticleUpdateDateLabel);
            this.ArticlePanel.Controls.Add(this.ArticleCreateDateLabel);
            this.ArticlePanel.Controls.Add(this.ArticleSubTitleLabel);
            this.ArticlePanel.Controls.Add(this.ArticleTitleLabel);
            this.ArticlePanel.Location = new System.Drawing.Point(360, 60);
            this.ArticlePanel.Name = "ArticlePanel";
            this.ArticlePanel.Padding = new System.Windows.Forms.Padding(20);
            this.ArticlePanel.Size = new System.Drawing.Size(842, 642);
            this.ArticlePanel.TabIndex = 6;
            this.ArticlePanel.Text = "dSkinNewPanel2";
            // 
            // ContentMenuStrip
            // 
            this.ContentMenuStrip.Arrow = System.Drawing.Color.Black;
            this.ContentMenuStrip.Back = System.Drawing.Color.White;
            this.ContentMenuStrip.BackRadius = 4;
            this.ContentMenuStrip.Base = System.Drawing.Color.FromArgb(((int)(((byte)(105)))), ((int)(((byte)(200)))), ((int)(((byte)(254)))));
            this.ContentMenuStrip.CheckedImage = null;
            this.ContentMenuStrip.DropDownImageSeparator = System.Drawing.Color.FromArgb(((int)(((byte)(197)))), ((int)(((byte)(197)))), ((int)(((byte)(197)))));
            this.ContentMenuStrip.Fore = System.Drawing.Color.Black;
            this.ContentMenuStrip.HoverFore = System.Drawing.Color.White;
            this.ContentMenuStrip.ImageScalingSize = new System.Drawing.Size(20, 20);
            this.ContentMenuStrip.ItemAnamorphosis = true;
            this.ContentMenuStrip.ItemBorder = System.Drawing.Color.FromArgb(((int)(((byte)(60)))), ((int)(((byte)(148)))), ((int)(((byte)(212)))));
            this.ContentMenuStrip.ItemBorderShow = true;
            this.ContentMenuStrip.ItemHover = System.Drawing.Color.FromArgb(((int)(((byte)(60)))), ((int)(((byte)(148)))), ((int)(((byte)(212)))));
            this.ContentMenuStrip.ItemPressed = System.Drawing.Color.FromArgb(((int)(((byte)(60)))), ((int)(((byte)(148)))), ((int)(((byte)(212)))));
            this.ContentMenuStrip.ItemRadius = 4;
            this.ContentMenuStrip.ItemRadiusStyle = DSkin.Common.RoundStyle.All;
            this.ContentMenuStrip.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.CopyToolStripMenuItem,
            this.AllSelectToolStripMenuItem,
            this.toolStripSeparator1,
            this.ViewToolStripMenuItem,
            this.EditToolStripMenuItem});
            this.ContentMenuStrip.ItemSplitter = System.Drawing.Color.FromArgb(((int)(((byte)(60)))), ((int)(((byte)(148)))), ((int)(((byte)(212)))));
            this.ContentMenuStrip.Name = "ContentMenuStrip";
            this.ContentMenuStrip.RadiusStyle = DSkin.Common.RoundStyle.All;
            this.ContentMenuStrip.Size = new System.Drawing.Size(199, 106);
            this.ContentMenuStrip.SkinAllColor = true;
            this.ContentMenuStrip.TitleAnamorphosis = true;
            this.ContentMenuStrip.TitleColor = System.Drawing.Color.FromArgb(((int)(((byte)(209)))), ((int)(((byte)(228)))), ((int)(((byte)(236)))));
            this.ContentMenuStrip.TitleRadius = 4;
            this.ContentMenuStrip.TitleRadiusStyle = DSkin.Common.RoundStyle.All;
            // 
            // CopyToolStripMenuItem
            // 
            this.CopyToolStripMenuItem.Name = "CopyToolStripMenuItem";
            this.CopyToolStripMenuItem.Size = new System.Drawing.Size(198, 24);
            this.CopyToolStripMenuItem.Text = "复制";
            this.CopyToolStripMenuItem.Click += new System.EventHandler(this.CopyToolStripMenuItem_Click);
            // 
            // AllSelectToolStripMenuItem
            // 
            this.AllSelectToolStripMenuItem.Name = "AllSelectToolStripMenuItem";
            this.AllSelectToolStripMenuItem.Size = new System.Drawing.Size(198, 24);
            this.AllSelectToolStripMenuItem.Text = "全选";
            this.AllSelectToolStripMenuItem.Click += new System.EventHandler(this.AllSelectToolStripMenuItem_Click);
            // 
            // toolStripSeparator1
            // 
            this.toolStripSeparator1.Name = "toolStripSeparator1";
            this.toolStripSeparator1.Size = new System.Drawing.Size(195, 6);
            // 
            // ViewToolStripMenuItem
            // 
            this.ViewToolStripMenuItem.Name = "ViewToolStripMenuItem";
            this.ViewToolStripMenuItem.Size = new System.Drawing.Size(198, 24);
            this.ViewToolStripMenuItem.Text = "在网页中查看文章";
            this.ViewToolStripMenuItem.Click += new System.EventHandler(this.ViewToolStripMenuItem_Click);
            // 
            // EditToolStripMenuItem
            // 
            this.EditToolStripMenuItem.Name = "EditToolStripMenuItem";
            this.EditToolStripMenuItem.Size = new System.Drawing.Size(198, 24);
            this.EditToolStripMenuItem.Text = "编辑文章";
            this.EditToolStripMenuItem.Click += new System.EventHandler(this.EditToolStripMenuItem_Click);
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
            this.dSkinFlowLayoutPanel1.Size = new System.Drawing.Size(822, 526);
            this.dSkinFlowLayoutPanel1.TabIndex = 7;
            // 
            // ArticleContentLabel
            // 
            this.ArticleContentLabel.AutoSize = false;
            this.ArticleContentLabel.AutoSizeHeightOnly = true;
            this.ArticleContentLabel.BaseStylesheet = "";
            this.ArticleContentLabel.IsContextMenuEnabled = false;
            this.ArticleContentLabel.Location = new System.Drawing.Point(3, 3);
            this.ArticleContentLabel.Name = "ArticleContentLabel";
            this.ArticleContentLabel.Size = new System.Drawing.Size(798, 82);
            this.ArticleContentLabel.TabIndex = 0;
            this.ArticleContentLabel.Text = "<h1>文章内容</h1>";
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
            // dSkinNewPanel2
            // 
            this.dSkinNewPanel2.BackColor = System.Drawing.Color.Transparent;
            this.dSkinNewPanel2.Controls.Add(this.NextPageButton);
            this.dSkinNewPanel2.Controls.Add(this.PrevPageButton);
            this.dSkinNewPanel2.Controls.Add(this.ArticlePageInfo);
            this.dSkinNewPanel2.Location = new System.Drawing.Point(0, 660);
            this.dSkinNewPanel2.Name = "dSkinNewPanel2";
            this.dSkinNewPanel2.Size = new System.Drawing.Size(360, 40);
            this.dSkinNewPanel2.TabIndex = 7;
            this.dSkinNewPanel2.Text = "dSkinNewPanel2";
            // 
            // NextPageButton
            // 
            this.NextPageButton.AdaptImage = true;
            this.NextPageButton.BaseColor = System.Drawing.Color.FromArgb(((int)(((byte)(133)))), ((int)(((byte)(186)))), ((int)(((byte)(233)))));
            this.NextPageButton.ButtonBorderColor = System.Drawing.Color.Gray;
            this.NextPageButton.ButtonBorderWidth = 1;
            this.NextPageButton.ButtonStyle = DSkin.DirectUI.ButtonStyles.Style1;
            this.NextPageButton.DialogResult = System.Windows.Forms.DialogResult.None;
            this.NextPageButton.Font = new System.Drawing.Font("微软雅黑", 12F, System.Drawing.FontStyle.Bold);
            this.NextPageButton.HoverColor = System.Drawing.Color.Empty;
            this.NextPageButton.HoverImage = null;
            this.NextPageButton.IsPureColor = false;
            this.NextPageButton.Location = new System.Drawing.Point(300, 5);
            this.NextPageButton.Name = "NextPageButton";
            this.NextPageButton.NormalImage = null;
            this.NextPageButton.PressColor = System.Drawing.Color.Empty;
            this.NextPageButton.PressedImage = null;
            this.NextPageButton.Radius = 25;
            this.NextPageButton.ShowButtonBorder = true;
            this.NextPageButton.Size = new System.Drawing.Size(30, 30);
            this.NextPageButton.TabIndex = 5;
            this.NextPageButton.Text = "→";
            this.NextPageButton.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            this.NextPageButton.TextPadding = 0;
            this.NextPageButton.Click += new System.EventHandler(this.NextPageButton_Click);
            // 
            // PrevPageButton
            // 
            this.PrevPageButton.AdaptImage = true;
            this.PrevPageButton.BaseColor = System.Drawing.Color.FromArgb(((int)(((byte)(133)))), ((int)(((byte)(186)))), ((int)(((byte)(233)))));
            this.PrevPageButton.ButtonBorderColor = System.Drawing.Color.Gray;
            this.PrevPageButton.ButtonBorderWidth = 1;
            this.PrevPageButton.ButtonStyle = DSkin.DirectUI.ButtonStyles.Style1;
            this.PrevPageButton.DialogResult = System.Windows.Forms.DialogResult.None;
            this.PrevPageButton.Font = new System.Drawing.Font("微软雅黑", 12F, System.Drawing.FontStyle.Bold);
            this.PrevPageButton.HoverColor = System.Drawing.Color.Empty;
            this.PrevPageButton.HoverImage = null;
            this.PrevPageButton.IsPureColor = false;
            this.PrevPageButton.Location = new System.Drawing.Point(31, 5);
            this.PrevPageButton.Name = "PrevPageButton";
            this.PrevPageButton.NormalImage = null;
            this.PrevPageButton.PressColor = System.Drawing.Color.Empty;
            this.PrevPageButton.PressedImage = null;
            this.PrevPageButton.Radius = 25;
            this.PrevPageButton.ShowButtonBorder = true;
            this.PrevPageButton.Size = new System.Drawing.Size(30, 30);
            this.PrevPageButton.TabIndex = 4;
            this.PrevPageButton.Text = "←";
            this.PrevPageButton.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            this.PrevPageButton.TextPadding = 0;
            this.PrevPageButton.Click += new System.EventHandler(this.PrevPageButton_Click);
            // 
            // ArticlePageInfo
            // 
            this.ArticlePageInfo.BackColor = System.Drawing.Color.WhiteSmoke;
            this.ArticlePageInfo.Dock = System.Windows.Forms.DockStyle.Fill;
            this.ArticlePageInfo.Font = new System.Drawing.Font("微软雅黑", 10F);
            this.ArticlePageInfo.Location = new System.Drawing.Point(0, 0);
            this.ArticlePageInfo.Name = "ArticlePageInfo";
            this.ArticlePageInfo.Size = new System.Drawing.Size(360, 40);
            this.ArticlePageInfo.TabIndex = 3;
            this.ArticlePageInfo.Text = "第 1 页,共 4 页";
            this.ArticlePageInfo.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
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
            this.ClientSize = new System.Drawing.Size(1200, 700);
            this.Controls.Add(this.dSkinNewPanel2);
            this.Controls.Add(this.ArticlePanel);
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
            this.ArticlePanel.ResumeLayout(false);
            this.ArticlePanel.PerformLayout();
            this.ContentMenuStrip.ResumeLayout(false);
            this.dSkinFlowLayoutPanel1.ResumeLayout(false);
            this.dSkinNewPanel2.ResumeLayout(false);
            this.dSkinNewPanel2.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion
        private DSkin.Controls.DSkinLabel ArticleTitleLabel;
        private DSkin.Controls.DSkinLabel ArticleSubTitleLabel;
        private DSkin.Controls.DSkinListBox ArticleListPanel;
        private DSkin.Controls.DSkinNewPanel SkyBlogTitlePanel;
        private DSkin.Controls.DSkinNewPanel dSkinNewPanel1;
        private DSkin.Controls.DSkinLabel SkyBlogTitleLabel;
        private DSkin.Controls.DSkinNewPanel ArticlePanel;
        private DSkin.Controls.DSkinLabel ArticleCreateDateLabel;
        private DSkin.Controls.DSkinLabel ArticleClassifyLabel;
        private DSkin.Controls.DSkinLabel ArticleUpdateDateLabel;
        private DSkin.Controls.DSkinFlowLayoutPanel dSkinFlowLayoutPanel1;
        private WindowsFormsControlLibrary.ArticleContent ArticleContentLabel;
        private DSkin.Controls.DSkinContextMenuStrip ContentMenuStrip;
        private System.Windows.Forms.ToolStripMenuItem ViewToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem EditToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem CopyToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem AllSelectToolStripMenuItem;
        private System.Windows.Forms.ToolStripSeparator toolStripSeparator1;
        private DSkin.Controls.DSkinNewPanel dSkinNewPanel2;
        private DSkin.Controls.DSkinButton NextPageButton;
        private DSkin.Controls.DSkinButton PrevPageButton;
        private DSkin.Controls.DSkinLabel ArticlePageInfo;
    }
}