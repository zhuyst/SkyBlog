package indi.zhuyst.common.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly = true,rollbackFor = RuntimeException.class)
public abstract class BaseService {

    protected Logger logger = LoggerFactory.getLogger(this.getClass());
}
