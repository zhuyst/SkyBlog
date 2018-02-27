package indi.zhuyst.skyblog.controller;

import com.github.pagehelper.PageInfo;
import indi.zhuyst.common.controller.BaseController;
import indi.zhuyst.common.enums.CodeEnum;
import indi.zhuyst.common.pojo.Query;
import indi.zhuyst.common.pojo.Result;
import indi.zhuyst.skyblog.entity.ArticleDO;
import indi.zhuyst.skyblog.entity.ClassifyDO;
import indi.zhuyst.skyblog.entity.CommentDO;
import indi.zhuyst.skyblog.pojo.ArticleDTO;
import indi.zhuyst.skyblog.pojo.ArticlesAndClassifyVO;
import indi.zhuyst.skyblog.pojo.CommentDTO;
import indi.zhuyst.skyblog.service.ArticleService;
import indi.zhuyst.skyblog.service.ClassifyService;
import indi.zhuyst.skyblog.service.CommentService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

/**
 * 文章相关API
 * @author zhuyst
 */
@RestController
@Api(value = "ArticleApi",description = "文章相关API")
@RequestMapping("/articles")
public class ArticleController extends BaseController{

    @Autowired
    private ArticleService articleService;

    @Autowired
    private CommentService commentService;

    @Autowired
    private ClassifyService classifyService;

    /**
     * 根据id查询文章
     * @param id 文章ID
     * @return 文章DTO
     */
    @GetMapping("/public/{id}")
    @ApiOperation("根据id查询文章")
    public Result<ArticleDTO> getArticle(@ApiParam("文章ID") @PathVariable("id")Integer id){
        ArticleDTO pojo = articleService.getArticleDTO(id);
        return produceResult(pojo, CodeEnum.NOT_FOUND.getCode(),"未找到该文章");
    }

    /**
     * 更新文章
     * @param id 文章ID
     * @param article 文章对象
     * @return 更新后的文章DTO
     */
    @PutMapping("/{id}")
    @ApiOperation("更新文章")
    @PreAuthorize("hasAnyRole('SYS_ADMIN','ADMIN')")
    public Result<ArticleDTO> updateArticle(@ApiParam("文章ID") @PathVariable("id")Integer id,
                                            @ApiParam("文章对象") @Valid @RequestBody ArticleDO article){
        article.setId(id);
        ArticleDTO pojo = articleService.saveArticle(article);
        return produceResult(pojo,"更新文章失败");
    }

    /**
     * 新增文章
     * @param article 文章对象
     * @return 新增后的文章DTO
     */
    @PostMapping("/")
    @ApiOperation("新增文章")
    @PreAuthorize("hasAnyRole('SYS_ADMIN','ADMIN')")
    public Result<ArticleDTO> insertArticle(@ApiParam("文章对象") @Valid @RequestBody ArticleDO article){
        article.setId(null);
        ArticleDTO pojo = articleService.saveArticle(article);
        return produceResult(pojo,"新增文章失败");
    }

    /**
     * 根据id删除文章
     * @param id 文章ID
     * @return 结果对象
     */
    @DeleteMapping("/{id}")
    @ApiOperation("根据id删除文章")
    @PreAuthorize("hasAnyRole('SYS_ADMIN','ADMIN')")
    public Result deleteArticle(@ApiParam("文章ID") @PathVariable("id")Integer id){
        return produceResult(articleService.delete(id),"删除文章失败");
    }

    /**
     * 查询文章列表
     * @param query 查询对象
     * @return 文章分页对象
     */
    @GetMapping("/public/list/")
    @ApiOperation("查询文章列表")
    public Result<PageInfo<ArticleDTO>> listArticle(Query query){
        PageInfo<ArticleDTO> pageInfo = articleService.listArticle(new Query<>(query));
        return Result.ok(pageInfo);
    }

    /**
     * 根据分类id查询文章列表
     * @param classifyId 分类id
     * @param query 查询对象
     * @return 包含了Article的分页信息以及分类信息的VO
     */
    @GetMapping("/public/classify/{id}/")
    @ApiOperation("根据分类id查询文章列表")
    public Result<ArticlesAndClassifyVO> listArticleByClassify(@ApiParam("分类ID")
                                                             @PathVariable("id")Integer classifyId,
                                                               Query query){
        ArticlesAndClassifyVO vo = new ArticlesAndClassifyVO();

        ArticleDO article = new ArticleDO();
        article.setClassifyId(classifyId);
        Query<ArticleDO> articleQuery = new Query<>(query,article);

        PageInfo<ArticleDTO> pageInfo = articleService.listArticle(articleQuery);
        vo.setArticles(pageInfo);

        ClassifyDO classify = classifyService.getByID(classifyId);
        vo.setClassify(classify);

        return Result.ok(vo);
    }

    /**
     * 查询文章下的评论列表
     * @param articleId 文章ID
     * @param query 查询对象
     * @return 评论的分页对象
     */
    @GetMapping("/public/{id}/comment/")
    @ApiOperation("查询文章下的评论列表")
    public Result<PageInfo<CommentDTO>> listComment(@ApiParam("文章ID") @PathVariable("id")Integer articleId,
                                                    Query query){
        CommentDO comment = new CommentDO();
        comment.setArticleId(articleId);
        Query<CommentDO> commentQuery = new Query<>(query,comment);

        PageInfo<CommentDTO> pageInfo = commentService.listComment(commentQuery);
        return Result.ok(pageInfo);
    }

    /**
     * 新增该id的文章下的评论
     * @param articleId 文章ID
     * @param comment 评论对象
     * @return 评论DTO
     */
    @PostMapping("/{id}/comment/")
    @ApiOperation("新增该id的文章下的评论")
    @PreAuthorize("isAuthenticated()")
    public Result<CommentDTO> insertComment(@ApiParam("文章ID") @PathVariable("id") Integer articleId,
                                            @ApiParam("评论对象") @Valid @RequestBody CommentDO comment){
        comment.setId(null);
        comment.setArticleId(articleId);

        CommentDTO pojo = commentService.saveComment(comment);
        return produceResult(pojo,"新增评论失败");
    }

    /**
     * 根据id删除评论
     * @param id 评论id
     * @return 结果对象
     */
    @DeleteMapping(value = "/comment/{id}")
    @ApiOperation("根据id删除评论")
    @PreAuthorize("isAuthenticated()")
    public Result deleteComment(@ApiParam("评论ID") @PathVariable("id") Integer id){
        CommentDO comment = commentService.getCommentDTO(id);
        checkPerms(comment.getAuthorId());
        return produceResult(commentService.delete(id),"评论删除失败");
    }
}
