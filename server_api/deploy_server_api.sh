# 应用名，用来查找进程
APP_NAME=skyblog

# 引用工程路径
PROJECT_PATH=/data/SkyBlog/server_api/

# 打包JAR的路径
PROJECT_JAR_PATH=${PROJECT_PATH}/target/skyblog-1.0.0-RELEASE.jar

# 获取应用的PID
PID=$(ps aux | grep $APP_NAME | grep -v grep | awk '{printf $2}')

# 更新工程
git pull

# 构建工程
sh mvn clean package -f $PROJECT_PATH

# 如果应用正在运行，则强制终止进程
if ["$PID" == ""];then
	kill $PID
fi

# 启动应用
nohup java -jar $PROJECT_JAR_PATH &