package indi.zhuyst.skyblog.controller;

import com.github.pagehelper.PageInfo;
import indi.zhuyst.common.controller.BaseController;
import indi.zhuyst.common.pojo.Query;
import indi.zhuyst.common.pojo.Result;
import indi.zhuyst.security.annotation.AdminAuthorize;
import indi.zhuyst.skyblog.pojo.SysLogDTO;
import indi.zhuyst.skyblog.service.SysLogService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 系统日志Controller
 * @author zhuyst
 */
@RestController
@Api(value = "SysLogApi",description = "系统日志相关API")
@RequestMapping("/sys_log")
public class SysLogController extends BaseController {

    private final SysLogService sysLogService;

    @Autowired
    public SysLogController(SysLogService sysLogService) {
        this.sysLogService = sysLogService;
    }

    /**
     * 查询系统日志列表
     * @param query 查询对象
     * @return 系统日志列表
     */
    @GetMapping("/list/")
    @ApiOperation(value = "查询系统日志列表",notes = NOTES_ADMIN)
    @AdminAuthorize
    public Result<PageInfo<SysLogDTO>> listSysLog(Query query){
        PageInfo<SysLogDTO> pageInfo = sysLogService.listSysLogDTO(new Query<>(query));
        return Result.ok(pageInfo);
    }
}
