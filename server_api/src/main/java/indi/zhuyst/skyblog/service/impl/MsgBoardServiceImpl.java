package indi.zhuyst.skyblog.service.impl;

import com.github.pagehelper.PageInfo;
import indi.zhuyst.common.enums.CodeEnum;
import indi.zhuyst.common.exception.CommonException;
import indi.zhuyst.common.pojo.Query;
import indi.zhuyst.skyblog.dao.ArticleDao;
import indi.zhuyst.skyblog.entity.ArticleDO;
import indi.zhuyst.skyblog.entity.CommentDO;
import indi.zhuyst.skyblog.pojo.CommentDTO;
import indi.zhuyst.skyblog.service.CommentService;
import indi.zhuyst.skyblog.service.MsgBoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 留言板服务实现类
 * @author zhuyst
 */
@Service("msgBoardService")
public class MsgBoardServiceImpl implements MsgBoardService,CommandLineRunner{

    private final ArticleDao articleDao;

    private final CommentService commentService;

    @Autowired
    public MsgBoardServiceImpl(ArticleDao articleDao, CommentService commentService) {
        this.articleDao = articleDao;
        this.commentService = commentService;
    }

    /**
     * 初始化留言板
     * @see #MSG_BOARD_KEY
     */
    @Override
    @Transactional(rollbackFor = RuntimeException.class)
    public void run(String... strings) {
        ArticleDO article = articleDao.selectByPrimaryKey(MSG_BOARD_KEY);

        if(article == null){
            final String defaultTitle = "留言板";

            article = new ArticleDO();

            article.setId(MSG_BOARD_KEY);
            article.setTitle(defaultTitle);
            article.setContent("");

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
    public PageInfo<CommentDTO> listMsg(Query<CommentDO> query){
        CommentDO comment = query.getEntity();
        if(comment == null){
            comment = new CommentDO();
        }
        comment.setArticleId(MSG_BOARD_KEY);

        query.setEntity(comment);
        return commentService.listComment(query);
    }

    @Override
    @Transactional(rollbackFor = RuntimeException.class)
    @CacheEvict(cacheNames = CACHE_PAGE,allEntries = true)
    public CommentDTO insertMsg(CommentDO comment){
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

    /**
     * 检查查询的ID是否为发布在留言板底下 {@link #MSG_BOARD_KEY}
     * 如果不是则会抛出NOT FOUND异常{@link CommonException}
     * @param articleId 检查的ID
     */
    private void checkArticleId(int articleId){
        if(articleId != MSG_BOARD_KEY){
            throw new CommonException(CodeEnum.NOT_FOUND.getCode(),
                    "找不到该留言");
        }
    }
}
