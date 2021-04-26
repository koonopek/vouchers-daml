FROM openjdk:14-jdk-alpine
RUN addgroup -S spring && adduser -S spring -G spring && mkdir -p /data && chown -R spring /data
USER spring:spring
COPY target/auth-0.1.0-SNAPSHOT-standalone.jar app.jar
COPY resources/ACL resources/ACL
ENTRYPOINT ["java", "-jar", "/app.jar"]