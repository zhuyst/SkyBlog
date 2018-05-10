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
            this.ContentMenuStrip = new DSkin.Controls.DSkinContextMenuStrip();
            this.CopyToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.AllSelectToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.ToolStripSeparator1 = new System.Windows.Forms.ToolStripSeparator();
            this.ViewToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.ViewIndexToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.ToolStripSeparator2 = new System.Windows.Forms.ToolStripSeparator();
            this.EditToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.DeleteToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.toolStripSeparator3 = new System.Windows.Forms.ToolStripSeparator();
            this.LoginToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.ArticlePanel = new DSkin.Controls.DSkinNewPanel();
            this.dSkinFlowLayoutPanel1 = new DSkin.Controls.DSkinFlowLayoutPanel();
            this.ArticleContentLabel = new WindowsFormsControlLibrary.ArticleContent();
            this.ArticleClassifyLabel = new DSkin.Controls.DSkinLabel();
            this.ArticleUpdateDateLabel = new DSkin.Controls.DSkinLabel();
            this.ArticleCreateDateLabel = new DSkin.Controls.DSkinLabel();
            this.dSkinNewPanel2 = new DSkin.Controls.DSkinNewPanel();
            this.NextPageButton = new DSkin.Controls.DSkinButton();
            this.PrevPageButton = new DSkin.Controls.DSkinButton();
            this.ArticlePageInfo = new DSkin.Controls.DSkinLabel();
            this.dSkinNewPanel1 = new DSkin.Controls.DSkinNewPanel();
            this.ToolStrip = new DSkin.Controls.DSkinToolStrip();
            this.ReloadButton = new System.Windows.Forms.ToolStripButton();
            this.EditButton = new System.Windows.Forms.ToolStripButton();
            this.DeleteButton = new System.Windows.Forms.ToolStripButton();
            this.LoginButton = new System.Windows.Forms.ToolStripButton();
            this.UserToolStripDropDownButton = new System.Windows.Forms.ToolStripDropDownButton();
            this.LogoutToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.UserToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.LogoutToolStripMenuItem2 = new System.Windows.Forms.ToolStripMenuItem();
            ((System.ComponentModel.ISupportInitialize)(this.ArticleListPanel)).BeginInit();
            this.SkyBlogTitlePanel.SuspendLayout();
            this.ContentMenuStrip.SuspendLayout();
            this.ArticlePanel.SuspendLayout();
            this.dSkinFlowLayoutPanel1.SuspendLayout();
            this.dSkinNewPanel2.SuspendLayout();
            this.dSkinNewPanel1.SuspendLayout();
            this.ToolStrip.SuspendLayout();
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
            this.SkyBlogTitleLabel.Click += new System.EventHandler(this.WebIndex_Click);
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
            this.ToolStripSeparator1,
            this.ViewToolStripMenuItem,
            this.ViewIndexToolStripMenuItem,
            this.ToolStripSeparator2,
            this.EditToolStripMenuItem,
            this.DeleteToolStripMenuItem,
            this.toolStripSeparator3,
            this.LoginToolStripMenuItem,
            this.UserToolStripMenuItem});
            this.ContentMenuStrip.ItemSplitter = System.Drawing.Color.FromArgb(((int)(((byte)(60)))), ((int)(((byte)(148)))), ((int)(((byte)(212)))));
            this.ContentMenuStrip.Name = "ContentMenuStrip";
            this.ContentMenuStrip.RadiusStyle = DSkin.Common.RoundStyle.All;
            this.ContentMenuStrip.Size = new System.Drawing.Size(211, 242);
            this.ContentMenuStrip.SkinAllColor = true;
            this.ContentMenuStrip.TitleAnamorphosis = true;
            this.ContentMenuStrip.TitleColor = System.Drawing.Color.FromArgb(((int)(((byte)(209)))), ((int)(((byte)(228)))), ((int)(((byte)(236)))));
            this.ContentMenuStrip.TitleRadius = 4;
            this.ContentMenuStrip.TitleRadiusStyle = DSkin.Common.RoundStyle.All;
            // 
            // CopyToolStripMenuItem
            // 
            this.CopyToolStripMenuItem.Name = "CopyToolStripMenuItem";
            this.CopyToolStripMenuItem.Size = new System.Drawing.Size(210, 24);
            this.CopyToolStripMenuItem.Text = "复制";
            this.CopyToolStripMenuItem.Click += new System.EventHandler(this.CopyToolStripMenuItem_Click);
            // 
            // AllSelectToolStripMenuItem
            // 
            this.AllSelectToolStripMenuItem.Name = "AllSelectToolStripMenuItem";
            this.AllSelectToolStripMenuItem.Size = new System.Drawing.Size(210, 24);
            this.AllSelectToolStripMenuItem.Text = "全选";
            this.AllSelectToolStripMenuItem.Click += new System.EventHandler(this.AllSelectToolStripMenuItem_Click);
            // 
            // ToolStripSeparator1
            // 
            this.ToolStripSeparator1.Name = "ToolStripSeparator1";
            this.ToolStripSeparator1.Size = new System.Drawing.Size(207, 6);
            // 
            // ViewToolStripMenuItem
            // 
            this.ViewToolStripMenuItem.Name = "ViewToolStripMenuItem";
            this.ViewToolStripMenuItem.Size = new System.Drawing.Size(210, 24);
            this.ViewToolStripMenuItem.Text = "在网页中查看文章";
            this.ViewToolStripMenuItem.Click += new System.EventHandler(this.ViewToolStripMenuItem_Click);
            // 
            // ViewIndexToolStripMenuItem
            // 
            this.ViewIndexToolStripMenuItem.Name = "ViewIndexToolStripMenuItem";
            this.ViewIndexToolStripMenuItem.Size = new System.Drawing.Size(210, 24);
            this.ViewIndexToolStripMenuItem.Text = "打开SkyBlog首页";
            this.ViewIndexToolStripMenuItem.Click += new System.EventHandler(this.WebIndex_Click);
            // 
            // ToolStripSeparator2
            // 
            this.ToolStripSeparator2.Name = "ToolStripSeparator2";
            this.ToolStripSeparator2.Size = new System.Drawing.Size(207, 6);
            // 
            // EditToolStripMenuItem
            // 
            this.EditToolStripMenuItem.Name = "EditToolStripMenuItem";
            this.EditToolStripMenuItem.Size = new System.Drawing.Size(210, 24);
            this.EditToolStripMenuItem.Text = "编辑文章";
            this.EditToolStripMenuItem.Click += new System.EventHandler(this.EditArticle_Click);
            // 
            // DeleteToolStripMenuItem
            // 
            this.DeleteToolStripMenuItem.Name = "DeleteToolStripMenuItem";
            this.DeleteToolStripMenuItem.Size = new System.Drawing.Size(210, 24);
            this.DeleteToolStripMenuItem.Text = "删除文章";
            // 
            // toolStripSeparator3
            // 
            this.toolStripSeparator3.Name = "toolStripSeparator3";
            this.toolStripSeparator3.Size = new System.Drawing.Size(207, 6);
            // 
            // LoginToolStripMenuItem
            // 
            this.LoginToolStripMenuItem.Name = "LoginToolStripMenuItem";
            this.LoginToolStripMenuItem.Size = new System.Drawing.Size(210, 24);
            this.LoginToolStripMenuItem.Text = "登陆";
            this.LoginToolStripMenuItem.Click += new System.EventHandler(this.Login_Click);
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
            // dSkinNewPanel1
            // 
            this.dSkinNewPanel1.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(217)))), ((int)(((byte)(237)))), ((int)(((byte)(247)))));
            this.dSkinNewPanel1.Controls.Add(this.ToolStrip);
            this.dSkinNewPanel1.Location = new System.Drawing.Point(360, 0);
            this.dSkinNewPanel1.Name = "dSkinNewPanel1";
            this.dSkinNewPanel1.Size = new System.Drawing.Size(772, 60);
            this.dSkinNewPanel1.TabIndex = 8;
            this.dSkinNewPanel1.Text = "dSkinNewPanel1";
            // 
            // ToolStrip
            // 
            this.ToolStrip.Arrow = System.Drawing.Color.Black;
            this.ToolStrip.Back = System.Drawing.Color.White;
            this.ToolStrip.BackRadius = 4;
            this.ToolStrip.BackRectangle = new System.Drawing.Rectangle(10, 10, 10, 10);
            this.ToolStrip.Base = System.Drawing.Color.FromArgb(((int)(((byte)(217)))), ((int)(((byte)(237)))), ((int)(((byte)(247)))));
            this.ToolStrip.BaseFore = System.Drawing.Color.Black;
            this.ToolStrip.BaseForeAnamorphosis = false;
            this.ToolStrip.BaseForeAnamorphosisBorder = 4;
            this.ToolStrip.BaseForeAnamorphosisColor = System.Drawing.Color.White;
            this.ToolStrip.BaseForeOffset = new System.Drawing.Point(0, 0);
            this.ToolStrip.BaseHoverFore = System.Drawing.Color.FromArgb(((int)(((byte)(49)))), ((int)(((byte)(112)))), ((int)(((byte)(143)))));
            this.ToolStrip.BaseItemAnamorphosis = true;
            this.ToolStrip.BaseItemBorder = System.Drawing.Color.FromArgb(((int)(((byte)(60)))), ((int)(((byte)(148)))), ((int)(((byte)(212)))));
            this.ToolStrip.BaseItemBorderShow = true;
            this.ToolStrip.BaseItemDown = ((System.Drawing.Image)(resources.GetObject("ToolStrip.BaseItemDown")));
            this.ToolStrip.BaseItemHover = System.Drawing.Color.FromArgb(((int)(((byte)(60)))), ((int)(((byte)(148)))), ((int)(((byte)(212)))));
            this.ToolStrip.BaseItemMouse = ((System.Drawing.Image)(resources.GetObject("ToolStrip.BaseItemMouse")));
            this.ToolStrip.BaseItemNorml = null;
            this.ToolStrip.BaseItemPressed = System.Drawing.Color.FromArgb(((int)(((byte)(60)))), ((int)(((byte)(148)))), ((int)(((byte)(212)))));
            this.ToolStrip.BaseItemRadius = 4;
            this.ToolStrip.BaseItemRadiusStyle = DSkin.Common.RoundStyle.All;
            this.ToolStrip.BaseItemSplitter = System.Drawing.Color.FromArgb(((int)(((byte)(60)))), ((int)(((byte)(148)))), ((int)(((byte)(212)))));
            this.ToolStrip.BindTabControl = null;
            this.ToolStrip.CheckedImage = null;
            this.ToolStrip.Dock = System.Windows.Forms.DockStyle.Fill;
            this.ToolStrip.DropDownImageSeparator = System.Drawing.Color.FromArgb(((int)(((byte)(197)))), ((int)(((byte)(197)))), ((int)(((byte)(197)))));
            this.ToolStrip.Fore = System.Drawing.Color.Black;
            this.ToolStrip.GripMargin = new System.Windows.Forms.Padding(2, 2, 4, 2);
            this.ToolStrip.HoverFore = System.Drawing.Color.White;
            this.ToolStrip.ImageScalingSize = new System.Drawing.Size(20, 20);
            this.ToolStrip.ItemAnamorphosis = true;
            this.ToolStrip.ItemBorder = System.Drawing.Color.FromArgb(((int)(((byte)(60)))), ((int)(((byte)(148)))), ((int)(((byte)(212)))));
            this.ToolStrip.ItemBorderShow = true;
            this.ToolStrip.ItemHover = System.Drawing.Color.FromArgb(((int)(((byte)(60)))), ((int)(((byte)(148)))), ((int)(((byte)(212)))));
            this.ToolStrip.ItemPressed = System.Drawing.Color.FromArgb(((int)(((byte)(60)))), ((int)(((byte)(148)))), ((int)(((byte)(212)))));
            this.ToolStrip.ItemRadius = 4;
            this.ToolStrip.ItemRadiusStyle = DSkin.Common.RoundStyle.All;
            this.ToolStrip.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.ReloadButton,
            this.EditButton,
            this.DeleteButton,
            this.LoginButton,
            this.UserToolStripDropDownButton});
            this.ToolStrip.Location = new System.Drawing.Point(0, 0);
            this.ToolStrip.Name = "ToolStrip";
            this.ToolStrip.RadiusStyle = DSkin.Common.RoundStyle.All;
            this.ToolStrip.Size = new System.Drawing.Size(772, 60);
            this.ToolStrip.SkinAllColor = true;
            this.ToolStrip.TabIndex = 3;
            this.ToolStrip.Text = "ToolStrip";
            this.ToolStrip.TitleAnamorphosis = true;
            this.ToolStrip.TitleColor = System.Drawing.Color.FromArgb(((int)(((byte)(209)))), ((int)(((byte)(228)))), ((int)(((byte)(236)))));
            this.ToolStrip.TitleRadius = 4;
            this.ToolStrip.TitleRadiusStyle = DSkin.Common.RoundStyle.All;
            // 
            // ReloadButton
            // 
            this.ReloadButton.Image = global::SkyBlog.Properties.Resources.reload;
            this.ReloadButton.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.ReloadButton.Name = "ReloadButton";
            this.ReloadButton.Size = new System.Drawing.Size(123, 57);
            this.ReloadButton.Text = "刷新文章列表";
            this.ReloadButton.Click += new System.EventHandler(this.ReloadButton_Click);
            // 
            // EditButton
            // 
            this.EditButton.Image = global::SkyBlog.Properties.Resources.edit;
            this.EditButton.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.EditButton.Name = "EditButton";
            this.EditButton.Size = new System.Drawing.Size(93, 57);
            this.EditButton.Text = "修改文章";
            this.EditButton.Click += new System.EventHandler(this.EditArticle_Click);
            // 
            // DeleteButton
            // 
            this.DeleteButton.Image = global::SkyBlog.Properties.Resources.delete;
            this.DeleteButton.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.DeleteButton.Name = "DeleteButton";
            this.DeleteButton.Size = new System.Drawing.Size(93, 57);
            this.DeleteButton.Text = "删除文章";
            // 
            // LoginButton
            // 
            this.LoginButton.Image = global::SkyBlog.Properties.Resources.username;
            this.LoginButton.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.LoginButton.Name = "LoginButton";
            this.LoginButton.Size = new System.Drawing.Size(63, 57);
            this.LoginButton.Text = "登陆";
            this.LoginButton.Click += new System.EventHandler(this.Login_Click);
            // 
            // UserToolStripDropDownButton
            // 
            this.UserToolStripDropDownButton.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.LogoutToolStripMenuItem});
            this.UserToolStripDropDownButton.Image = global::SkyBlog.Properties.Resources.username;
            this.UserToolStripDropDownButton.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.UserToolStripDropDownButton.Name = "UserToolStripDropDownButton";
            this.UserToolStripDropDownButton.Size = new System.Drawing.Size(130, 57);
            this.UserToolStripDropDownButton.Text = "用户名 | 昵称";
            // 
            // LogoutToolStripMenuItem
            // 
            this.LogoutToolStripMenuItem.Name = "LogoutToolStripMenuItem";
            this.LogoutToolStripMenuItem.Size = new System.Drawing.Size(216, 26);
            this.LogoutToolStripMenuItem.Text = "登出";
            this.LogoutToolStripMenuItem.Click += new System.EventHandler(this.Logout_Click);
            // 
            // UserToolStripMenuItem
            // 
            this.UserToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.LogoutToolStripMenuItem2});
            this.UserToolStripMenuItem.Name = "UserToolStripMenuItem";
            this.UserToolStripMenuItem.Size = new System.Drawing.Size(210, 24);
            this.UserToolStripMenuItem.Text = "昵称";
            // 
            // LogoutToolStripMenuItem2
            // 
            this.LogoutToolStripMenuItem2.Name = "LogoutToolStripMenuItem2";
            this.LogoutToolStripMenuItem2.Size = new System.Drawing.Size(216, 26);
            this.LogoutToolStripMenuItem2.Text = "登出";
            this.LogoutToolStripMenuItem2.Click += new System.EventHandler(this.Logout_Click);
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
            this.Controls.Add(this.dSkinNewPanel1);
            this.Controls.Add(this.dSkinNewPanel2);
            this.Controls.Add(this.ArticlePanel);
            this.Controls.Add(this.SkyBlogTitlePanel);
            this.Controls.Add(this.ArticleListPanel);
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
            this.ContentMenuStrip.ResumeLayout(false);
            this.ArticlePanel.ResumeLayout(false);
            this.ArticlePanel.PerformLayout();
            this.dSkinFlowLayoutPanel1.ResumeLayout(false);
            this.dSkinNewPanel2.ResumeLayout(false);
            this.dSkinNewPanel2.PerformLayout();
            this.dSkinNewPanel1.ResumeLayout(false);
            this.dSkinNewPanel1.PerformLayout();
            this.ToolStrip.ResumeLayout(false);
            this.ToolStrip.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion
        private DSkin.Controls.DSkinLabel ArticleTitleLabel;
        private DSkin.Controls.DSkinLabel ArticleSubTitleLabel;
        private DSkin.Controls.DSkinListBox ArticleListPanel;
        private DSkin.Controls.DSkinNewPanel SkyBlogTitlePanel;
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
        private System.Windows.Forms.ToolStripSeparator ToolStripSeparator1;
        private DSkin.Controls.DSkinNewPanel dSkinNewPanel2;
        private DSkin.Controls.DSkinButton NextPageButton;
        private DSkin.Controls.DSkinButton PrevPageButton;
        private DSkin.Controls.DSkinLabel ArticlePageInfo;
        private System.Windows.Forms.ToolStripMenuItem ViewIndexToolStripMenuItem;
        private System.Windows.Forms.ToolStripSeparator ToolStripSeparator2;
        private System.Windows.Forms.ToolStripMenuItem DeleteToolStripMenuItem;
        private DSkin.Controls.DSkinNewPanel dSkinNewPanel1;
        private DSkin.Controls.DSkinToolStrip ToolStrip;
        private System.Windows.Forms.ToolStripButton ReloadButton;
        private System.Windows.Forms.ToolStripButton EditButton;
        private System.Windows.Forms.ToolStripButton DeleteButton;
        private System.Windows.Forms.ToolStripButton LoginButton;
        private System.Windows.Forms.ToolStripSeparator toolStripSeparator3;
        private System.Windows.Forms.ToolStripMenuItem LoginToolStripMenuItem;
        private System.Windows.Forms.ToolStripDropDownButton UserToolStripDropDownButton;
        private System.Windows.Forms.ToolStripMenuItem LogoutToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem UserToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem LogoutToolStripMenuItem2;
    }
}