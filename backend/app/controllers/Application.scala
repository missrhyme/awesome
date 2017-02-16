package controllers

import play.api.mvc._
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

/**
  * Advanced structured data based-UI for eBay
  */
object Application extends Controller
{
    /******************  Action begin  ******************/
    def index = Action {
        Ok("Hi!")
    }

    def login = Action.async(parse.json) { implicit request =>
        val username = (request.body \ "username").as[String]
        val password = (request.body \ "password").as[String]
        Future{
            Ok("test")
        }
    }

    def register = Action.async(parse.json) { implicit request =>
        val username = (request.body \ "username").as[String]
        val captcha = (request.body \ "captcha").as[String]
        val password = (request.body \ "password").as[String]
        Future{
            Ok("test")
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
