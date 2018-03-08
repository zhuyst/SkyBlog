package indi.zhuyst.skyblog.service;

import com.github.pagehelper.PageInfo;
import indi.zhuyst.common.pojo.Query;
import indi.zhuyst.common.service.BaseCrudService;
import indi.zhuyst.skyblog.entity.AccessLogDO;
import indi.zhuyst.skyblog.pojo.AccessLogDTO;

/**
 * 访问日志服务接口
 * @author zhuyst
 */
public interface AccessLogService extends BaseCrudService<AccessLogDO>{

    /**
     * 通过id获取访问日志DTO
     * @param id 访问日志ID
     * @return 访问日志DTO
     */
    AccessLogDTO getAccessLogDTO(int id);

    /**
     * 获取访问日志分页对象
     * @param query 查询对象
     * @return 访问日志分页对象
     */
    PageInfo<AccessLogDTO> listAccessLogDTO(Query<AccessLogDO> query);
}
