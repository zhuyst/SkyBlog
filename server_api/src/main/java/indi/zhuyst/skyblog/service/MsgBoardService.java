package indi.zhuyst.skyblog.service;

import com.github.pagehelper.PageInfo;
import indi.zhuyst.common.pojo.Query;
import indi.zhuyst.common.service.CacheableService;
import indi.zhuyst.skyblog.entity.Comment;
import indi.zhuyst.skyblog.pojo.CommentDTO;
import org.springframework.stereotype.Service;

/**
 * 留言板服务接口
 * @author zhuyst
 */
@Service
public interface MsgBoardService extends CacheableService{

    /**
     * 留言板存储在{@link Comment#articleId}当中
     * articleId == 2
     */
    int MSG_BOARD_KEY = 1;

    /**
     * 缓存 - 分页对象
     */
    String CACHE_PAGE = "msg_page";

    /**
     * 根据ID获取留言对象
     * @param id 留言ID
     * @return 留言对象
     */
    CommentDTO getMsg(int id);

    /**
     * 获取留言分页对象
     * @param query 查询对象
     * @return 留言分页对象
     */
    PageInfo<CommentDTO> listMsg(Query<Comment> query);

    /**
     * 新增留言
     * @param comment 留言对象
     * @return 新增后的留言对象
     */
    CommentDTO insertMsg(Comment comment);

    /**
     * 根据ID删除留言
     * @param id 留言ID
     * @return 结果
     */
    boolean deleteMsg(int id);
}
