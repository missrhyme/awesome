package controllers

import controllers.response.{Response, LoginData}
import org.json4s.DefaultFormats
import play.api.mvc._
import play.api.db._
import play.api.Play.current
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future
import org.json4s.native.Serialization.write
import views._

/**
  * Advanced structured data based-UI for eBay
  */
object Application extends Controller {
    implicit val formats = DefaultFormats
    /******************  Action begin  ******************/
    def index = Action {
        Ok(html.template("test1", "test2"))
    }

    def login = Action.async(parse.json) { implicit request =>
        val username = (request.body \ "username").as[String]
        val password = (request.body \ "password").as[String]
        Future{
            DB.withConnection { conn =>
                val sql = "select count(*) as cnt from users where username=? and password=?"
                val state = conn.prepareStatement(sql)
                state.setString(1, username)
                state.setString(2, password)
                val rs = state.executeQuery()
                rs.next()
                val count = rs.getInt("cnt")
                if (count == 1) {
                    val resp = Response("200", "登陆成功", LoginData(true))
                    Ok(write(resp))
                }
                else{
                    val resp = Response("102", "参数错误", LoginData(false))
                    Ok(write(resp))
                }
            }
        }
    }

    def register = Action.async(parse.json) { implicit request =>
        val username = (request.body \ "username").as[String]
        val captcha = (request.body \ "captcha").as[String]
        val password = (request.body \ "password").as[String]
        Future{
            DB.withConnection { conn =>
                val sql = "insert into users values (NULL, ?, ?)"
                val state = conn.prepareStatement(sql)
                state.setString(1, username)
                state.setString(2, password)
                state.executeUpdate()
                val resp = Response("200", "注册成功", LoginData(true))
                Ok(write(resp))
            }
        }
    }

    def resetpassword = Action.async(parse.json) { implicit request =>
        val username = (request.body \ "username").as[String]
        val captcha = (request.body \ "captcha").as[String]
        val password = (request.body \ "password").as[String]
        Future{
            Ok("test")
        }
    }

    def captcha(mobile: String) = Action.async {
        Future{
            Ok("test")
        }
    }
    /******************  Action end  ******************/

}
