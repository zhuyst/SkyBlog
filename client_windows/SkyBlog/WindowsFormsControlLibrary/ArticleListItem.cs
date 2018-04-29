using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using DSkin.Controls;
using DSkin.DirectUI;

namespace WindowsFormsControlLibrary
{
    public partial class ArticleListItem : DuiBaseControl
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Date { get; set; }

        public bool Selected { get; set; }

        public ArticleListItem()
        {
            InitializeComponent();
            Selected = false;
        }

        private void ArticleListItem_Load(object sender, EventArgs e)
        {
            ArticleTitle.Text = Title;
            ArticleDate.Text = Date;
        }

        private void ArticleListItem_MouseEnter(object sender, MouseEventArgs e)
        {
            if (!Selected)
            {
                BackColor = Color.AliceBlue;
            }
        }

        private void ArticleListItem_MouseLeave(object sender, EventArgs e)
        {
            if (!Selected)
            {
                BackColor = Color.Transparent;
            }
        }

        private void ArticleListItem_MouseClick(object sender, DuiMouseEventArgs e)
        {
        }
    }
}
