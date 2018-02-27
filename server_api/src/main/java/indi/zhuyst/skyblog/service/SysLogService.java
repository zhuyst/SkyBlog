package indi.zhuyst.skyblog.service;

import com.github.pagehelper.PageInfo;
import indi.zhuyst.common.pojo.Query;
import indi.zhuyst.common.service.BaseCrudService;
import indi.zhuyst.skyblog.entity.SysLogDO;
import indi.zhuyst.skyblog.pojo.SysLogDTO;

/**
 * 系统日志服务接口
 * @author zhuyst
 */
public interface SysLogService extends BaseCrudService<SysLogDO> {

    /**
     * 通过id获取系统日志DTO
     * @param id 系统日志ID
     * @return 系统日志DTO
     */
    SysLogDTO getSysLogDTO(int id);

    /**
     * 获取系统日志分页对象
     * @param query 查询对象
     * @return 系统日志分页对象
     */
    PageInfo<SysLogDTO> listSysLogDTO(Query<SysLogDO> query);
}
