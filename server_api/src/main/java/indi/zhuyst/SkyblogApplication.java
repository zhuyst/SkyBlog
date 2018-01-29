package indi.zhuyst;

import indi.zhuyst.common.dao.BaseDao;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@SpringBootApplication
@MapperScan(basePackages = "indi.zhuyst.skyblog.dao",markerInterface = BaseDao.class)
public class SkyblogApplication {

	public static void main(String[] args) {
		SpringApplication.run(SkyblogApplication.class, args);
	}
}
