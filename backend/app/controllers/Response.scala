package controllers

import org.json4s._
import org.json4s.JsonDSL._

/**
  * Created by yanxue on 18/02/2017.
  */
object Response {
    val resp200 =
        ("status" -> "200") ~ ("data" -> ("success" -> true)) ~ ("msg" -> "登陆成功")

}
