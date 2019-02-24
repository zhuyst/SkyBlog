FROM maven:3.6.0-jdk-8-alpine AS build

VOLUME /root/.m2

ADD . .

RUN mvn clean package -Dmaven.test.skip=true

FROM openjdk:8-jdk-alpine

VOLUME /tmp

COPY --from=build target/skyblog-1.0.0-RELEASE.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-Duser.timezone=GMT+08","-jar","/app.jar","--spring.profiles.active=docker"]
