#基础镜像为centos
FROM centos

#镜像维护人
MAINTAINER 'shaozy@spdb.com.cn'

# 安装vim
RUN yum -y install vim

RUN mkdir /usr/visitors
#拷贝并解压至/usr/local
ADD apache-tomcat-8.5.33.tar.gz /usr/visitors

ADD jdk-8u181-linux-x64.tar.gz /usr/visitors

WORKDIR /usr/visitors/apache-tomcat-8.5.33/webapps

RUN mkdir vue-practice

COPY vue-practice/dist/css /usr/visitors/apache-tomcat-8.5.33/webapps/vue-practice/css
COPY vue-practice/dist/fonts /usr/visitors/apache-tomcat-8.5.33/webapps/vue-practice/fonts
COPY vue-practice/dist/img /usr/visitors/apache-tomcat-8.5.33/webapps/vue-practice/img
COPY vue-practice/dist/js /usr/visitors/apache-tomcat-8.5.33/webapps/vue-practice/js
COPY vue-practice/dist/favicon.ico /usr/visitors/apache-tomcat-8.5.33/webapps/vue-practice/
COPY vue-practice/dist/index.html /usr/visitors/apache-tomcat-8.5.33/webapps/vue-practice/


#对外暴露端口8080
EXPOSE 8080

#设置环境变量
ENV JAVA_HOME /usr/visitors/jdk1.8.0_181

ENV CLASSPATH $JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar

ENV MYPATH /home/visitors

ENV CATALINA_HOME /usr/visitors/apache-tomcat-8.5.33

ENV CATALINA_BIN $CATALINA_HOME/bin

ENV PATH $JAVA_HOME/bin:$PATH:$CATALINA_BIN

#设置工作目录
WORKDIR $MYPATH

CMD java -version && /usr/visitors/apache-tomcat-8.5.33/bin/catalina.sh run && tail -f /usr/visitors/apache-tomcat-8.5.33/bin/logs/catalina.out

