package indi.zhuyst.skyblog.service.impl;

import com.github.pagehelper.PageInfo;
import com.github.pagehelper.PageRowBounds;
import indi.zhuyst.skyblog.dao.ArticleDao;
import indi.zhuyst.skyblog.entity.Article;
import indi.zhuyst.skyblog.entity.Comment;
import indi.zhuyst.skyblog.pojo.CommentDTO;
import indi.zhuyst.common.util.PageUtil;
import indi.zhuyst.skyblog.service.CommentService;
import indi.zhuyst.skyblog.service.MsgBoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;

@Service
public class MsgBoardServiceImpl implements MsgBoardService,CommandLineRunner{
    private static final int MSG_BOARD_KEY = 1;
    private static final int MSG_PAGE_SIZE = 20;

    @Autowired
    private ArticleDao articleDao;

    @Autowired
    private CommentService commentService;

    @Override
    public void run(String... strings) throws Exception {
        Article article = articleDao.selectByPrimaryKey(MSG_BOARD_KEY);

        if(article == null){
            article = new Article();

            article.setId(MSG_BOARD_KEY);
            article.setTitle("留言板");
            article.setContent("留言板引用文章");

            articleDao.insertSelective(article);
        }
    }

    @Override
    public CommentDTO getMsg(int id){
        return this.commentService.getCommentDTO(id);
    }

    @Override
    public PageInfo<CommentDTO> listMsg(Integer pageNum){
        PageRowBounds rowBounds = PageUtil.getPageRowBounds(pageNum,MSG_PAGE_SIZE);

        Comment comment = new Comment();
        comment.setArticleId(MSG_BOARD_KEY);

        return commentService.listComment(MSG_BOARD_KEY,rowBounds);
    }

    @Override
    public CommentDTO insertMsg(Comment comment){
        comment.setArticleId(MSG_BOARD_KEY);
        return commentService.saveComment(comment);
    }

    @Override
    public boolean deleteMsg(Integer id){
        return commentService.delete(id);
    }
}
