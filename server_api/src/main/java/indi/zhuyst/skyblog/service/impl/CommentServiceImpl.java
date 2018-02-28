package indi.zhuyst.skyblog.service.impl;

import com.github.pagehelper.PageInfo;
import indi.zhuyst.common.exception.CommonException;
import indi.zhuyst.common.pojo.Query;
import indi.zhuyst.common.service.impl.BaseCrudServiceImpl;
import indi.zhuyst.common.util.PageUtils;
import indi.zhuyst.security.util.SecurityUtils;
import indi.zhuyst.skyblog.dao.CommentDao;
import indi.zhuyst.skyblog.entity.CommentDO;
import indi.zhuyst.skyblog.entity.UserDO;
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

/**
 * 文章评论服务实现类
 * @author zhuyst
 */
@Service("commentService")
public class CommentServiceImpl extends BaseCrudServiceImpl<CommentDao,CommentDO> implements CommentService{

    @Autowired
    private UserService userService;

    @Override
    @Transactional(rollbackFor = RuntimeException.class)
    public CommentDO save(CommentDO comment) {

        Integer previousCommentId = comment.getPreviousCommentId();
        if(previousCommentId != null){

            CommentDO previousComment = this.getByID(previousCommentId);
            if(previousComment == null){
                throw new CommonException("回复评论有误，不存在该评论");
            }
        }

        String content = comment.getContent();

        content = StringUtils.removeHtmlTag(content);
        comment.setContent(content);

        comment.setCreateDate(new Date());

        UserDO user = SecurityUtils.getUser();
        comment.setAuthorId(user.getId());



        return super.save(comment);
    }

    @Override
    @CacheEvict(cacheNames = {CACHE_OBJECT,CACHE_PAGE},allEntries = true)
    @Transactional(rollbackFor = RuntimeException.class)
    public boolean delete(int id) {
        return super.delete(id);
    }

    @Override
    @Cacheable(cacheNames = CACHE_OBJECT,key = "#id")
    public CommentDTO getCommentDTO(int id){
        CommentDO comment = super.getByID(id);
        return this.produceDTO(comment);
    }

    @Override
    @Transactional(rollbackFor = RuntimeException.class)
    @CacheEvict(cacheNames = {CACHE_OBJECT,CACHE_PAGE},allEntries = true)
    public CommentDTO saveComment(CommentDO comment){
        CommentDTO pojo = null;

        comment = this.save(comment);
        if(comment != null){
            pojo = this.getCommentDTO(comment.getId());
        }

        return pojo;
    }

    @Override
    @Cacheable(cacheNames = CACHE_PAGE)
    public PageInfo<CommentDTO> listComment(Query<CommentDO> query){
        PageInfo<CommentDO> pageInfo = super.listByCondition(query);

        List<CommentDTO> pojoList = new ArrayList<>();
        for(CommentDO c : pageInfo.getList()){
            CommentDTO pojo = produceDTO(c);
            pojoList.add(pojo);
        }

        return PageUtils.copyNewInfo(pageInfo,pojoList);
    }

    /**
     * 将DO封装为DTO
     * @param comment DO
     * @return DTO
     */
    private CommentDTO produceDTO(CommentDO comment){
        if(comment == null){
            return null;
        }

        CommentDTO pojo = new CommentDTO(comment);
        setAuthor(pojo);

        if(comment.getPreviousCommentId() != null){
            CommentDO previousComment = super.getByID(comment.getPreviousCommentId());

            // 有可能出现回复的评论已被删除的情况
            if(previousComment != null){
                CommentDTO previousDTO = new CommentDTO(previousComment);
                setAuthor(previousDTO);
                pojo.setPreviousComment(previousDTO);
            }
        }

        return pojo;
    }

    /**
     * 设置评论的作者
     * @param dto 要设置的评论
     */
    private void setAuthor(CommentDTO dto){
        UserDTO user = userService.getUserDTO(dto.getAuthorId());
        if(user != null){
            dto.setAuthor(user);
        }
    }
}
