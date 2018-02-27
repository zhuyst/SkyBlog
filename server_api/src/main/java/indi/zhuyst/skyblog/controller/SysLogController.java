package indi.zhuyst.skyblog.controller;

import com.github.pagehelper.PageInfo;
import indi.zhuyst.common.controller.BaseController;
import indi.zhuyst.common.pojo.Query;
import indi.zhuyst.common.pojo.Result;
import indi.zhuyst.skyblog.pojo.SysLogDTO;
import indi.zhuyst.skyblog.service.SysLogService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 系统日志Controller
 * @author zhuyst
 */
@RestController
@Api(value = "SysLogApi",description = "系统日志API")
@RequestMapping("/sys_log")
public class SysLogController extends BaseController {

    @Autowired
    private SysLogService sysLogService;

    @GetMapping("/list/")
    @ApiOperation("查询系统日志列表")
    @PreAuthorize("hasAnyRole('SYS_ADMIN','ADMIN')")
    public Result<PageInfo<SysLogDTO>> listSysLog(Query query){
        PageInfo<SysLogDTO> pageInfo = sysLogService.listSysLogDTO(new Query<>(query));
        return Result.ok(pageInfo);
    }
}
