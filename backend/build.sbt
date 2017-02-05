name := """search-explorer"""

version := "0.0.1-SNAPSHOT"

scalaVersion := "2.11.7"

scalacOptions in Test ++= Seq("-Yrangepos")

resolvers += "ebaycentral releases" at "http://ebaycentral.glb.corp.ebay.com/content/repositories/releases"
resolvers += "ebaycentral snapshots" at "http://ebaycentral.glb.corp.ebay.com/content/repositories/snapshots"
resolvers += "spray repo" at "http://repo.spray.io"
resolvers += "ConJars" at "http://conjars.org/repo"
resolvers += "Secured Central Repository" at "https://repo1.maven.org/maven2"
resolvers += "CassiniJavaAPI" at "http://ebaycentral.qa.ebay.com/content/repositories/releases/com/ebay/cassini/query/"
resolvers += "ebay 3rdparty" at "http://nxrepository.corp.ebay.com/nexus/content/repositories/thirdparty/"

checksums in update := Nil

libraryDependencies ++= Seq(
    ws,
    "org.json4s" %% "json4s-native" % "3.3.0",
    "com.ebay.raptor.search" % "UniversalSearchService" % "2.2.151401-RELEASE" excludeAll ExclusionRule(organization = "com.ebay.raptor.core"),
    "com.ebay.raptor.search" % "SearchService" % "2.2.151401-RELEASE" excludeAll ExclusionRule(organization = "com.ebay.raptor.core"),
    "org.specs2" %% "specs2-core" % "3.6.5" % "test",
    "org.specs2" %% "specs2-junit" % "3.6.5" % "test",
    "com.typesafe.akka" %% "akka-testkit" % "2.3.4" % "test",
    "com.ebay.cassini.query" % "query-impl" % "3.4.3-RELEASE",
    "com.ebay.cassini.query" % "query-plugin" % "3.4.3-RELEASE",
    "com.ebay.cassini.tokenizer" % "tokenizer-api" % "2.6.10-RELEASE"
)

lazy val root = (project in file("."))
    .enablePlugins(PlayScala)
    .aggregate(saasResponseParser, elementCalculator)
    .dependsOn(saasResponseParser, elementCalculator)

lazy val saasResponseParser = project in file("./modules/saas-response-parser/")
lazy val elementCalculator = project in file("./modules/element-calculator/")
fork in run := true

EclipseKeys.withSource := true
