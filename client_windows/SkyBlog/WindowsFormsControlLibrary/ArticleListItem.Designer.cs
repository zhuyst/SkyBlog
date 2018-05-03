namespace WindowsFormsControlLibrary
{
    partial class ArticleListItem
    {
        /// <summary> 
        /// 必需的设计器变量。
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary> 
        /// 清理所有正在使用的资源。
        /// </summary>
        /// <param name="disposing">如果应释放托管资源，为 true；否则为 false。</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region 组件设计器生成的代码

        /// <summary> 
        /// 设计器支持所需的方法 - 不要修改
        /// 使用代码编辑器修改此方法的内容。
        /// </summary>
        private void InitializeComponent()
        {
            this.ArticleTitle = new DSkin.DirectUI.DuiLabel();
            this.ArticleDate = new DSkin.DirectUI.DuiLabel();
            this.ItemContextMenuStrip = new DSkin.Controls.DSkinContextMenuStrip();
            this.ViewToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.EditToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.ItemContextMenuStrip.SuspendLayout();
            this.SuspendLayout();
            // 
            // ArticleTitle
            // 
            this.ArticleTitle.AutoSize = true;
            this.ArticleTitle.DesignModeCanMove = false;
            this.ArticleTitle.DesignModeCanResize = false;
            this.ArticleTitle.Dock = System.Windows.Forms.DockStyle.Fill;
            this.ArticleTitle.Font = new System.Drawing.Font("微软雅黑", 10.8F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.ArticleTitle.Location = new System.Drawing.Point(0, 0);
            this.ArticleTitle.Name = "ArticleTitle";
            this.ArticleTitle.Size = new System.Drawing.Size(81, 27);
            this.ArticleTitle.Text = "文章标题";
            // 
            // ArticleDate
            // 
            this.ArticleDate.DesignModeCanMove = false;
            this.ArticleDate.DesignModeCanResize = false;
            this.ArticleDate.Dock = System.Windows.Forms.DockStyle.Bottom;
            this.ArticleDate.Font = new System.Drawing.Font("微软雅黑", 7.8F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.ArticleDate.Location = new System.Drawing.Point(0, 38);
            this.ArticleDate.Name = "ArticleDate";
            this.ArticleDate.Size = new System.Drawing.Size(359, 22);
            this.ArticleDate.TabIndex = 1;
            this.ArticleDate.Text = "2018-04-29 11:11";
            this.ArticleDate.TextAlign = System.Drawing.ContentAlignment.TopRight;
            // 
            // ItemContextMenuStrip
            // 
            this.ItemContextMenuStrip.Arrow = System.Drawing.Color.Black;
            this.ItemContextMenuStrip.Back = System.Drawing.Color.White;
            this.ItemContextMenuStrip.BackRadius = 4;
            this.ItemContextMenuStrip.Base = System.Drawing.Color.FromArgb(((int)(((byte)(105)))), ((int)(((byte)(200)))), ((int)(((byte)(254)))));
            this.ItemContextMenuStrip.CheckedImage = null;
            this.ItemContextMenuStrip.DropDownImageSeparator = System.Drawing.Color.FromArgb(((int)(((byte)(197)))), ((int)(((byte)(197)))), ((int)(((byte)(197)))));
            this.ItemContextMenuStrip.Fore = System.Drawing.Color.Black;
            this.ItemContextMenuStrip.HoverFore = System.Drawing.Color.White;
            this.ItemContextMenuStrip.ImageScalingSize = new System.Drawing.Size(20, 20);
            this.ItemContextMenuStrip.ItemAnamorphosis = true;
            this.ItemContextMenuStrip.ItemBorder = System.Drawing.Color.FromArgb(((int)(((byte)(60)))), ((int)(((byte)(148)))), ((int)(((byte)(212)))));
            this.ItemContextMenuStrip.ItemBorderShow = true;
            this.ItemContextMenuStrip.ItemHover = System.Drawing.Color.FromArgb(((int)(((byte)(60)))), ((int)(((byte)(148)))), ((int)(((byte)(212)))));
            this.ItemContextMenuStrip.ItemPressed = System.Drawing.Color.FromArgb(((int)(((byte)(60)))), ((int)(((byte)(148)))), ((int)(((byte)(212)))));
            this.ItemContextMenuStrip.ItemRadius = 4;
            this.ItemContextMenuStrip.ItemRadiusStyle = DSkin.Common.RoundStyle.All;
            this.ItemContextMenuStrip.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.ViewToolStripMenuItem,
            this.EditToolStripMenuItem});
            this.ItemContextMenuStrip.ItemSplitter = System.Drawing.Color.FromArgb(((int)(((byte)(60)))), ((int)(((byte)(148)))), ((int)(((byte)(212)))));
            this.ItemContextMenuStrip.Name = "ItemContextMenuStrip";
            this.ItemContextMenuStrip.RadiusStyle = DSkin.Common.RoundStyle.All;
            this.ItemContextMenuStrip.Size = new System.Drawing.Size(199, 52);
            this.ItemContextMenuStrip.SkinAllColor = true;
            this.ItemContextMenuStrip.TitleAnamorphosis = true;
            this.ItemContextMenuStrip.TitleColor = System.Drawing.Color.FromArgb(((int)(((byte)(209)))), ((int)(((byte)(228)))), ((int)(((byte)(236)))));
            this.ItemContextMenuStrip.TitleRadius = 4;
            this.ItemContextMenuStrip.TitleRadiusStyle = DSkin.Common.RoundStyle.All;
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
            // 
            // ArticleListItem
            // 
            this.ContextMenuStrip = this.ItemContextMenuStrip;
            this.Controls.Add(this.ArticleTitle);
            this.Controls.Add(this.ArticleDate);
            this.Font = new System.Drawing.Font("微软雅黑", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.Size = new System.Drawing.Size(359, 60);
            this.MouseEnter += new System.EventHandler<System.Windows.Forms.MouseEventArgs>(this.ArticleListItem_MouseEnter);
            this.MouseLeave += new System.EventHandler(this.ArticleListItem_MouseLeave);
            this.Load += new System.EventHandler(this.ArticleListItem_Load);
            this.ItemContextMenuStrip.ResumeLayout(false);
            this.ResumeLayout();

        }

        #endregion

        private DSkin.DirectUI.DuiLabel ArticleTitle;
        private DSkin.DirectUI.DuiLabel ArticleDate;
        private DSkin.Controls.DSkinContextMenuStrip ItemContextMenuStrip;
        private System.Windows.Forms.ToolStripMenuItem ViewToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem EditToolStripMenuItem;
    }
}
