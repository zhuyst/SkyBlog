package indi.zhuyst.common.controller;

import indi.zhuyst.common.pojo.R;
import indi.zhuyst.security.pojo.SecurityUser;
import indi.zhuyst.security.util.SecurityUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.AccessDeniedException;

/**
 * 基础Controller
 * @author zhuyst
 */
public abstract class BaseController {

    protected Logger logger = LoggerFactory.getLogger(this.getClass());

    protected <T> R<T> produceResult(T pojo,String errorMsg){
        return pojo == null ? R.error(errorMsg) : R.ok(pojo);
    }

    protected <T> R<T> produceResult(T pojo,int code,String errorMsg){
        return pojo == null ? R.error(code,errorMsg) : R.ok(pojo);
    }

    protected R produceResult(boolean isSuccess,String errorMsg){
        return isSuccess ? R.ok() : R.error(errorMsg);
    }

    protected SecurityUser getUser(){
        return SecurityUtil.getUser();
    }

    protected void checkPerms(Integer authorId){
        SecurityUser user = getUser();
        if(!user.isAdmin() || !authorId.equals(user.getId())){
            throw new AccessDeniedException("您没有权限进行该操作");
        }
    }
}
