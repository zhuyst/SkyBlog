package indi.zhuyst.skyblog;

import indi.zhuyst.security.pojo.SecurityUser;
import indi.zhuyst.skyblog.entity.Article;
import indi.zhuyst.skyblog.entity.Comment;
import indi.zhuyst.skyblog.entity.User;
import indi.zhuyst.skyblog.service.ArticleService;
import indi.zhuyst.skyblog.service.CommentService;
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
	private CommentService commentService;

	@Test
	public void contextLoads() {
		fakeLogin();
		for(int i = 1;i <= 30;i++){
			Comment comment = new Comment();
			comment.setArticleId(24);
			comment.setContent("评论 - " + i);
			commentService.save(comment);
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
