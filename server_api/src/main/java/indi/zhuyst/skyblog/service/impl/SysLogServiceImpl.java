package indi.zhuyst.skyblog.service.impl;

import com.github.pagehelper.PageInfo;
import indi.zhuyst.common.pojo.Query;
import indi.zhuyst.common.service.impl.BaseCrudServiceImpl;
import indi.zhuyst.common.util.PageUtils;
import indi.zhuyst.skyblog.dao.SysLogDao;
import indi.zhuyst.skyblog.entity.SysLogDO;
import indi.zhuyst.skyblog.pojo.SysLogDTO;
import indi.zhuyst.skyblog.pojo.UserDTO;
import indi.zhuyst.skyblog.service.SysLogService;
import indi.zhuyst.skyblog.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * 系统日志实现类
 * @author zhuyst
 */
@Service("sysLogService")
public class SysLogServiceImpl extends BaseCrudServiceImpl<SysLogDao,SysLogDO>
        implements SysLogService{

    @Autowired
    private UserService userService;

    @Override
    public SysLogDTO getSysLogDTO(int id) {
        SysLogDO sysLog = super.getByID(id);
        return this.produceDTO(sysLog);
    }

    @Override
    public PageInfo<SysLogDTO> listSysLogDTO(Query<SysLogDO> query) {
        PageInfo<SysLogDO> pageInfo = super.listByCondition(query);
        return this.produceDTOPageInfo(pageInfo);
    }

    /**
     * 将DO封装为DTO
     * @param sysLog DO
     * @return 封装后的DTO
     */
    private SysLogDTO produceDTO(SysLogDO sysLog){
        if(sysLog == null){
            return null;
        }

        SysLogDTO dto = new SysLogDTO(sysLog);

        UserDTO user = userService.getUserDTO(sysLog.getUserId());
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
    private PageInfo<SysLogDTO> produceDTOPageInfo(PageInfo<SysLogDO> pageInfo){
        List<SysLogDTO> list = new ArrayList<>(pageInfo.getSize());
        for(SysLogDO sysLog : pageInfo.getList()){
            SysLogDTO dto = this.produceDTO(sysLog);
            list.add(dto);
        }
        return PageUtils.copyNewInfo(pageInfo,list);
    }
}
