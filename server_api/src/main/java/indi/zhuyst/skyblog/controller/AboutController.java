package indi.zhuyst.skyblog.controller;

import indi.zhuyst.common.controller.BaseController;
import indi.zhuyst.common.pojo.R;
import indi.zhuyst.skyblog.pojo.About;
import indi.zhuyst.skyblog.service.AboutService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Api(value = "AboutApi",description = "关于相关Api")
@RequestMapping("/api/about")
public class AboutController extends BaseController{

    @Autowired
    private AboutService aboutService;

    @RequestMapping(value = "/public/",method = RequestMethod.GET)
    @ApiOperation("获取关于")
    public R<About> getAbout(){
        return produceResult(aboutService.getAbout(),"获取关于失败");
    }

    @RequestMapping(value = "/",method = RequestMethod.PUT)
    @ApiOperation("更新关于")
    public R<About> updateAbout(@ApiParam("关于对象") @RequestBody About about){
        return produceResult(aboutService.updateAbout(about),"更新关于失败");
    }

}
