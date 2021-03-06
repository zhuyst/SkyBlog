package indi.zhuyst.skyblog.controller;

import indi.zhuyst.common.controller.BaseController;
import indi.zhuyst.common.pojo.Result;
import indi.zhuyst.security.annotation.AdminAuthorize;
import indi.zhuyst.skyblog.annotation.SysLog;
import indi.zhuyst.skyblog.enums.SysLogTypeEnum;
import indi.zhuyst.skyblog.pojo.About;
import indi.zhuyst.skyblog.service.AboutService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

/**
 * 关于相关API
 * @author zhuyst
 */
@RestController
@Api(value = "AboutApi",description = "关于相关API")
@RequestMapping("/about")
public class AboutController extends BaseController{

    /**
     * 资源名 - 关于
     */
    private static final String RESOURCE_ABOUT = "关于";

    private final AboutService aboutService;

    @Autowired
    public AboutController(AboutService aboutService) {
        this.aboutService = aboutService;
    }

    /**
     * 获取关于
     * @return 关于对象
     */
    @GetMapping("/public/")
    @ApiOperation(value = "获取关于",notes = NOTES_PUBLIC)
    public Result<About> getAbout(){
        return produceResult(aboutService.getAbout(),"获取关于失败");
    }

    /**
     * 更新关于
     * @param about 关于对象
     * @return 更新后的关于对象
     */
    @PutMapping("/")
    @AdminAuthorize
    @ApiOperation(value = "更新关于",notes = NOTES_ADMIN)
    @SysLog(resource = RESOURCE_ABOUT,type = SysLogTypeEnum.UPDATE)
    public Result<About> updateAbout(@ApiParam("关于对象") @Valid @RequestBody About about){
        return produceResult(aboutService.updateAbout(about),"更新关于失败");
    }

}
