package indi.zhuyst.skyblog.pojo;

import indi.zhuyst.skyblog.entity.SysLogDO;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class SysLogDTO extends SysLogDO{

    private UserDTO user;
}
