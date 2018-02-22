package indi.zhuyst.skyblog.controller;

import com.github.pagehelper.PageInfo;
import indi.zhuyst.common.controller.BaseController;
import indi.zhuyst.common.enums.CodeEnum;
import indi.zhuyst.common.pojo.Query;
import indi.zhuyst.common.pojo.R;
import indi.zhuyst.skyblog.entity.Article;
import indi.zhuyst.skyblog.entity.Classify;
import indi.zhuyst.skyblog.entity.Comment;
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

@RestController
@Api(value = "ArticleApi",description = "文章相关Api")
@RequestMapping("/articles")
public class ArticleController extends BaseController{

    @Autowired
    private ArticleService articleService;

    @Autowired
    private CommentService commentService;

    @Autowired
    private ClassifyService classifyService;

    @GetMapping("/public/{id}")
    @ApiOperation("根据id查询文章")
    public R<ArticleDTO> getArticle(@ApiParam("文章ID") @PathVariable("id")Integer id){
        ArticleDTO pojo = articleService.getArticleDTO(id);
        return produceResult(pojo, CodeEnum.NOT_FOUND.getCode(),"未找到该文章");
    }

    @PutMapping("/{id}")
    @ApiOperation("更新文章")
    @PreAuthorize("hasAnyRole('SYS_ADMIN','ADMIN')")
    public R<ArticleDTO> updateArticle(@ApiParam("文章ID") @PathVariable("id")Integer id,
                                       @ApiParam("文章对象") @Valid @RequestBody Article article){
        article.setId(id);
        ArticleDTO pojo = articleService.saveArticle(article);
        return produceResult(pojo,"更新文章失败");
    }

    @PostMapping("/")
    @ApiOperation("新增文章")
    @PreAuthorize("hasAnyRole('SYS_ADMIN','ADMIN')")
    public R<ArticleDTO> insertArticle(@ApiParam("文章对象") @Valid @RequestBody Article article){
        article.setId(null);
        ArticleDTO pojo = articleService.saveArticle(article);
        return produceResult(pojo,"新增文章失败");
    }

    @DeleteMapping("/{id}")
    @ApiOperation("根据id删除文章")
    @PreAuthorize("hasAnyRole('SYS_ADMIN','ADMIN')")
    public R deleteArticle(@ApiParam("文章ID") @PathVariable("id")Integer id){
        return produceResult(articleService.delete(id),"删除文章失败");
    }

    @GetMapping("/public/list/")
    @ApiOperation("查询文章列表")
    public R<PageInfo<ArticleDTO>> listArticle(Query query){
        PageInfo<ArticleDTO> pageInfo = articleService.listArticle(new Query<>(query));
        return R.ok(pageInfo);
    }

    @GetMapping("/public/classify/{id}/")
    @ApiOperation("根据分类id查询文章列表")
    public R<ArticlesAndClassifyVO> listArticleByClassify(@ApiParam("分类ID")
                                                             @PathVariable("id")Integer classifyId,
                                                         Query query){
        ArticlesAndClassifyVO vo = new ArticlesAndClassifyVO();

        Article article = new Article();
        article.setClassifyId(classifyId);
        Query<Article> articleQuery = new Query<>(query,article);

        PageInfo<ArticleDTO> pageInfo = articleService.listArticle(articleQuery);
        vo.setArticles(pageInfo);

        Classify classify = classifyService.getById(classifyId);
        vo.setClassify(classify);

        return R.ok(vo);
    }

    @GetMapping("/public/{id}/comment/")
    @ApiOperation("查询文章下的评论列表")
    public R<PageInfo<CommentDTO>> listComment(@ApiParam("文章ID") @PathVariable("id")Integer articleId,
                                               Query query){
        Comment comment = new Comment();
        comment.setArticleId(articleId);
        Query<Comment> commentQuery = new Query<>(query,comment);

        PageInfo<CommentDTO> pageInfo = commentService.listComment(commentQuery);
        return R.ok(pageInfo);
    }

    @PostMapping("/{id}/comment/")
    @ApiOperation("新增该id的文章下的评论")
    @PreAuthorize("isAuthenticated()")
    public R<CommentDTO> insertComment(@ApiParam("文章ID") @PathVariable("id") Integer articleId,
                                       @ApiParam("评论对象") @Valid @RequestBody Comment comment){
        comment.setId(null);
        comment.setArticleId(articleId);

        CommentDTO pojo = commentService.saveComment(comment);
        return produceResult(pojo,"新增评论失败");
    }

    @DeleteMapping(value = "/comment/{id}")
    @ApiOperation("根据id删除评论")
    @PreAuthorize("isAuthenticated()")
    public R deleteComment(@ApiParam("评论ID") @PathVariable("id") Integer id){
        Comment comment = commentService.getCommentDTO(id);
        checkPerms(comment.getAuthorId());
        return produceResult(commentService.delete(id),"评论删除失败");
    }
}
