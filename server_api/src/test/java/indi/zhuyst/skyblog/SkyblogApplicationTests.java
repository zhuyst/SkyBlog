package indi.zhuyst.skyblog;

import indi.zhuyst.security.pojo.SecurityUser;
import indi.zhuyst.skyblog.entity.Classify;
import indi.zhuyst.skyblog.entity.Comment;
import indi.zhuyst.skyblog.entity.User;
import indi.zhuyst.skyblog.service.ClassifyService;
import indi.zhuyst.skyblog.service.MsgBoardService;
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

	@Autowired
	private MsgBoardService msgBoardService;

	@Test
	public void contextLoads() {
		fakeLogin();
		for(int i = 1;i <= 60;i++){
			Comment comment = new Comment();
			comment.setContent("测试留言" + i);
			msgBoardService.insertMsg(comment);
		}
	}

	private void fakeLogin(){
		User user = userService.getByID(1);
		SecurityUser securityUser = new SecurityUser(user);

		UsernamePasswordAuthenticationToken authenticationToken =
				new UsernamePasswordAuthenticationToken(securityUser,null,securityUser.getAuthorities());
		SecurityContextHolder.getContext().setAuthentication(authenticationToken);
	}

}
