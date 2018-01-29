package indi.zhuyst.common.controller;

import indi.zhuyst.common.pojo.R;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public abstract class BaseController {

    protected Logger logger = LoggerFactory.getLogger(this.getClass());

    protected static <T> R<T> produceResult(T pojo,String errorMsg){
        return pojo == null ? R.error(errorMsg) : R.ok(pojo);
    }

    protected static R produceResult(boolean isSuccess,String errorMsg){
        return isSuccess ? R.ok() : R.error(errorMsg);
    }
}
