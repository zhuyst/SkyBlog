package indi.zhuyst.security.pojo;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;

@Data
@NoArgsConstructor
public class AccessToken {

    private String token;

    private Long expire;

    private UserDetails user;
}
