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
            this.ArticleList = new DSkin.Controls.DSkinListBox();
            this.SplitLine = new DSkin.Controls.DSkinLabel();
            this.ArticleTitle = new DSkin.Controls.DSkinLabel();
            this.ArticleSubTitle = new DSkin.Controls.DSkinLabel();
            ((System.ComponentModel.ISupportInitialize)(this.ArticleList)).BeginInit();
            this.SuspendLayout();
            // 
            // ArticleList
            // 
            this.ArticleList.BackColor = System.Drawing.Color.Transparent;
            this.ArticleList.Location = new System.Drawing.Point(0, 48);
            this.ArticleList.Margin = new System.Windows.Forms.Padding(0);
            this.ArticleList.Name = "ArticleList";
            this.ArticleList.ScrollBarWidth = 12;
            this.ArticleList.Size = new System.Drawing.Size(360, 600);
            this.ArticleList.TabIndex = 0;
            this.ArticleList.Text = "dSkinListBox1";
            this.ArticleList.Value = 0D;
            this.ArticleList.ItemClick += new System.EventHandler<DSkin.Controls.ItemClickEventArgs>(this.ArticleList_ItemClick);
            // 
            // SplitLine
            // 
            this.SplitLine.AutoSize = false;
            this.SplitLine.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(217)))), ((int)(((byte)(237)))), ((int)(((byte)(247)))));
            this.SplitLine.Location = new System.Drawing.Point(359, 18);
            this.SplitLine.Name = "SplitLine";
            this.SplitLine.Size = new System.Drawing.Size(11, 700);
            this.SplitLine.TabIndex = 1;
            // 
            // ArticleTitle
            // 
            this.ArticleTitle.Font = new System.Drawing.Font("微软雅黑", 14F, System.Drawing.FontStyle.Bold);
            this.ArticleTitle.Location = new System.Drawing.Point(376, 48);
            this.ArticleTitle.Name = "ArticleTitle";
            this.ArticleTitle.Size = new System.Drawing.Size(104, 34);
            this.ArticleTitle.TabIndex = 2;
            this.ArticleTitle.Text = "文章标题";
            // 
            // ArticleSubTitle
            // 
            this.ArticleSubTitle.Font = new System.Drawing.Font("微软雅黑", 10F, System.Drawing.FontStyle.Bold);
            this.ArticleSubTitle.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(77)))), ((int)(((byte)(77)))), ((int)(((byte)(77)))));
            this.ArticleSubTitle.Location = new System.Drawing.Point(377, 89);
            this.ArticleSubTitle.Name = "ArticleSubTitle";
            this.ArticleSubTitle.Size = new System.Drawing.Size(92, 25);
            this.ArticleSubTitle.TabIndex = 3;
            this.ArticleSubTitle.Text = "文章副标题";
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
            this.CaptionHeight = 35;
            this.ClientSize = new System.Drawing.Size(1200, 655);
            this.Controls.Add(this.ArticleSubTitle);
            this.Controls.Add(this.ArticleTitle);
            this.Controls.Add(this.SplitLine);
            this.Controls.Add(this.ArticleList);
            this.DoubleClickMaximized = false;
            this.DrawIcon = false;
            this.EnabledDWM = true;
            this.Font = new System.Drawing.Font("微软雅黑", 9F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.HaloColor = System.Drawing.SystemColors.GradientActiveCaption;
            this.HaloSize = 8;
            this.Margin = new System.Windows.Forms.Padding(4);
            this.MaximizeBox = false;
            this.Name = "MainForm";
            this.Opacity = 0.95D;
            this.Padding = new System.Windows.Forms.Padding(0);
            this.Radius = 20;
            this.Text = "SkyBlog";
            this.Load += new System.EventHandler(this.MainForm_Load);
            ((System.ComponentModel.ISupportInitialize)(this.ArticleList)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private DSkin.Controls.DSkinListBox ArticleList;
        private DSkin.Controls.DSkinLabel SplitLine;
        private DSkin.Controls.DSkinLabel ArticleTitle;
        private DSkin.Controls.DSkinLabel ArticleSubTitle;
    }
}