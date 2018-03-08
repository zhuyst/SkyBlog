package indi.zhuyst.skyblog.controller;

import com.github.pagehelper.PageInfo;
import indi.zhuyst.common.controller.BaseController;
import indi.zhuyst.common.pojo.Query;
import indi.zhuyst.common.pojo.Result;
import indi.zhuyst.security.annotation.AdminAuthorize;
import indi.zhuyst.skyblog.pojo.AccessLogDTO;
import indi.zhuyst.skyblog.service.AccessLogService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 访问日志Controller
 * @author zhuyst
 */
@RestController
@Api(value = "AccessLogApi",description = "访问日志相关API")
@RequestMapping("/access_log")
public class AccessLogController extends BaseController{

    private final AccessLogService accessLogService;

    @Autowired
    public AccessLogController(AccessLogService accessLogService){
        this.accessLogService = accessLogService;
    }

    /**
     * 查询访问日志列表
     * @param query 查询对象
     * @return 访问日志列表
     */
    @GetMapping("/list/")
    @ApiOperation(value = "查询访问日志列表",notes = NOTES_ADMIN)
    @AdminAuthorize
    public Result<PageInfo<AccessLogDTO>> listAccessLog(Query query){
        PageInfo<AccessLogDTO> pageInfo = accessLogService.listAccessLogDTO(new Query<>(query));
        return Result.ok(pageInfo);
    }

    /**
     * 查询网站访问次数
     * @return 网站访问次数
     */
    @GetMapping("/public/total/")
    @ApiOperation(value = "查询网站访问次数",notes = NOTES_PUBLIC)
    public Result<Long> countAccessLog(){
        Long count = accessLogService.countAll();
        return Result.ok(count);
    }
}
