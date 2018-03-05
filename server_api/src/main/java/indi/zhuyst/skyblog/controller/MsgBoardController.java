package indi.zhuyst.skyblog.controller;

import com.github.pagehelper.PageInfo;
import indi.zhuyst.common.controller.BaseController;
import indi.zhuyst.common.pojo.Query;
import indi.zhuyst.common.pojo.Result;
import indi.zhuyst.security.annotation.LoginAuthorize;
import indi.zhuyst.security.annotation.SelfAuthorize;
import indi.zhuyst.security.util.SecurityUtils;
import indi.zhuyst.skyblog.annotation.SysLog;
import indi.zhuyst.skyblog.entity.CommentDO;
import indi.zhuyst.skyblog.entity.UserDO;
import indi.zhuyst.skyblog.enums.SysLogTypeEnum;
import indi.zhuyst.skyblog.pojo.CommentDTO;
import indi.zhuyst.skyblog.service.MsgBoardService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
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

    /**
     * 资源名 - 留言板
     */
    private static final String RESOURCE_MSG = "留言板";

    private final MsgBoardService msgBoardService;

    @Autowired
    public MsgBoardController(MsgBoardService msgBoardService) {
        this.msgBoardService = msgBoardService;
    }

    /**
     * 查询留言列表
     * @param query 查询对象
     * @return 留言的分页对象
     */
    @GetMapping("/public/list/")
    @ApiOperation(value = "查询留言列表",notes = NOTES_PUBLIC)
    public Result<PageInfo<CommentDTO>> listMsg(Query query){
        PageInfo<CommentDTO> pageInfo = msgBoardService.listMsg(new Query<>(query));
        return Result.ok(pageInfo);
    }

    /**
     * 新增留言
     * @param comment 留言对象
     * @return 新增后的留言对象
     */
    @PostMapping("/")
    @ApiOperation(value = "新增留言",notes = NOTES_PROTECTED)
    @LoginAuthorize
    @SysLog(resource = RESOURCE_MSG,type = SysLogTypeEnum.INSERT)
    public Result<CommentDTO> insertMsg(@ApiParam("留言对象") @Valid @RequestBody CommentDO comment){
        comment.setId(null);

        UserDO user = SecurityUtils.getUser();
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
    @ApiOperation(value = "根据id删除留言",notes = NOTES_SELF)
    @SelfAuthorize
    @SysLog(resource = RESOURCE_MSG,type = SysLogTypeEnum.DELETE)
    public Result deleteMsg(@ApiParam("留言ID") @PathVariable("id")Integer id){
        CommentDO comment = msgBoardService.getMsg(id);
        checkPerms(comment.getAuthorId());
        return produceResult(msgBoardService.deleteMsg(id),"删除文章失败");
    }

}
