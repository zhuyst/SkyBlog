package indi.zhuyst.skyblog.controller;

import indi.zhuyst.common.controller.BaseController;
import indi.zhuyst.common.pojo.Result;
import indi.zhuyst.security.annotation.AdminAuthorize;
import indi.zhuyst.skyblog.annotation.SysLog;
import indi.zhuyst.skyblog.entity.ClassifyDO;
import indi.zhuyst.skyblog.enums.SysLogTypeEnum;
import indi.zhuyst.skyblog.pojo.ClassifyDTO;
import indi.zhuyst.skyblog.service.ClassifyService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

/**
 * 文章分类相关API
 * @author zhuyst
 */
@RestController
@Api(value = "ClassifyApi",description = "文章分类相关API")
@RequestMapping("/classifies")
public class ClassifyController extends BaseController{

    /**
     * 资源名 - 文章分类
     */
    private static final String RESOURCE_CLASSIFY = "文章分类";

    private final ClassifyService classifyService;

    @Autowired
    public ClassifyController(ClassifyService classifyService) {
        this.classifyService = classifyService;
    }

    /**
     * 查询分类列表
     * @return 分类列表
     */
    @GetMapping("/public/")
    @ApiOperation(value = "查询分类列表",notes = NOTES_PUBLIC)
    public Result<List<ClassifyDTO>> listClassify(){
        List<ClassifyDTO> list = classifyService.listClassify();
        return Result.ok(list);
    }

    /**
     * 新增分类
     * @param classify 分类对象
     * @return 新增后的分类列表
     */
    @PostMapping("/")
    @ApiOperation(value = "新增分类",notes = NOTES_ADMIN)
    @AdminAuthorize
    @SysLog(resource = RESOURCE_CLASSIFY,type = SysLogTypeEnum.INSERT)
    public Result<List<ClassifyDTO>> insertClassify(@ApiParam("分类对象") @Valid @RequestBody ClassifyDO classify){
        classify.setId(null);
        classify = classifyService.save(classify);
        List<ClassifyDTO> list = this.produceDTOList(classify != null);
        return produceResult(list,"新增分类失败");
    }

    /**
     * 根据id更新分类
     * @param id 分类ID
     * @param classify 分类对象
     * @return 更新后的分类列表
     */
    @PutMapping("/{id}")
    @ApiOperation(value = "根据id更新分类",notes = NOTES_ADMIN)
    @AdminAuthorize
    @SysLog(resource = RESOURCE_CLASSIFY,type = SysLogTypeEnum.UPDATE)
    public Result<List<ClassifyDTO>> updateClassify(@ApiParam("分类ID") @PathVariable("id")Integer id,
                                                    @ApiParam("分类对象") @Valid @RequestBody ClassifyDO classify){
        classify.setId(id);
        classify = classifyService.save(classify);
        List<ClassifyDTO> list = this.produceDTOList(classify != null);
        return produceResult(list,"更新分类失败");
    }

    /**
     * 根据id删除分类
     * @param id 分类ID
     * @return 删除后的分类列表
     */
    @DeleteMapping("/{id}")
    @ApiOperation(value = "根据id删除分类",notes = NOTES_ADMIN)
    @AdminAuthorize
    @SysLog(resource = RESOURCE_CLASSIFY,type = SysLogTypeEnum.DELETE)
    public Result<List<ClassifyDTO>> deleteClassify(@ApiParam("分类ID") @PathVariable("id")Integer id){
        List<ClassifyDTO> list = this.produceDTOList(classifyService.delete(id));
        return produceResult(list,"删除分类成功");
    }

    /**
     * 根据判断是否成功，返回分类列表
     * @param isSuccess 是否成功
     * @return 分类列表
     */
    private List<ClassifyDTO> produceDTOList(boolean isSuccess){
        List<ClassifyDTO> list = null;

        if(isSuccess){
            list = classifyService.listClassify();
        }

        return list;
    }
}
