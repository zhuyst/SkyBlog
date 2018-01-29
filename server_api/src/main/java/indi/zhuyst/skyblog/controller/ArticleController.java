package indi.zhuyst.skyblog.controller;

import com.github.pagehelper.PageInfo;
import indi.zhuyst.common.controller.BaseController;
import indi.zhuyst.common.pojo.R;
import indi.zhuyst.security.pojo.SecurityUser;
import indi.zhuyst.skyblog.entity.Article;
import indi.zhuyst.skyblog.entity.Comment;
import indi.zhuyst.skyblog.pojo.*;
import indi.zhuyst.skyblog.service.ArticleService;
import indi.zhuyst.skyblog.service.CommentService;
import indi.zhuyst.security.util.SecurityUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
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

    @RequestMapping(value = "/public/list/{pageNum}",method = RequestMethod.GET)
    @ApiOperation(value = "查询文章列表")
    public R<PageInfo<ArticleDTO>> listArticle(@PathVariable("pageNum")Integer pageNum){
        PageInfo<ArticleDTO> pageInfo = articleService.listArticle(pageNum);
        return R.ok(pageInfo);
    }

    @RequestMapping(value = "/public/classify/{id}/{pageNum}",method = RequestMethod.GET)
    @ApiOperation(value = "根据分类id查询文章列表")
    public R<PageInfo<ArticleDTO>> listArticleByClassify(@PathVariable("id")Integer classifyId,
                                                         @PathVariable("pageNum")Integer pageNum){
        PageInfo<ArticleDTO> pageInfo = articleService.listArticleByClassify(classifyId,pageNum);
        return R.ok(pageInfo);
    }

    @RequestMapping(value = "/public/{id}/comment/{pageNum}",method = RequestMethod.GET)
    @ApiOperation(value = "查询文章下的评论列表")
    public R<PageInfo<CommentDTO>> listComment(@PathVariable("id")Integer articleId,
                                               @PathVariable("pageNum")Integer pageNum){
        PageInfo<CommentDTO> pageInfo = commentService.listComment(articleId,pageNum);
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
        Comment comment = commentService.getCommentDTO(id);
        SecurityUser user = SecurityUtil.getUser();

        if(!user.isAdmin() || !comment.getAuthorId().equals(user.getId())){
            throw new AccessDeniedException("您没有权限进行该操作");
        }

        return produceResult(commentService.delete(id),"评论删除失败");
    }
}
