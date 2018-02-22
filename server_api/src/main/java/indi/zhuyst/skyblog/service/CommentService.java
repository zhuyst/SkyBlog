package indi.zhuyst.skyblog.service;

import com.github.pagehelper.PageInfo;
import indi.zhuyst.common.pojo.Query;
import indi.zhuyst.common.service.BaseCrudService;
import indi.zhuyst.common.service.CacheableService;
import indi.zhuyst.skyblog.entity.Comment;
import indi.zhuyst.skyblog.pojo.CommentDTO;

public interface CommentService extends BaseCrudService<Comment>,
        CacheableService {

    String CACHE_OBJECT = CACHE_PREFIX + "comment";

    String CACHE_PAGE = CACHE_PREFIX + "comment_page";

    CommentDTO getCommentDTO(int id);

    CommentDTO saveComment(Comment comment);

    PageInfo<CommentDTO> listComment(Query<Comment> query);
}
