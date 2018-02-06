package indi.zhuyst.skyblog.service.impl;

import com.github.pagehelper.PageInfo;
import indi.zhuyst.common.pojo.Query;
import indi.zhuyst.skyblog.dao.ArticleDao;
import indi.zhuyst.skyblog.entity.Article;
import indi.zhuyst.skyblog.entity.Comment;
import indi.zhuyst.skyblog.pojo.CommentDTO;
import indi.zhuyst.skyblog.service.CommentService;
import indi.zhuyst.skyblog.service.MsgBoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;

@Service
public class MsgBoardServiceImpl implements MsgBoardService,CommandLineRunner{
    private static final int MSG_BOARD_KEY = 1;

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
    public PageInfo<CommentDTO> listMsg(Query<Comment> query){
        Comment comment = new Comment();
        comment.setArticleId(MSG_BOARD_KEY);

        query.setEntity(comment);
        return commentService.listComment(query);
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
