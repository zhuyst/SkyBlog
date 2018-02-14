package indi.zhuyst.skyblog.service;

import com.github.pagehelper.PageInfo;
import indi.zhuyst.common.pojo.Query;
import indi.zhuyst.skyblog.entity.Comment;
import indi.zhuyst.skyblog.pojo.CommentDTO;
import org.springframework.stereotype.Service;

@Service
public interface MsgBoardService{

    int MSG_BOARD_KEY = 1;

    CommentDTO getMsg(int id);

    PageInfo<CommentDTO> listMsg(Query<Comment> query);

    CommentDTO insertMsg(Comment comment);

    boolean deleteMsg(Integer id);
}
