package indi.zhuyst.skyblog.pojo;

import indi.zhuyst.skyblog.entity.SysLogDO;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.beans.BeanUtils;

/**
 * 系统日志DTO
 * @author zhuyst
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class SysLogDTO extends SysLogDO{

    /**
     * 操作用户对象
     */
    private UserDTO user;

    public SysLogDTO(SysLogDO sysLog){
        BeanUtils.copyProperties(sysLog,this);
    }
}
