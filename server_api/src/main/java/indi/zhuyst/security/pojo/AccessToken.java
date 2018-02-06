package indi.zhuyst.security.pojo;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AccessToken {

    private String token;

    private Long expire;

    private SecurityUser user;
}
