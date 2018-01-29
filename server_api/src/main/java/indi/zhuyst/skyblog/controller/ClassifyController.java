package indi.zhuyst.skyblog.controller;

import indi.zhuyst.common.controller.BaseController;
import indi.zhuyst.skyblog.entity.Classify;
import indi.zhuyst.skyblog.pojo.ClassifyAndArticlesTitle;
import indi.zhuyst.common.pojo.R;
import indi.zhuyst.skyblog.service.ClassifyService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Api(value = "ClassifyApi",description = "文章分类相关API")
@RequestMapping("/api/classifies")
public class ClassifyController extends BaseController{

    @Autowired
    private ClassifyService classifyService;

    @RequestMapping(value = "/public/",method = RequestMethod.GET)
    @ApiOperation(value = "查询分类列表")
    public R<List<Classify>> listClassify(){
        List<Classify> list = classifyService.listClassify();
        return R.ok(list);
    }

    @RequestMapping(value = "/",method = RequestMethod.POST)
    @ApiOperation(value = "新增分类")
    public R<List<Classify>> insertClassify(@RequestBody Classify classify){
        List<Classify> list = classifyService.saveClassify(classify);
        return produceResult(list,"新增分类失败");
    }

    @RequestMapping(value = "/{id}",method = RequestMethod.PUT)
    @ApiOperation(value = "根据id更新分类")
    public R<List<Classify>> updateClassify(@PathVariable("id")Integer id, Classify classify){
        classify.setId(id);
        List<Classify> list = classifyService.saveClassify(classify);
        return produceResult(list,"更新分类失败");
    }

    @RequestMapping(value = "/{id}",method = RequestMethod.DELETE)
    @ApiOperation(value = "根据id删除分类")
    public R<List<Classify>> deleteClassify(@PathVariable("id")Integer id){
        List<Classify> list = classifyService.deleteClassify(id);
        return produceResult(list,"删除分类成功");
    }

    @RequestMapping(value = "/title/",method = RequestMethod.GET)
    @ApiOperation(value = "查询分类列表及分类下的文章标题")
    public R<List<ClassifyAndArticlesTitle>> listClassifyAndArticlesTitle(){
        List<ClassifyAndArticlesTitle> list = classifyService.listClassifyAndArticlesTitle();
        return R.ok(list);
    }
}
