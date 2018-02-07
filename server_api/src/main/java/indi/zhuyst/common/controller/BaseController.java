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

    /**
     * 日志对象
     */
    protected Logger logger = LoggerFactory.getLogger(this.getClass());

    /**
     * 通过判断pojo是否为NULL，生成结果对象
     * NULL - 错误，{@link indi.zhuyst.common.enums.CodeEnum#ERROR}
     * NOT NULL - 成功，{@link indi.zhuyst.common.enums.CodeEnum#SUCCESS}
     * @param pojo 要判断的pojo
     * @param errorMsg 错误信息
     * @param <T> 对象类型
     * @return 结果对象
     */
    protected <T> R<T> produceResult(T pojo,String errorMsg){
        return pojo == null ? R.error(errorMsg) : R.ok(pojo);
    }

    /**
     * 通过判断pojo是否为NULL，生成结果对象
     * NULL - 错误，指定错误码
     * NOT NULL - 成功，{@link indi.zhuyst.common.enums.CodeEnum#SUCCESS}
     * @param pojo 要判断的pojo
     * @param code 错误码
     * @param errorMsg 错误信息
     * @param <T> 对象类型
     * @return 结果对象
     */
    protected <T> R<T> produceResult(T pojo,int code,String errorMsg){
        return pojo == null ? R.error(code,errorMsg) : R.ok(pojo);
    }

    /**
     * 通过判断是否成功，生成结果对象
     * TRUE - 成功，{@link indi.zhuyst.common.enums.CodeEnum#SUCCESS}
     * FALSE - 错误，{@link indi.zhuyst.common.enums.CodeEnum#ERROR}
     * @param isSuccess 是否成功
     * @param errorMsg 错误信息
     * @return 结果对象
     */
    protected R produceResult(boolean isSuccess,String errorMsg){
        return isSuccess ? R.ok() : R.error(errorMsg);
    }

    /**
     * 获取当前登录用户
     * @return 用户对象
     */
    protected SecurityUser getUser(){
        return SecurityUtil.getUser();
    }

    /**
     * 检查是否越权
     * @param authorId 用户ID
     */
    protected void checkPerms(int authorId){
        SecurityUser user = getUser();

        // 不是管理员或者作者ID不等于当前用于ID，则为越权
        if(!user.isAdmin() || authorId != user.getId()){
            throw new AccessDeniedException("您没有权限进行该操作");
        }
    }
}
