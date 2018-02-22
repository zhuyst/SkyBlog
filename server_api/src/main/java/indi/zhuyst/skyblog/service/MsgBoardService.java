package indi.zhuyst.skyblog.service;

import com.github.pagehelper.PageInfo;
import indi.zhuyst.common.pojo.Query;
import indi.zhuyst.common.service.CacheableService;
import indi.zhuyst.skyblog.entity.Comment;
import indi.zhuyst.skyblog.pojo.CommentDTO;
import org.springframework.stereotype.Service;

@Service
public interface MsgBoardService extends CacheableService{

    int MSG_BOARD_KEY = 1;

    String CACHE_PAGE = "msg_page";

    CommentDTO getMsg(int id);

    PageInfo<CommentDTO> listMsg(Query<Comment> query);

    CommentDTO insertMsg(Comment comment);

    boolean deleteMsg(int id);
}
