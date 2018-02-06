package indi.zhuyst.skyblog.controller;

import com.github.pagehelper.PageInfo;
import indi.zhuyst.common.controller.BaseController;
import indi.zhuyst.common.pojo.Query;
import indi.zhuyst.common.pojo.R;
import indi.zhuyst.skyblog.entity.Article;
import indi.zhuyst.skyblog.entity.Comment;
import indi.zhuyst.skyblog.pojo.ArticleDTO;
import indi.zhuyst.skyblog.pojo.CommentDTO;
import indi.zhuyst.skyblog.service.ArticleService;
import indi.zhuyst.skyblog.service.CommentService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@Api(value = "ArticleApi",description = "文章相关Api")
@RequestMapping("/api/articles")
public class ArticleController extends BaseController{

    @Autowired
    private ArticleService articleService;

    @Autowired
    private CommentService commentService;

    @RequestMapping(value = "/public/{id}",method = RequestMethod.GET)
    @ApiOperation(value = "根据id查询文章")
    public R<ArticleDTO> getArticle(@PathVariable("id")Integer id){
        ArticleDTO pojo = articleService.getArticleDTO(id);
        return produceResult(pojo,"未找到该文章");
    }

    @RequestMapping(value = "/{id}",method = RequestMethod.PUT)
    @ApiOperation(value = "更新文章")
    @PreAuthorize("hasAnyRole('SYS_ADMIN','ADMIN')")
    public R<ArticleDTO> updateArticle(@PathVariable("id")Integer id, @RequestBody Article article){
        article.setId(id);
        ArticleDTO pojo = articleService.saveArticle(article);
        return produceResult(pojo,"更新文章失败");
    }

    @RequestMapping(value = "/",method = RequestMethod.POST)
    @ApiOperation(value = "新增文章")
    @PreAuthorize("hasAnyRole('SYS_ADMIN','ADMIN')")
    public R<ArticleDTO> insertArticle(@RequestBody Article article){
        ArticleDTO pojo = articleService.saveArticle(article);
        return produceResult(pojo,"新增文章失败");
    }

    @RequestMapping(value = "/{id}",method = RequestMethod.DELETE)
    @ApiOperation(value = "根据id删除文章")
    @PreAuthorize("hasAnyRole('SYS_ADMIN','ADMIN')")
    public R deleteArticle(@PathVariable("id")Integer id){
        return produceResult(articleService.delete(id),"删除文章失败");
    }

    @RequestMapping(value = "/public/list/",method = RequestMethod.GET)
    @ApiOperation(value = "查询文章列表")
    public R<PageInfo<ArticleDTO>> listArticle(Query<Article> query){
        PageInfo<ArticleDTO> pageInfo = articleService.listArticle(query);
        return R.ok(pageInfo);
    }

    @RequestMapping(value = "/public/classify/{id}/",method = RequestMethod.GET)
    @ApiOperation(value = "根据分类id查询文章列表")
    public R<PageInfo<ArticleDTO>> listArticleByClassify(@PathVariable("id")Integer classifyId,
                                                         Query<Article> query){
        Article article = new Article();
        article.setClassifyId(classifyId);
        query.setEntity(article);

        PageInfo<ArticleDTO> pageInfo = articleService.listArticle(query);
        return R.ok(pageInfo);
    }

    @RequestMapping(value = "/public/{id}/comment/",method = RequestMethod.GET)
    @ApiOperation(value = "查询文章下的评论列表")
    public R<PageInfo<CommentDTO>> listComment(@PathVariable("id")Integer articleId,
                                               Query<Comment> query){
        Comment comment = new Comment();
        comment.setArticleId(articleId);
        query.setEntity(comment);

        PageInfo<CommentDTO> pageInfo = commentService.listComment(query);
        return R.ok(pageInfo);
    }

    @RequestMapping(value = "/{id}/comment/",method = RequestMethod.POST)
    @ApiOperation(value = "新增该id的文章下的评论")
    @PreAuthorize("isAuthenticated()")
    public R<CommentDTO> insertComment(@PathVariable("id") Integer articleId,
                                       @RequestBody Comment comment){
        comment.setArticleId(articleId);
        CommentDTO pojo = commentService.saveComment(comment);
        return produceResult(pojo,"新增评论失败");
    }

    @RequestMapping(value = "/comment/{id}",method = RequestMethod.DELETE)
    @ApiOperation(value = "根据id删除评论")
    @PreAuthorize("isAuthenticated()")
    public R deleteComment(@PathVariable("id") Integer id){
        Comment comment = commentService.getByID(id);
        checkPerms(comment.getAuthorId());
        return produceResult(commentService.delete(id),"评论删除失败");
    }
}
