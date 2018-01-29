package indi.zhuyst.skyblog.service;

import com.github.pagehelper.PageInfo;
import indi.zhuyst.skyblog.entity.Comment;
import indi.zhuyst.skyblog.pojo.CommentDTO;
import org.springframework.stereotype.Service;

@Service
public interface MsgBoardService{

    CommentDTO getMsg(int id);

    PageInfo<CommentDTO> listMsg(Integer pageNum);

    CommentDTO insertMsg(Comment comment);

    boolean deleteMsg(Integer id);
}
