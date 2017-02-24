name := """amz_defend"""

version := "0.0.1"

scalaVersion := "2.11.7"

checksums in update := Nil

resolvers += "oschina" at "http://maven.oschina.net/content/groups/public/"

libraryDependencies ++= Seq(
    ws,
    jdbc,
    "mysql" % "mysql-connector-java" % "5.1.24",
    "com.github.tototoshi" %% "play-json4s-native" % "0.4.2",
    "com.github.tototoshi" %% "play-json4s-test-native" % "0.4.2" % "test",
    "com.typesafe.play" %% "play-mailer" % "4.0.0"
)

lazy val root = (project in file("."))
    .enablePlugins(PlayScala)
/*
lazy val root = (project in file("."))
    .enablePlugins(PlayScala)
    .aggregate(saasResponseParser, elementCalculator)
    .dependsOn(saasResponseParser, elementCalculator)

lazy val saasResponseParser = project in file("./modules/saas-response-parser/")
lazy val elementCalculator = project in file("./modules/element-calculator/")
fork in run := true

EclipseKeys.withSource := true
*/