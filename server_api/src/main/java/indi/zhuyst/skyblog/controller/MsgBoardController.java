package indi.zhuyst.skyblog.controller;

import com.github.pagehelper.PageInfo;
import indi.zhuyst.common.controller.BaseController;
import indi.zhuyst.common.pojo.Query;
import indi.zhuyst.common.pojo.R;
import indi.zhuyst.security.util.SecurityUtil;
import indi.zhuyst.skyblog.entity.Comment;
import indi.zhuyst.skyblog.entity.User;
import indi.zhuyst.skyblog.pojo.CommentDTO;
import indi.zhuyst.skyblog.service.MsgBoardService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@Api(value = "MsgBoardApi",description = "留言板相关API")
@RequestMapping("/api/msg_board")
public class MsgBoardController extends BaseController{

    @Autowired
    private MsgBoardService msgBoardService;

    @RequestMapping(value = "/public/list/",method = RequestMethod.GET)
    @ApiOperation(value = "查询留言列表")
    public R<PageInfo<CommentDTO>> listMsg(Query<Comment> query){
        PageInfo<CommentDTO> pageInfo = msgBoardService.listMsg(query);
        return R.ok(pageInfo);
    }

    @RequestMapping(value = "/",method = RequestMethod.POST)
    @ApiOperation(value = "新增留言")
    @PreAuthorize("isAuthenticated()")
    public R<CommentDTO> insertMsg(@Valid @RequestBody Comment comment){
        User user = SecurityUtil.getUser();
        comment.setAuthorId(user.getId());

        CommentDTO pojo = msgBoardService.insertMsg(comment);
        return produceResult(pojo,"新增留言失败");
    }

    @RequestMapping(value = "/{id}",method = RequestMethod.DELETE)
    @ApiOperation(value = "根据id删除留言")
    @PreAuthorize("isAuthenticated()")
    public R deleteMsg(@PathVariable("id")Integer id){
        Comment comment = msgBoardService.getMsg(id);
        checkPerms(comment.getAuthorId());
        return produceResult(msgBoardService.deleteMsg(id),"删除文章失败");
    }

}
