package controllers.response

import org.json4s._
import org.json4s.JsonAST
import org.json4s.JsonDSL._

/**
  * Created by yanxue on 18/02/2017.
  */
case class Response(val status: String, val msg: String, data: Data)
