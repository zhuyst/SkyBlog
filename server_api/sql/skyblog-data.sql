/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50720
Source Host           : localhost:3306
Source Database       : skyblog

Target Server Type    : MYSQL
Target Server Version : 50720
File Encoding         : 65001

Date: 2018-02-28 14:50:58
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `sub_title` varchar(255) DEFAULT NULL,
  `content` longtext,
  `classify_id` int(255) DEFAULT NULL,
  `author_id` int(11) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `classify_id` (`classify_id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES ('1', '留言板', null, '留言板引用文章', null, null, null, null);
INSERT INTO `article` VALUES ('2', '关于', null, '## 关于SkyBlog\n-------', null, null, null, null);
INSERT INTO `article` VALUES ('10', '文章标题 - 9', '文章副标题 - 9', '# Markdown', '1', '1', '2018-02-08 15:32:00', '2018-02-08 15:32:00');
INSERT INTO `article` VALUES ('11', '文章标题 - 10', '文章副标题 - 10', '# Markdown', '1', '1', '2018-02-08 15:32:00', '2018-02-08 15:32:00');
INSERT INTO `article` VALUES ('12', '文章标题 - 11', '文章副标题 - 11', '# Markdown', '1', '1', '2018-02-08 15:32:00', '2018-02-08 15:32:00');
INSERT INTO `article` VALUES ('13', '文章标题 - 12', '文章副标题 - 12', '# Markdown', '1', '1', '2018-02-08 15:32:00', '2018-02-08 15:32:00');
INSERT INTO `article` VALUES ('14', '文章标题 - 13', '文章副标题 - 13', '# Markdown', '1', '1', '2018-02-08 15:32:00', '2018-02-08 15:32:00');
INSERT INTO `article` VALUES ('15', '文章标题 - 14', '文章副标题 - 14', '# Markdown', '1', '1', '2018-02-08 15:32:00', '2018-02-08 15:32:00');
INSERT INTO `article` VALUES ('16', '文章标题 - 15', '文章副标题 - 15', '# Markdown', '1', '1', '2018-02-08 15:32:00', '2018-02-08 15:32:00');
INSERT INTO `article` VALUES ('17', '文章标题 - 16', '文章副标题 - 16', '# Markdown', '1', '1', '2018-02-08 15:32:00', '2018-02-08 15:32:00');
INSERT INTO `article` VALUES ('18', '文章标题 - 17', '文章副标题 - 17', '# Markdown', '1', '1', '2018-02-08 15:32:00', '2018-02-08 15:32:00');
INSERT INTO `article` VALUES ('19', '文章标题 - 18', '文章副标题 - 18', '# Markdown', '1', '1', '2018-02-08 15:32:00', '2018-02-08 15:32:00');
INSERT INTO `article` VALUES ('20', '文章标题 - 19', '文章副标题 - 19', '# Markdown', '1', '1', '2018-02-08 15:32:00', '2018-02-08 15:32:00');
INSERT INTO `article` VALUES ('21', '文章标题 - 20', '文章副标题 - 20', '# Markdown', '1', '1', '2018-02-08 15:32:00', '2018-02-08 15:32:00');
INSERT INTO `article` VALUES ('24', '文章标题 - 23', '文章副标题 - 23', '# Markdown', '1', '1', '2018-02-08 15:32:01', '2018-02-18 15:17:31');
INSERT INTO `article` VALUES ('25', '文章标题 - 24', '文章副标题 - 24', 'MarkdownMarkdownMarkdownMarkdownMarkdownMarkdownMarkdownMarkdownMarkdownMarkdownMarkdownMarkdownMarkdownMarkdownMarkdownMarkdownMarkdownMarkdownMarkdownMarkdownMarkdown', '3', '1', '2018-02-08 15:32:01', '2018-02-27 22:34:42');
INSERT INTO `article` VALUES ('26', '文章标题 - 25', '文章副标题 - 25', '# Markdown', '1', '1', '2018-02-08 15:32:01', '2018-02-08 15:32:01');
INSERT INTO `article` VALUES ('27', '文章标题 - 26', '文章副标题 - 26', '# Markdown', '1', '1', '2018-02-08 15:32:01', '2018-02-08 15:32:01');
INSERT INTO `article` VALUES ('28', '文章标题 - 27', '文章副标题 - 27', '# Markdown', '1', '1', '2018-02-08 15:32:01', '2018-02-08 15:32:01');
INSERT INTO `article` VALUES ('29', '文章标题 - 28', '文章副标题 - 28', '# Markdown', '1', '1', '2018-02-08 15:32:01', '2018-02-08 15:32:01');
INSERT INTO `article` VALUES ('30', '文章标题 - 29', '文章副标题 - 29', '# Markdown', '1', '1', '2018-02-08 15:32:01', '2018-02-08 15:32:01');
INSERT INTO `article` VALUES ('31', '文章标题 - 30', '文章副标题 - 30', '# Markdown', '1', '1', '2018-02-08 15:32:01', '2018-02-08 15:32:01');
INSERT INTO `article` VALUES ('35', '新增文章测试', '文章副标题', '#### 文章内容\n`Markdown编辑器`', '1', '1', '2018-02-27 22:44:32', '2018-02-27 22:44:32');

-- ----------------------------
-- Table structure for classify
-- ----------------------------
DROP TABLE IF EXISTS `classify`;
CREATE TABLE `classify` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of classify
-- ----------------------------
INSERT INTO `classify` VALUES ('1', '未分类');
INSERT INTO `classify` VALUES ('3', '分类1');

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `article_id` int(11) DEFAULT NULL,
  `author_id` int(11) DEFAULT NULL,
  `previous_comment_id` int(11) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `article_id` (`article_id`),
  KEY `previous_comment_id` (`previous_comment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=130 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES ('11', '评论 - 11', '24', '1', null, '2018-02-13 13:30:19');
INSERT INTO `comment` VALUES ('16', '评论 - 16', '24', '1', null, '2018-02-13 13:30:19');
INSERT INTO `comment` VALUES ('17', '评论 - 17', '24', '1', null, '2018-02-13 13:30:19');
INSERT INTO `comment` VALUES ('18', '评论 - 18', '24', '1', null, '2018-02-13 13:30:19');
INSERT INTO `comment` VALUES ('21', '评论 - 21', '24', '1', null, '2018-02-13 13:30:19');
INSERT INTO `comment` VALUES ('22', '评论 - 22', '24', '1', null, '2018-02-13 13:30:19');
INSERT INTO `comment` VALUES ('23', '评论 - 23', '24', '1', null, '2018-02-13 13:30:19');
INSERT INTO `comment` VALUES ('24', '评论 - 24', '24', '1', null, '2018-02-13 13:30:19');
INSERT INTO `comment` VALUES ('25', '评论 - 25', '24', '1', null, '2018-02-13 13:30:19');
INSERT INTO `comment` VALUES ('26', '评论 - 26', '24', '1', null, '2018-02-13 13:30:19');
INSERT INTO `comment` VALUES ('27', '评论 - 27', '24', '1', null, '2018-02-13 13:30:19');
INSERT INTO `comment` VALUES ('28', '评论 - 28', '24', '1', null, '2018-02-13 13:30:19');
INSERT INTO `comment` VALUES ('29', '评论 - 29', '24', '1', null, '2018-02-13 13:30:19');
INSERT INTO `comment` VALUES ('33', '测试留言1', '1', '1', null, '2018-02-18 14:39:14');
INSERT INTO `comment` VALUES ('34', '测试留言2', '1', '1', null, '2018-02-18 14:39:14');
INSERT INTO `comment` VALUES ('35', '测试留言3', '1', '1', null, '2018-02-18 14:39:14');
INSERT INTO `comment` VALUES ('36', '测试留言4', '1', '1', null, '2018-02-18 14:39:14');
INSERT INTO `comment` VALUES ('37', '测试留言5', '1', '1', null, '2018-02-18 14:39:14');
INSERT INTO `comment` VALUES ('38', '测试留言6', '1', '1', null, '2018-02-18 14:39:14');
INSERT INTO `comment` VALUES ('39', '测试留言7', '1', '1', null, '2018-02-18 14:39:14');
INSERT INTO `comment` VALUES ('40', '测试留言8', '1', '1', null, '2018-02-18 14:39:14');
INSERT INTO `comment` VALUES ('41', '测试留言9', '1', '1', null, '2018-02-18 14:39:15');
INSERT INTO `comment` VALUES ('42', '测试留言10', '1', '1', null, '2018-02-18 14:39:15');
INSERT INTO `comment` VALUES ('43', '测试留言11', '1', '1', null, '2018-02-18 14:39:15');
INSERT INTO `comment` VALUES ('44', '测试留言12', '1', '1', null, '2018-02-18 14:39:15');
INSERT INTO `comment` VALUES ('45', '测试留言13', '1', '1', null, '2018-02-18 14:39:15');
INSERT INTO `comment` VALUES ('46', '测试留言14', '1', '1', null, '2018-02-18 14:39:15');
INSERT INTO `comment` VALUES ('47', '测试留言15', '1', '1', null, '2018-02-18 14:39:15');
INSERT INTO `comment` VALUES ('48', '测试留言16', '1', '1', null, '2018-02-18 14:39:15');
INSERT INTO `comment` VALUES ('49', '测试留言17', '1', '1', null, '2018-02-18 14:39:15');
INSERT INTO `comment` VALUES ('50', '测试留言18', '1', '1', null, '2018-02-18 14:39:15');
INSERT INTO `comment` VALUES ('51', '测试留言19', '1', '1', null, '2018-02-18 14:39:15');
INSERT INTO `comment` VALUES ('52', '测试留言20', '1', '1', null, '2018-02-18 14:39:15');
INSERT INTO `comment` VALUES ('53', '测试留言21', '1', '1', null, '2018-02-18 14:39:15');
INSERT INTO `comment` VALUES ('54', '测试留言22', '1', '1', null, '2018-02-18 14:39:15');
INSERT INTO `comment` VALUES ('55', '测试留言23', '1', '1', null, '2018-02-18 14:39:15');
INSERT INTO `comment` VALUES ('56', '测试留言24', '1', '1', null, '2018-02-18 14:39:15');
INSERT INTO `comment` VALUES ('57', '测试留言25', '1', '1', null, '2018-02-18 14:39:15');
INSERT INTO `comment` VALUES ('58', '测试留言26', '1', '1', null, '2018-02-18 14:39:15');
INSERT INTO `comment` VALUES ('59', '测试留言27', '1', '1', null, '2018-02-18 14:39:15');
INSERT INTO `comment` VALUES ('61', '测试留言29', '1', '1', null, '2018-02-18 14:39:15');
INSERT INTO `comment` VALUES ('62', '测试留言30', '1', '1', null, '2018-02-18 14:39:15');
INSERT INTO `comment` VALUES ('63', '测试留言31', '1', '1', null, '2018-02-18 14:39:15');
INSERT INTO `comment` VALUES ('64', '测试留言32', '1', '1', null, '2018-02-18 14:39:15');
INSERT INTO `comment` VALUES ('65', '测试留言33', '1', '1', null, '2018-02-18 14:39:15');
INSERT INTO `comment` VALUES ('66', '测试留言34', '1', '1', null, '2018-02-18 14:39:15');
INSERT INTO `comment` VALUES ('67', '测试留言35', '1', '1', null, '2018-02-18 14:39:15');
INSERT INTO `comment` VALUES ('68', '测试留言36', '1', '1', null, '2018-02-18 14:39:15');
INSERT INTO `comment` VALUES ('69', '测试留言37', '1', '1', null, '2018-02-18 14:39:15');
INSERT INTO `comment` VALUES ('70', '测试留言38', '1', '1', null, '2018-02-18 14:39:15');
INSERT INTO `comment` VALUES ('71', '测试留言39', '1', '1', null, '2018-02-18 14:39:15');
INSERT INTO `comment` VALUES ('72', '测试留言40', '1', '1', null, '2018-02-18 14:39:15');
INSERT INTO `comment` VALUES ('73', '测试留言41', '1', '1', null, '2018-02-18 14:39:15');
INSERT INTO `comment` VALUES ('74', '测试留言42', '1', '1', null, '2018-02-18 14:39:15');
INSERT INTO `comment` VALUES ('75', '测试留言43', '1', '1', null, '2018-02-18 14:39:15');
INSERT INTO `comment` VALUES ('76', '测试留言44', '1', '1', null, '2018-02-18 14:39:15');
INSERT INTO `comment` VALUES ('77', '测试留言45', '1', '1', null, '2018-02-18 14:39:15');
INSERT INTO `comment` VALUES ('78', '测试留言46', '1', '1', null, '2018-02-18 14:39:15');
INSERT INTO `comment` VALUES ('79', '测试留言47', '1', '1', null, '2018-02-18 14:39:15');
INSERT INTO `comment` VALUES ('80', '测试留言48', '1', '1', null, '2018-02-18 14:39:15');
INSERT INTO `comment` VALUES ('81', '测试留言49', '1', '1', null, '2018-02-18 14:39:15');
INSERT INTO `comment` VALUES ('82', '测试留言50', '1', '1', null, '2018-02-18 14:39:15');
INSERT INTO `comment` VALUES ('83', '测试留言51', '1', '1', null, '2018-02-18 14:39:15');
INSERT INTO `comment` VALUES ('84', '测试留言52', '1', '1', null, '2018-02-18 14:39:15');
INSERT INTO `comment` VALUES ('85', '测试留言53', '1', '1', null, '2018-02-18 14:39:15');
INSERT INTO `comment` VALUES ('86', '测试留言54', '1', '1', null, '2018-02-18 14:39:15');
INSERT INTO `comment` VALUES ('87', '测试留言55', '1', '1', null, '2018-02-18 14:39:15');
INSERT INTO `comment` VALUES ('88', '测试留言56', '1', '1', null, '2018-02-18 14:39:15');
INSERT INTO `comment` VALUES ('89', '测试留言57', '1', '1', null, '2018-02-18 14:39:15');
INSERT INTO `comment` VALUES ('90', '测试留言58', '1', '1', null, '2018-02-18 14:39:15');
INSERT INTO `comment` VALUES ('91', '测试留言59', '1', '1', null, '2018-02-18 14:39:15');
INSERT INTO `comment` VALUES ('92', '测试留言60', '1', '1', null, '2018-02-18 14:39:15');
INSERT INTO `comment` VALUES ('93', '1321', '1', '1', null, '2018-02-18 14:45:13');
INSERT INTO `comment` VALUES ('94', '132321', '1', '1', null, '2018-02-18 15:01:06');
INSERT INTO `comment` VALUES ('95', '312321', '1', '1', null, '2018-02-18 15:02:15');
INSERT INTO `comment` VALUES ('100', '123123312', '24', '1', null, '2018-02-18 15:04:00');
INSERT INTO `comment` VALUES ('101', '3123123123123', '24', '1', null, '2018-02-18 15:04:36');
INSERT INTO `comment` VALUES ('103', '12312321\n3123213\n3123123   12\n312', '1', '1', null, '2018-02-18 15:27:20');
INSERT INTO `comment` VALUES ('106', '12312312', '1', '1', null, '2018-02-18 15:36:32');
INSERT INTO `comment` VALUES ('107', '32131\n31hkhdsa\ndaj', '1', '1', null, '2018-02-18 15:36:38');
INSERT INTO `comment` VALUES ('108', 'a\na\na\na', '1', '1', null, '2018-02-18 15:52:07');
INSERT INTO `comment` VALUES ('112', '回复再回复', '24', '1', '111', '2018-02-23 14:18:26');
INSERT INTO `comment` VALUES ('114', '换行测试\n换行测试\n换行测试', '24', '1', null, '2018-02-23 14:24:54');
INSERT INTO `comment` VALUES ('115', '换行回复', '24', '1', '114', '2018-02-23 14:30:04');
INSERT INTO `comment` VALUES ('117', '12312312', '25', '1', null, '2018-02-23 14:40:52');
INSERT INTO `comment` VALUES ('118', 'qweqweqweq', '25', '1', null, '2018-02-23 14:41:00');
INSERT INTO `comment` VALUES ('119', '1231231', '25', '1', null, '2018-02-23 14:41:09');
INSERT INTO `comment` VALUES ('120', '123123123', '25', '1', null, '2018-02-23 14:41:12');
INSERT INTO `comment` VALUES ('124', '回复测试', '24', '1', '112', '2018-02-23 14:59:00');
INSERT INTO `comment` VALUES ('125', '回复测试', '1', '1', '108', '2018-02-23 15:31:55');
INSERT INTO `comment` VALUES ('126', '回复测试', '25', '1', '119', '2018-02-23 15:33:04');
INSERT INTO `comment` VALUES ('127', '123123', '25', '1', '126', '2018-02-23 15:35:22');
INSERT INTO `comment` VALUES ('128', '123213213', '1', '1', '108', '2018-02-23 15:35:31');
INSERT INTO `comment` VALUES ('129', '评论测试', '24', '1', null, '2018-02-27 16:18:08');

-- ----------------------------
-- Table structure for sys_log
-- ----------------------------
DROP TABLE IF EXISTS `sys_log`;
CREATE TABLE `sys_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL,
  `resource` varchar(255) DEFAULT NULL,
  `method` varchar(255) DEFAULT NULL,
  `params` longtext,
  `user_id` int(11) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_log
-- ----------------------------
INSERT INTO `sys_log` VALUES ('3', '删除', '文章', 'indi.zhuyst.skyblog.controller.ArticleController.deleteArticle()', '[33]', '1', '2018-02-27 22:03:45');
INSERT INTO `sys_log` VALUES ('4', '更新', '文章分类', 'indi.zhuyst.skyblog.controller.ClassifyController.updateClassify()', '[3,{\"id\":3,\"name\":\"分类1\"}]', '1', '2018-02-27 22:34:09');
INSERT INTO `sys_log` VALUES ('5', '更新', '文章', 'indi.zhuyst.skyblog.controller.ArticleController.updateArticle()', '[25,{\"id\":25,\"title\":\"文章标题 - 24\",\"subTitle\":\"文章副标题 - 24\",\"classifyId\":3,\"authorId\":1,\"createDate\":null,\"updateDate\":\"2018-02-27 22:34\",\"content\":\"MarkdownMarkdownMarkdownMarkdownMarkdownMarkdownMarkdownMarkdownMarkdownMarkdownMarkdownMarkdownMarkdownMarkdownMarkdownMarkdownMarkdownMarkdownMarkdownMarkdownMarkdown\"}]', '1', '2018-02-27 22:34:42');
INSERT INTO `sys_log` VALUES ('6', '新增', '文章', 'indi.zhuyst.skyblog.controller.ArticleController.insertArticle()', '[{\"id\":34,\"title\":\"新增文章测试\",\"subTitle\":\"文章副标题\",\"classifyId\":0,\"authorId\":1,\"createDate\":\"2018-02-27 22:38\",\"updateDate\":\"2018-02-27 22:38\",\"content\":\"#### 文章内容\\n`Markdown编辑器`\"}]', '1', '2018-02-27 22:38:02');
INSERT INTO `sys_log` VALUES ('7', '新增', '文章', 'indi.zhuyst.skyblog.controller.ArticleController.insertArticle()', '[{\"id\":35,\"title\":\"新增文章测试\",\"subTitle\":\"文章副标题\",\"classifyId\":1,\"authorId\":1,\"createDate\":\"2018-02-27 22:44\",\"updateDate\":\"2018-02-27 22:44\",\"content\":\"#### 文章内容\\n`Markdown编辑器`\"}]', '1', '2018-02-27 22:44:32');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `role` int(1) DEFAULT NULL,
  `status` int(1) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `username` (`username`),
  KEY `nickname` (`nickname`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'admin', '$2a$04$jwLLNF6YQxzEmU39QSc5J.PanHIjUgPBcBqrLDeMDdXcom2THr74a', '系统管理员', '1', '0', '2018-02-25 17:21:25');
INSERT INTO `user` VALUES ('2', 'zhuyst', '$2a$04$XVjp1cEekxXdkAx/ipVjcebE03/mXhQxhiRp.d48lIjiuCMd74gqG', '青云桑', '2', '0', '2018-02-25 17:21:25');
INSERT INTO `user` VALUES ('8', 'zhuyst123', '$2a$04$IGzXKzXW/nrnldQMGbX/6ODopFaaAmI7XWLF7t6Hfng8dyNlviLdq', '青云桑2', '3', '0', '2018-02-25 17:21:25');
INSERT INTO `user` VALUES ('9', 'username1', '$2a$04$BWc5xJ3oJB47H2J/KsOQFOdg2fYQQhp2JISrX8WmhVu6057OKSTgC', '用户1', '3', '0', '2018-02-25 17:21:25');
INSERT INTO `user` VALUES ('10', 'username2', '$2a$04$H6loxJH4NiJOiu9jUoWOW.RQW5kHKByHvm0P5dvrk8erTHTKm.ZsG', '用户2', '3', '0', '2018-02-25 17:21:25');
INSERT INTO `user` VALUES ('11', 'username3', '$2a$04$e63vuvIPVzu2NMWcwcBVi.Ygo7Zjiyg4apPI8G2jSlqAw2lJ2auQ6', '用户3', '3', '0', '2018-02-25 17:21:25');
INSERT INTO `user` VALUES ('12', 'username4', '$2a$04$xOzq0sn5wvFZYmVdtm/rJ..lsK4tNkc95Ooa46zqoZEhOo3glvNou', '用户4', '3', '0', '2018-02-25 17:21:25');
INSERT INTO `user` VALUES ('13', 'username5', '$2a$04$QenhGk6dRPDhDREgLex48OItBeo40KskHa8gKIlHZ2O1.1v69zCM.', '用户5', '3', '0', '2018-02-25 17:21:25');
INSERT INTO `user` VALUES ('14', 'username6', '$2a$04$tktdPZb3WwX43e94KdP4R.BS2I0hkKu4fpNwGmVGj2mdlMtNXMdce', '用户6', '3', '0', '2018-02-25 17:21:25');
INSERT INTO `user` VALUES ('15', 'username7', '$2a$04$vqtRpRSewwjARJ1YcqRrqOssAJuCc05v6gj/SlkFZIszRxsPvIAg2', '用户7', '3', '0', '2018-02-25 17:21:25');
INSERT INTO `user` VALUES ('16', 'username8', '$2a$04$j3DSfRJGRwWGwEfnaVViguP522iftN1XxOoDAPg2UUzrs0KyUpVJ.', '用户8', '3', '0', '2018-02-25 17:21:25');
INSERT INTO `user` VALUES ('17', 'username9', '$2a$04$7Xr3b3yPmdVACOURKtsOEuQqwaqk1V3KDdrHebwVxUahBnwKhdqPG', '用户9', '3', '0', '2018-02-25 17:21:25');
INSERT INTO `user` VALUES ('18', 'username10', '$2a$04$rdBZferzS8G1qJWSbmCDw.YX0Dr5roBP6LDrPE6P5IATNKu6OLT1m', '用户10', '3', '0', '2018-02-25 17:21:25');
INSERT INTO `user` VALUES ('19', 'username11', '$2a$04$HgjqSQFZLSP.5Gpog9R3ouJK/hhXFbVNS4BMwU2Shy27UmHBSJgL6', '用户11', '3', '0', '2018-02-25 17:21:25');
INSERT INTO `user` VALUES ('20', 'username12', '$2a$04$5IFu7vMrrAtCJ.J.So3wWu9eEEOeLhTvzy9XYa.tLlx6KVnriJHA6', '用户12', '3', '0', '2018-02-25 17:21:25');
INSERT INTO `user` VALUES ('21', 'username13', '$2a$04$fknw.lK4CpfGFgl1.59yWuNKkm1nbMllcPExjnFBKLz1Lm38hPQgS', '用户13', '3', '0', '2018-02-25 17:21:25');
INSERT INTO `user` VALUES ('22', 'username14', '$2a$04$Pd/JhEyoKUitPXhes6/L4.XSMy9QKkTxa.bxg5Ctx6X1rCoqrb6ay', '用户14', '3', '0', '2018-02-25 17:21:25');
INSERT INTO `user` VALUES ('23', 'username15', '$2a$04$V93UfT6GZkDwKvvUql8g9uqmjUcaZsmGoVKvKIb35BNnP/FMbOUUm', '用户15', '3', '0', '2018-02-25 17:21:25');
INSERT INTO `user` VALUES ('24', 'username16', '$2a$04$wbuP/4Dnbj12ILvq/2FxWOHyMGU4HbCW90X.WNrN8qPIbSzp3haUm', '用户16', '3', '0', '2018-02-25 17:21:25');
INSERT INTO `user` VALUES ('25', 'username17', '$2a$04$ZnUNW6auCBw0A5x/9lDGtu9tt1Mr0srmA7EE/VYPLFYt.MKu2CSKC', '用户17', '3', '0', '2018-02-25 17:21:25');
INSERT INTO `user` VALUES ('26', 'username18', '$2a$04$yakiX1nVPn2jj4Z9rr.6ye5m04QWK7ufa8KA2E5eAcRExnHVOD3dG', '用户18', '3', '0', '2018-02-25 17:21:25');
INSERT INTO `user` VALUES ('27', 'username19', '$2a$04$x0LKKqF6yW6DTFX2qeDdOeOuon4o8dVoP48bdLmZRsnmGiASvtvzm', '用户19', '3', '0', '2018-02-25 17:21:25');
INSERT INTO `user` VALUES ('28', 'username20', '$2a$04$QnbZmo3hGBFMpnjNbfy3m.f64hA9GTTpnFqMwyfH9HJdB8bLMTcGW', '用户20', '3', '0', '2018-02-25 17:21:25');
INSERT INTO `user` VALUES ('29', 'username21', '$2a$04$ssw4IZbiakjU7O0tCh6oNOboZNg2unPR1vB2X7LPFTObsVzNP1Cgy', '用户21', '3', '0', '2018-02-25 17:21:25');
INSERT INTO `user` VALUES ('30', 'username22', '$2a$04$N4UJVfoHVuQvgVshwjn6yuw6RQ3tHDf3TfrTffIg0Y700OpF89ZOS', '用户22', '3', '0', '2018-02-25 17:21:25');
INSERT INTO `user` VALUES ('31', 'username23', '$2a$04$XPCQb8I1bnGF18EZIbJph.EsGXztYVMOUUmq6kMAUlk6aoo1GSbk.', '用户23', '3', '0', '2018-02-25 17:21:25');
INSERT INTO `user` VALUES ('32', 'username24', '$2a$04$8Ghj/Rnqw3Jonvr0JUcQHO.BsIiRWC2kBP6rh9LXn0foCyJSMbTuK', '用户24', '3', '0', '2018-02-25 17:21:25');
INSERT INTO `user` VALUES ('33', 'username25', '$2a$04$yFAH0XcKkLhB96zDAN0hMuaUuplH1RuFIu48uC3JXGAvuM/ZVGT/i', '用户25', '3', '0', '2018-02-25 17:21:25');
INSERT INTO `user` VALUES ('34', 'username26', '$2a$04$RAUVvt97blloCudk1ExeR.38KALpCy.C4XFjxJQ0tvpVZC/jLWaX2', '用户26', '3', '0', '2018-02-25 17:21:25');
INSERT INTO `user` VALUES ('35', 'username27', '$2a$04$IV72YvigGdM/0Jt6jLFXoeQ01NGBQRtucfQvc0NnXbHnwye9TUA1O', '用户27', '3', '0', '2018-02-25 17:21:25');
INSERT INTO `user` VALUES ('36', 'username28', '$2a$04$Cd5mKWhu1hgwA0spRPvnEOXD9jHkLWJH8Qz0RDbxkF7UucCqFQYVO', '用户28', '3', '0', '2018-02-25 17:21:25');
INSERT INTO `user` VALUES ('37', 'username29', '$2a$04$QQvNu3OokbvVtg2oSoJKQulpSjAlSSjsoem5Z1nGpR.b62oJLz2bm', '用户29', '3', '0', '2018-02-25 17:21:25');
INSERT INTO `user` VALUES ('38', 'username30', '$2a$04$GuwCbWfoDQyleOzrI9l3wuBnLt4P31dhllQAw3zM4MOeus/9TJrPW', '用户30', '3', '0', '2018-02-25 17:21:25');
