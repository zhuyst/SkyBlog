package indi.zhuyst.common.service.impl;

import indi.zhuyst.common.dao.SysLogDao;
import indi.zhuyst.common.entity.SysLogDO;
import indi.zhuyst.common.service.SysLogService;
import org.springframework.stereotype.Service;

@Service("sysLogService")
public class SysLogServiceImpl extends BaseCrudServiceImpl<SysLogDao,SysLogDO>
        implements SysLogService{
}
