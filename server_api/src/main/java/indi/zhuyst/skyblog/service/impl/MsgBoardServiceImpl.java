package indi.zhuyst.skyblog.service.impl;

import com.github.pagehelper.PageInfo;
import indi.zhuyst.common.enums.CodeEnum;
import indi.zhuyst.common.exception.CommonException;
import indi.zhuyst.common.pojo.Query;
import indi.zhuyst.skyblog.dao.ArticleDao;
import indi.zhuyst.skyblog.entity.Article;
import indi.zhuyst.skyblog.entity.Comment;
import indi.zhuyst.skyblog.pojo.CommentDTO;
import indi.zhuyst.skyblog.service.CommentService;
import indi.zhuyst.skyblog.service.MsgBoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MsgBoardServiceImpl implements MsgBoardService,CommandLineRunner{

    @Autowired
    private ArticleDao articleDao;

    @Autowired
    private CommentService commentService;

    @Override
    @Transactional(rollbackFor = RuntimeException.class)
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
        CommentDTO comment = this.commentService.getCommentDTO(id);
        checkArticleId(comment.getArticleId());
        return this.commentService.getCommentDTO(id);
    }

    @Override
    @CacheEvict(cacheNames = CACHE_PAGE,allEntries = true)
    public PageInfo<CommentDTO> listMsg(Query<Comment> query){
        Comment comment = query.getEntity();
        if(comment == null){
            comment = new Comment();
        }
        comment.setArticleId(MSG_BOARD_KEY);

        query.setEntity(comment);
        return commentService.listComment(query);
    }

    @Override
    @Transactional(rollbackFor = RuntimeException.class)
    @CacheEvict(cacheNames = CACHE_PAGE,allEntries = true)
    public CommentDTO insertMsg(Comment comment){
        comment.setArticleId(MSG_BOARD_KEY);
        return commentService.saveComment(comment);
    }

    @Override
    @Transactional(rollbackFor = RuntimeException.class)
    @CacheEvict(cacheNames = CACHE_PAGE,allEntries = true)
    public boolean deleteMsg(int id){
        this.getMsg(id);
        return commentService.delete(id);
    }

    private void checkArticleId(int articleId){
        if(articleId != MSG_BOARD_KEY){
            throw new CommonException(CodeEnum.NOT_FOUND.getCode(),
                    "找不到该留言");
        }
    }
}
