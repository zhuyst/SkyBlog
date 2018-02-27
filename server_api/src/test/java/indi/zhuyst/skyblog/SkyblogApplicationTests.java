package indi.zhuyst.skyblog;

import indi.zhuyst.security.pojo.SecurityUser;
import indi.zhuyst.skyblog.entity.UserDO;
import indi.zhuyst.skyblog.service.UserService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class SkyblogApplicationTests {

	@Autowired
	private UserService userService;

	@Test
	public void contextLoads() {
		fakeLogin();
		for(int i = 1;i <= 30;i++){
			UserDO user = new UserDO();
			user.setUsername("username" + i);
			user.setNickname("用户" + i);
			user.setPassword("123456" + i);
			userService.saveUser(user);
		}
	}

	private void fakeLogin(){
		UserDO user = userService.getByID(1);
		SecurityUser securityUser = new SecurityUser(user);

		UsernamePasswordAuthenticationToken authenticationToken =
				new UsernamePasswordAuthenticationToken(securityUser,null,securityUser.getAuthorities());
		SecurityContextHolder.getContext().setAuthentication(authenticationToken);
	}

}
