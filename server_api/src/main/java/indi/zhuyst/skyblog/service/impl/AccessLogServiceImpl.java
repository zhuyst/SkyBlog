package indi.zhuyst.skyblog.service.impl;

import com.github.pagehelper.PageInfo;
import indi.zhuyst.common.pojo.Query;
import indi.zhuyst.common.service.impl.BaseCrudServiceImpl;
import indi.zhuyst.common.util.PageUtils;
import indi.zhuyst.skyblog.dao.AccessLogDao;
import indi.zhuyst.skyblog.entity.AccessLogDO;
import indi.zhuyst.skyblog.pojo.AccessLogDTO;
import indi.zhuyst.skyblog.pojo.UserDTO;
import indi.zhuyst.skyblog.service.AccessLogService;
import indi.zhuyst.skyblog.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * 访问日志服务实现类
 * @author zhuyst
 */
@Service("accessLogService")
public class AccessLogServiceImpl extends BaseCrudServiceImpl<AccessLogDao,AccessLogDO> 
        implements AccessLogService{

    private final UserService userService;

    @Autowired
    public AccessLogServiceImpl(UserService userService){
        this.userService = userService;
    }

    @Override
    public AccessLogDTO getAccessLogDTO(int id) {
        AccessLogDO accessLog = super.getByID(id);
        return this.produceDTO(accessLog);
    }

    @Override
    public PageInfo<AccessLogDTO> listAccessLogDTO(Query<AccessLogDO> query) {
        PageInfo<AccessLogDO> pageInfo = super.listByCondition(query);
        return this.produceDTOPageInfo(pageInfo);
    }

    /**
     * 将DO封装为DTO
     * @param accessLog DO
     * @return 封装后的DTO
     */
    private AccessLogDTO produceDTO(AccessLogDO accessLog){
        if(accessLog == null){
            return null;
        }

        AccessLogDTO dto = new AccessLogDTO(accessLog);

        UserDTO user = userService.getUserDTO(accessLog.getUserId());
        if(user != null){
            dto.setUser(user);
        }

        return dto;
    }

    /**
     * 将DO分页对象封装为DTO分页对象
     * @param pageInfo DO分页对象
     * @return DTO分页对象
     */
    private PageInfo<AccessLogDTO> produceDTOPageInfo(PageInfo<AccessLogDO> pageInfo){
        List<AccessLogDTO> list = new ArrayList<>(pageInfo.getSize());
        for(AccessLogDO accessLog : pageInfo.getList()){
            AccessLogDTO dto = this.produceDTO(accessLog);
            list.add(dto);
        }
        return PageUtils.copyNewInfo(pageInfo,list);
    }
}
