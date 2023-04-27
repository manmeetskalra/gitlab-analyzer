FROM openjdk

ADD ./backend/build/libs/gitlabanalyzer.jar /app/gitlabanalyzer.jar
ADD ./frontend/build /app/public

EXPOSE 8080
EXPOSE 8000

ENTRYPOINT java -cp "/app/*:/app" -Xdebug -Xrunjdwp:transport=dt_socket,address=8000,server=y,suspend=n,address=*:8000 org.springframework.boot.loader.JarLauncher