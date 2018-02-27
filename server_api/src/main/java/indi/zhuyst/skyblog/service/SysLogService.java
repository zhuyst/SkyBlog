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

    SysLogDTO getSysLogDTO(int id);

    PageInfo<SysLogDTO> listSysLogDTO(Query<SysLogDO> query);
}
