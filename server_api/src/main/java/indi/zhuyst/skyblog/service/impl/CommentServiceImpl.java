package indi.zhuyst.skyblog.service.impl;

import com.github.pagehelper.PageInfo;
import indi.zhuyst.common.pojo.Query;
import indi.zhuyst.common.service.BaseCrudServiceImpl;
import indi.zhuyst.common.util.PageUtils;
import indi.zhuyst.security.util.SecurityUtils;
import indi.zhuyst.skyblog.dao.CommentDao;
import indi.zhuyst.skyblog.entity.Comment;
import indi.zhuyst.skyblog.entity.User;
import indi.zhuyst.skyblog.pojo.CommentDTO;
import indi.zhuyst.skyblog.pojo.UserDTO;
import indi.zhuyst.skyblog.service.CommentService;
import indi.zhuyst.skyblog.service.UserService;
import indi.zhuyst.skyblog.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class CommentServiceImpl extends BaseCrudServiceImpl<CommentDao,Comment> implements CommentService{

    @Autowired
    private UserService userService;

    @Override
    @Transactional(rollbackFor = RuntimeException.class)
    public Comment save(Comment comment) {
        String content = comment.getContent();

        content = StringUtils.removeHtmlTag(content);
        comment.setContent(content);

        comment.setCreateDate(new Date());

        User user = SecurityUtils.getUser();
        comment.setAuthorId(user.getId());

        return super.save(comment);
    }

    @Override
    @CacheEvict(cacheNames = {CACHE_OBJECT,CACHE_PAGE},allEntries = true)
    public boolean delete(int id) {
        return super.delete(id);
    }

    @Override
    @Cacheable(cacheNames = CACHE_OBJECT,key = "#id")
    public CommentDTO getCommentDTO(int id){
        Comment comment = super.getByID(id);
        return this.produceDTO(comment);
    }

    @Override
    @Transactional(rollbackFor = RuntimeException.class)
    @CacheEvict(cacheNames = {CACHE_OBJECT,CACHE_PAGE},allEntries = true)
    public CommentDTO saveComment(Comment comment){
        CommentDTO pojo = null;

        comment = this.save(comment);
        if(comment != null){
            pojo = this.getCommentDTO(comment.getId());
        }

        return pojo;
    }

    @Override
    @Cacheable(cacheNames = CACHE_PAGE)
    public PageInfo<CommentDTO> listComment(Query<Comment> query){
        PageInfo<Comment> pageInfo = super.listByCondition(query);

        List<CommentDTO> pojoList = new ArrayList<>();
        for(Comment c : pageInfo.getList()){
            CommentDTO pojo = produceDTO(c);
            pojoList.add(pojo);
        }

        return PageUtils.copyNewInfo(pageInfo,pojoList);
    }

    private CommentDTO produceDTO(Comment comment){
        if(comment == null){
            return null;
        }

        CommentDTO pojo = new CommentDTO(comment);
        setAuthor(pojo);

        if(comment.getPreviousCommentId() != null){
            Comment previousComment = super.getByID(comment.getPreviousCommentId());

            CommentDTO previousDTO = new CommentDTO(previousComment);
            setAuthor(previousDTO);

            pojo.setPreviousComment(previousDTO);
        }

        return pojo;
    }

    private void setAuthor(CommentDTO dto){
        UserDTO user = userService.getUserDTO(dto.getAuthorId());
        dto.setAuthor(user);
    }
}
