package indi.zhuyst.skyblog.service;

import com.github.pagehelper.PageInfo;
import indi.zhuyst.common.pojo.Query;
import indi.zhuyst.common.service.BaseCrudService;
import indi.zhuyst.common.service.CacheableService;
import indi.zhuyst.skyblog.entity.Comment;
import indi.zhuyst.skyblog.pojo.CommentDTO;

/**
 * 文章评论服务接口
 * @author zhuyst
 */
public interface CommentService extends BaseCrudService<Comment>,
        CacheableService {

    /**
     * 缓存 - 对象
     */
    String CACHE_OBJECT = CACHE_PREFIX + "comment";

    /**
     * 缓存 - 分页对象
     */
    String CACHE_PAGE = CACHE_PREFIX + "comment_page";

    /**
     * 获取评论DTO
     * @param id 评论ID
     * @return 评论DTO
     */
    CommentDTO getCommentDTO(int id);

    /**
     * 保存评论并返回评论DTO
     * @param comment 评论对象
     * @return 保存后的评论DTO
     */
    CommentDTO saveComment(Comment comment);

    /**
     * 获取评论DTO分页对象
     * @param query 查询对象
     * @return 评论DTO分页对象
     */
    PageInfo<CommentDTO> listComment(Query<Comment> query);
}
