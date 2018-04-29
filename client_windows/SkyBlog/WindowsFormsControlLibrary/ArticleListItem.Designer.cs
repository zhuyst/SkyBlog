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
            this.ArticleTitle.Size = new System.Drawing.Size(355, 27);
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
            // ArticleListItem
            // 
            this.Controls.Add(this.ArticleTitle);
            this.Controls.Add(this.ArticleDate);
            this.Font = new System.Drawing.Font("微软雅黑", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.Size = new System.Drawing.Size(359, 60);
            this.MouseEnter += new System.EventHandler<System.Windows.Forms.MouseEventArgs>(this.ArticleListItem_MouseEnter);
            this.MouseLeave += new System.EventHandler(this.ArticleListItem_MouseLeave);
            this.MouseClick += new System.EventHandler<DSkin.DirectUI.DuiMouseEventArgs>(this.ArticleListItem_MouseClick);
            this.Load += new System.EventHandler(this.ArticleListItem_Load);
            this.ResumeLayout();

        }

        #endregion

        private DSkin.DirectUI.DuiLabel ArticleTitle;
        private DSkin.DirectUI.DuiLabel ArticleDate;
    }
}
