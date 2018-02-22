package indi.zhuyst.skyblog.controller;

import indi.zhuyst.common.controller.BaseController;
import indi.zhuyst.common.pojo.R;
import indi.zhuyst.skyblog.entity.Classify;
import indi.zhuyst.skyblog.pojo.ClassifyDTO;
import indi.zhuyst.skyblog.service.ClassifyService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@Api(value = "ClassifyApi",description = "文章分类相关API")
@RequestMapping("/classifies")
public class ClassifyController extends BaseController{

    @Autowired
    private ClassifyService classifyService;

    @RequestMapping(value = "/public/",method = RequestMethod.GET)
    @ApiOperation("查询分类列表")
    public R<List<ClassifyDTO>> listClassify(){
        List<ClassifyDTO> list = classifyService.listClassify();
        return R.ok(list);
    }

    @RequestMapping(value = "/",method = RequestMethod.POST)
    @ApiOperation("新增分类")
    @PreAuthorize("hasAnyRole('SYS_ADMIN','ADMIN')")
    public R<List<ClassifyDTO>> insertClassify(@ApiParam("分类对象") @Valid @RequestBody Classify classify){
        classify.setId(null);
        classify = classifyService.saveClassify(classify);
        List<ClassifyDTO> list = this.produceDTOList(classify != null);
        return produceResult(list,"新增分类失败");
    }

    @RequestMapping(value = "/{id}",method = RequestMethod.PUT)
    @ApiOperation("根据id更新分类")
    @PreAuthorize("hasAnyRole('SYS_ADMIN','ADMIN')")
    public R<List<ClassifyDTO>> updateClassify(@ApiParam("分类ID") @PathVariable("id")Integer id,
                                            @ApiParam("分类对象") @Valid @RequestBody Classify classify){
        classify.setId(id);
        classify = classifyService.saveClassify(classify);
        List<ClassifyDTO> list = this.produceDTOList(classify != null);
        return produceResult(list,"更新分类失败");
    }

    @RequestMapping(value = "/{id}",method = RequestMethod.DELETE)
    @ApiOperation("根据id删除分类")
    @PreAuthorize("hasAnyRole('SYS_ADMIN','ADMIN')")
    public R<List<ClassifyDTO>> deleteClassify(@ApiParam("分类ID") @PathVariable("id")Integer id){
        List<ClassifyDTO> list = this.produceDTOList(classifyService.deleteClassify(id));
        return produceResult(list,"删除分类成功");
    }

    private List<ClassifyDTO> produceDTOList(boolean isSuccess){
        List<ClassifyDTO> list = null;

        if(isSuccess){
            list = classifyService.listClassify();
        }

        return list;
    }
}
