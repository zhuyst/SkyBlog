package indi.zhuyst.skyblog.controller;

import com.github.pagehelper.PageInfo;
import indi.zhuyst.common.controller.BaseController;
import indi.zhuyst.common.pojo.Query;
import indi.zhuyst.common.pojo.R;
import indi.zhuyst.security.util.SecurityUtils;
import indi.zhuyst.skyblog.entity.Comment;
import indi.zhuyst.skyblog.entity.User;
import indi.zhuyst.skyblog.pojo.CommentDTO;
import indi.zhuyst.skyblog.service.MsgBoardService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

/**
 * 留言板相关API
 * @author zhuyst
 */
@RestController
@Api(value = "MsgBoardApi",description = "留言板相关API")
@RequestMapping("/msg_board")
public class MsgBoardController extends BaseController{

    @Autowired
    private MsgBoardService msgBoardService;

    /**
     * 查询留言列表
     * @param query 查询对象
     * @return 留言的分页对象
     */
    @GetMapping("/public/list/")
    @ApiOperation("查询留言列表")
    public R<PageInfo<CommentDTO>> listMsg(Query query){
        PageInfo<CommentDTO> pageInfo = msgBoardService.listMsg(new Query<>(query));
        return R.ok(pageInfo);
    }

    /**
     * 新增留言
     * @param comment 留言对象
     * @return 新增后的留言对象
     */
    @PostMapping("/")
    @ApiOperation("新增留言")
    @PreAuthorize("isAuthenticated()")
    public R<CommentDTO> insertMsg(@ApiParam("留言对象") @Valid @RequestBody Comment comment){
        comment.setId(null);

        User user = SecurityUtils.getUser();
        comment.setAuthorId(user.getId());

        CommentDTO pojo = msgBoardService.insertMsg(comment);
        return produceResult(pojo,"新增留言失败");
    }

    /**
     * 根据id删除留言
     * @param id 留言ID
     * @return 结果对象
     */
    @DeleteMapping("/{id}")
    @ApiOperation("根据id删除留言")
    @PreAuthorize("isAuthenticated()")
    public R deleteMsg(@ApiParam("留言ID") @PathVariable("id")Integer id){
        Comment comment = msgBoardService.getMsg(id);
        checkPerms(comment.getAuthorId());
        return produceResult(msgBoardService.deleteMsg(id),"删除文章失败");
    }

}
