package indi.zhuyst.skyblog.pojo;

import indi.zhuyst.skyblog.entity.AccessLogDO;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.beans.BeanUtils;

/**
 * 访问日志DTO
 * @author zhuyst
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class AccessLogDTO extends AccessLogDO{

    private static final long serialVersionUID = 7405299604753712969L;
    /**
     * 访问用户
     */
    @ApiModelProperty("访问用户")
    private UserDTO user;

    public AccessLogDTO(AccessLogDO accessLog){
        BeanUtils.copyProperties(accessLog,this);
    }
}
