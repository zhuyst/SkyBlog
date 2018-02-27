package indi.zhuyst.skyblog.service.impl;

import indi.zhuyst.common.service.impl.BaseCrudServiceImpl;
import indi.zhuyst.skyblog.dao.SysLogDao;
import indi.zhuyst.skyblog.entity.SysLogDO;
import indi.zhuyst.skyblog.service.SysLogService;
import org.springframework.stereotype.Service;

@Service("sysLogService")
public class SysLogServiceImpl extends BaseCrudServiceImpl<SysLogDao,SysLogDO>
        implements SysLogService{
}
