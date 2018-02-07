package indi.zhuyst.common.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;

/**
 * 基础服务抽象类
 * @author zhuyst
 */
@Transactional(readOnly = true,rollbackFor = RuntimeException.class)
public abstract class BaseService {

    /**
     * 日志对象
     */
    protected Logger logger = LoggerFactory.getLogger(this.getClass());
}
