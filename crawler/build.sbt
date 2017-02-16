name := "crawler"

version := "1.0"

scalaVersion := "2.11.8"

libraryDependencies ++= Seq(
    "com.typesafe.akka" %% "akka-actor" % "2.4.0",
    "org.jsoup" % "jsoup" % "1.8+",
    "mysql" % "mysql-connector-java" % "5.1.24"
)