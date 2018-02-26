package indi.zhuyst.skyblog.controller;

import indi.zhuyst.common.controller.BaseController;
import indi.zhuyst.common.pojo.Result;
import indi.zhuyst.skyblog.pojo.OssFile;
import indi.zhuyst.skyblog.service.OssService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 * OSS相关API
 * @author zhuyst
 */
@RestController
@Api(value = "OssApi",description = "OSS相关API")
@RequestMapping("/oss")
public class OssController extends BaseController{

    @Autowired
    private OssService ossService;

    /**
     * 上传文件
     * @param file 文件
     * @return 文件URL对象
     */
    @PostMapping("/upload")
    @ApiOperation("上传文件")
    public Result<OssFile> uploadFile(@ApiParam("文件") @RequestParam("file")
                                             MultipartFile file){
        OssFile ossFile = ossService.upload(file);
        return Result.ok(ossFile);
    }
}
