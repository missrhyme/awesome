package controllers

import javax.inject._
import com.github.tototoshi.play2.json4s.native.Json4s
import controllers.response._
import play.api.libs.mailer.Email
import play.api.mvc._
import play.api.db._
import play.api.Play.current
import scala.collection.mutable.ListBuffer
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future
import views._
import org.json4s._
import org.json4s.native.JsonMethods._
import org.json4s.native.JsonMethods.{parse => parseJson, render => renderJson}
import org.json4s.JsonDSL._
import play.api.libs.mailer._

import scala.util.Random

/**
  * Advanced structured data based-UI for eBay
  */
class Application @Inject()(mailClient: MailerClient) extends Controller with Json4s {
    implicit val formats = DefaultFormats
    val CAPTCHA_SIZE = 6

    /** ****************  Login begin  ******************/
    def index = Action { request =>
        Ok(html.template("test1", "test2")).withSession(request.session)
    }

    def login = Action.async(json) { implicit request =>
        val login = request.body.extract[Login]
        Future {
            DB.withConnection { conn =>
                var sql = "select count(*) as cnt from users where username=? and password=?"
                var state = conn.prepareStatement(sql)
                state.setString(1, login.username)
                state.setString(2, login.password)
                var rs = state.executeQuery()
                rs.next()
                if (rs.getInt("cnt") == 1) {
                    rs.next()
                    val resp =
                        ("status" -> 200) ~
                            ("data" ->
                                ("success" -> true)) ~
                            ("msg" -> "登陆成功")
                    sql = "select * from users where username=? and password=?"
                    state = conn.prepareStatement(sql)
                    rs = state.executeQuery()
                    rs.next()
                    Ok(compact(renderJson(resp)))
                        .withSession((request.session +
                            ("login_name" -> login.username)) +
                            ("login_id" -> rs.getInt("user_id").toString))
                }
                else {
                    val resp =
                        ("status" -> 200) ~
                            ("data" ->
                                ("success" -> false)) ~
                            ("msg" -> "登陆失败")
                    Ok(compact(renderJson(resp))).withSession(request.session)
                }
            }
        }
    }

    def register = Action.async(json) { implicit request =>
        val valid = request.body.extract[Valid]
        Future {
            DB.withConnection { conn =>
                val sql = "insert into users values (NULL, ?, ?)"
                val state = conn.prepareStatement(sql)
                state.setString(1, valid.username)
                state.setString(2, valid.password)
                state.executeUpdate()
                val resp =
                    ("status" -> 200) ~
                        ("data" ->
                            ("success" -> true)) ~
                        ("msg" -> "注册成功")
                Ok(compact(renderJson(resp))).withSession(request.session)
            }
        }
    }

    def resetpassword = Action.async(json) { implicit request =>
        val valid = request.body.extract[Valid]
        Future {
            val resp =
                ("status" -> 200) ~
                    ("data" ->
                        ("success" -> true)) ~
                    ("msg" -> "注册成功")
            Ok(compact(renderJson(resp))).withSession(request.session)
        }
    }

    def captcha(mobile: String) = Action.async { request =>
        Random.setSeed(System.currentTimeMillis())
        Future {
            val number = (Random.nextDouble() * scala.math.pow(10, CAPTCHA_SIZE)).toInt
            val resp =
                ("status" -> 200) ~
                    ("data" ->
                        ("success" -> true)) ~
                    ("msg" -> "注册成功")
            Ok(compact(renderJson(resp))).withSession(request.session)
        }
    }

    /** ****************  Shop begin  ******************/

    def shopList(page: Int) = Action.async { implicit request =>
        //val loginName = request.session.get("login_id").head

        // 需要增加页面分页参数 暂时写死 begin
        val data = Map("page" -> page, "total" -> 10, "pagesize" -> 10)
        // 暂时写死 end

        val loginId = 1
        Future {
            DB.withConnection { conn =>
                val result = ListBuffer.empty[ShopItem]
                val sql = "select * from shop where user_id=? order by shop_id"
                val state = conn.prepareStatement(sql)
                state.setInt(1, loginId)
                val rs = state.executeQuery()
                while (rs.next()) {
                    result += ShopItem(rs.getInt("shop_id"), rs.getString("name"), rs.getInt("status"), true)
                }
                val resp =
                    result.toList.map { shop =>
                        ("id" -> shop.id) ~
                            ("name" -> shop.name) ~
                            ("status" -> shop.status) ~
                            ("token" -> shop.token)
                    }
                val list = compact(renderJson(resp))
                Ok(html.shop.shop(list, data))
            }
        }
    }

    def shopAdd = Action.async(json) { implicit request =>
        val shop = request.body.extract[ShopAdd]
        val initStatus = 1
        //val loginName = request.session.get("login_id").head
        val loginId = 1
        Future {
            DB.withConnection { conn =>
                var sql = "select count(*) as cnt from shop where name=? and user_id=?"
                var state = conn.prepareStatement(sql)
                state.setString(1, shop.name)
                state.setInt(2, loginId)
                val rs = state.executeQuery()
                rs.next()
                val count = rs.getInt("cnt")
                if (count > 0) {
                    val resp =
                        ("status" -> 200) ~
                            ("data" ->
                                ("success" -> false)) ~
                            ("msg" -> "店铺重复")
                    Ok(compact(renderJson(resp))).withSession(request.session)
                } else {
                    sql = "insert into shop values (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
                    state = conn.prepareStatement(sql)
                    state.setInt(1, loginId)
                    state.setString(2, shop.name)
                    state.setString(3, shop.account)
                    state.setString(4, shop.access)
                    state.setString(5, shop.secret)
                    state.setString(6, shop.seller)
                    state.setString(7, shop.marketplace)
                    state.setInt(8, shop.`type`)
                    state.setInt(9, initStatus)
                    state.executeUpdate()
                    sql = "select * from shop where name=? and user_id=?"
                    state = conn.prepareStatement(sql)
                    state.setString(1, shop.name)
                    state.setInt(2, loginId)
                    val rs = state.executeQuery()
                    rs.next()
                    val shopId = rs.getInt("shop_id")
                    val resp =
                        ("status" -> 200) ~
                            ("data" ->
                                ("success" -> true) ~
                                    ("detail" ->
                                        ("id" -> shopId) ~
                                            ("name" -> shop.name) ~
                                            ("status" -> initStatus) ~
                                            ("token" -> true) ~
                                            ("account" -> shop.account) ~
                                            ("type" -> shop.`type`) ~
                                            ("access" -> shop.access) ~
                                            ("secret" -> shop.secret) ~
                                            ("seller" -> shop.seller) ~
                                            ("marketplace" -> shop.marketplace)
                                        )) ~
                            ("msg" -> "上传成功")
                    Ok(compact(renderJson(resp))).withSession(request.session)
                }
            }
        }
    }

    def shopRemove = Action.async(json) { implicit request =>
        val shop = request.body.extract[ShopRemove]
        //val loginName = request.session.get("login_id").head
        val loginId = 1
        Future {
            DB.withConnection { conn =>
                var sql = "select count(*) as cnt from shop where shop_id=? and user_id=?"
                var state = conn.prepareStatement(sql)
                state.setInt(1, shop.id)
                state.setInt(2, loginId)
                val rs = state.executeQuery()
                rs.next()
                val count = rs.getInt("cnt")
                if (count == 1) {
                    sql = "delete from shop where shop_id=?"
                    state = conn.prepareStatement(sql)
                    state.setInt(1, shop.id)
                    state.executeUpdate()
                    val resp =
                        ("status" -> 200) ~
                            ("data" ->
                                ("success" -> true)) ~
                            ("msg" -> "删除成功")
                    Ok(compact(renderJson(resp))).withSession(request.session)
                } else {
                    val resp =
                        ("status" -> 200) ~
                            ("data" ->
                                ("success" -> false)) ~
                            ("msg" -> "删除失败")
                    Ok(compact(renderJson(resp))).withSession(request.session)
                }
            }
        }
    }

    def shopDetail(id: Int) = Action.async { request =>
        //val loginName = request.session.get("login_id").head
        val loginId = 1
        Future {
            DB.withConnection { conn =>
                var sql = "select count(*) as cnt from shop where shop_id=? and user_id=?"
                var state = conn.prepareStatement(sql)
                state.setInt(1, id)
                state.setInt(2, loginId)
                val rs = state.executeQuery()
                rs.next()
                if (rs.getInt("cnt") == 1) {
                    sql = "select * from shop where shop_id=? and user_id=?"
                    state = conn.prepareStatement(sql)
                    state.setInt(1, id)
                    state.setInt(2, loginId)
                    val rs = state.executeQuery()
                    rs.next()
                    val resp =
                        ("status" -> 200) ~
                            ("data" ->
                                ("success" -> true) ~
                                    ("detail" ->
                                        ("id" -> rs.getInt("shop_id")) ~
                                            ("name" -> rs.getString("name")) ~
                                            ("status" -> rs.getInt("status")) ~
                                            ("token" -> true) ~
                                            ("account" -> rs.getString("account")) ~
                                            ("type" -> rs.getInt("type")) ~
                                            ("access" -> rs.getString("access")) ~
                                            ("secret" -> rs.getString("secret")) ~
                                            ("seller" -> rs.getString("seller")) ~
                                            ("marketplace" -> rs.getString("marketplace"))
                                        )) ~
                            ("msg" -> "查询成功")
                    Ok(compact(renderJson(resp))).withSession(request.session)
                } else {
                    val resp =
                        ("status" -> 200) ~
                            ("data" ->
                                ("success" -> false)) ~
                            ("msg" -> "查询失败")
                    Ok(compact(renderJson(resp))).withSession(request.session)
                }
            }
        }
    }

    def shopUpdate = Action.async(json) { implicit request =>
        val shop = request.body.extract[ShopUpdate]
        //val loginName = request.session.get("login_id").head
        val loginId = 1
        Future {
            DB.withConnection { conn =>
                var sql = "select count(*) as cnt from shop where shop_id=? and user_id=?"
                var state = conn.prepareStatement(sql)
                state.setInt(1, shop.id)
                state.setInt(2, loginId)
                val rs = state.executeQuery()
                rs.next()
                val count = rs.getInt("cnt")
                if (count == 1) {
                    sql = "update shop set name=?, status=?, type=?, access=?, secret=?, seller=?, marketplace=? where shop_id=?"
                    state = conn.prepareStatement(sql)
                    state.setString(1, shop.name)
                    state.setInt(2, shop.status)
                    state.setInt(3, shop.`type`)
                    state.setString(4, shop.access)
                    state.setString(5, shop.secret)
                    state.setString(6, shop.seller)
                    state.setString(7, shop.marketplace)
                    state.setInt(8, shop.id)
                    state.executeUpdate()
                    val resp =
                        ("status" -> 200) ~
                            ("data" ->
                                ("success" -> true) ~
                                    ("detail" ->
                                        ("id" -> shop.id) ~
                                            ("name" -> shop.name) ~
                                            ("status" -> shop.status) ~
                                            ("token" -> true) ~
                                            ("account" -> shop.account) ~
                                            ("type" -> shop.`type`) ~
                                            ("access" -> shop.access) ~
                                            ("secret" -> shop.secret) ~
                                            ("seller" -> shop.seller) ~
                                            ("marketplace" -> shop.marketplace)
                                        )) ~
                            ("msg" -> "更新成功")
                    Ok(compact(renderJson(resp))).withSession(request.session)
                } else {
                    val resp =
                        ("status" -> 200) ~
                            ("data" ->
                                ("success" -> false)) ~
                            ("msg" -> "更新失败")
                    Ok(compact(renderJson(resp))).withSession(request.session)
                }
            }
        }
    }

    def shopStop = Action.async(json) { implicit request =>
        val shop = request.body.extract[ShopRemove]
        //val loginName = request.session.get("login_id").head
        val loginId = 1
        val stopStatus = 0
        Future {
            DB.withConnection { conn =>
                var sql = "select count(*) as cnt from shop where shop_id=? and user_id=?"
                var state = conn.prepareStatement(sql)
                state.setInt(1, shop.id)
                state.setInt(2, loginId)
                val rs = state.executeQuery()
                rs.next()
                val count = rs.getInt("cnt")
                if (count == 1) {
                    sql = "update shop set status=? where shop_id=?"
                    state = conn.prepareStatement(sql)
                    state.setInt(1, stopStatus)
                    state.setInt(2, shop.id)
                    state.executeUpdate()
                    val resp =
                        ("status" -> 200) ~
                            ("data" ->
                                ("success" -> true)) ~
                            ("msg" -> "停用成功")
                    Ok(compact(renderJson(resp))).withSession(request.session)
                } else {
                    val resp =
                        ("status" -> 200) ~
                            ("data" ->
                                ("success" -> false)) ~
                            ("msg" -> "停用失败")
                    Ok(compact(renderJson(resp))).withSession(request.session)
                }
            }
        }
    }

    def shopRestart = Action.async(json) { implicit request =>
        val shop = request.body.extract[ShopRemove]
        //val loginName = request.session.get("login_id").head
        val loginId = 1
        val stopStatus = 1
        Future {
            DB.withConnection { conn =>
                var sql = "select count(*) as cnt from shop where shop_id=? and user_id=?"
                var state = conn.prepareStatement(sql)
                state.setInt(1, shop.id)
                state.setInt(2, loginId)
                val rs = state.executeQuery()
                rs.next()
                val count = rs.getInt("cnt")
                if (count == 1) {
                    sql = "update shop set status=? where shop_id=?"
                    state = conn.prepareStatement(sql)
                    state.setInt(1, stopStatus)
                    state.setInt(2, shop.id)
                    state.executeUpdate()
                    val resp =
                        ("status" -> 200) ~
                            ("data" ->
                                ("success" -> true)) ~
                            ("msg" -> "停用成功")
                    Ok(compact(renderJson(resp))).withSession(request.session)
                } else {
                    val resp =
                        ("status" -> 200) ~
                            ("data" ->
                                ("success" -> false)) ~
                            ("msg" -> "停用失败")
                    Ok(compact(renderJson(resp))).withSession(request.session)
                }
            }
        }
    }
    /** ****************  Shop end  ******************/

    /** ****************  Mail begin  ******************/

    def mailTemplate = Action { request =>
        Ok(html.tmpl.mail("test1", "test2"))
    }

    def smsTemplate = Action { request =>
        Ok(html.tmpl.sms("test1", "test2"))
    }


    def mailAdd = Action.async(json) { implicit request =>
        val mail = request.body.extract[MailAdd]
        //val loginName = request.session.get("login_id").head
        val loginId = 1
        Future {
            DB.withConnection { conn =>
                var sql = "select count(*) as cnt from mail_template where name=? and user_id=?"
                var state = conn.prepareStatement(sql)
                state.setString(1, mail.name)
                state.setInt(2, loginId)
                val rs = state.executeQuery()
                rs.next()
                val count = rs.getInt("cnt")
                if (count == 0) {
                    sql = "insert into mail_template values (NULL, ?, ?, ?)"
                    state = conn.prepareStatement(sql)
                    state.setInt(1, loginId)
                    state.setString(2, mail.name)
                    state.setString(3, mail.content)
                    state.executeUpdate()
                    sql = "select * from mail_template where name=? and user_id=?"
                    state = conn.prepareStatement(sql)
                    state.setString(1, mail.name)
                    state.setInt(2, loginId)
                    val rs = state.executeQuery()
                    rs.next()
                    val mailId = rs.getInt("mail_id")
                    val resp =
                        ("status" -> 200) ~
                            ("data" ->
                                ("success" -> true) ~
                                    ("detail" ->
                                        ("id" -> mailId) ~
                                            ("name" -> mail.name) ~
                                            ("content" -> mail.content)
                                        )) ~
                            ("msg" -> "添加成功")
                    Ok(compact(renderJson(resp))).withSession(request.session)
                } else {
                    val resp =
                        ("status" -> 200) ~
                            ("data" ->
                                ("success" -> false)) ~
                            ("msg" -> "添加失败")
                    Ok(compact(renderJson(resp))).withSession(request.session)
                }
            }
        }
    }

    def smsAdd = Action.async(json) { implicit request =>
        val sms = request.body.extract[SMSAdd]
        //val loginName = request.session.get("login_id").head
        val loginId = 1
        Future {
            DB.withConnection { conn =>
                var sql = "select count(*) as cnt from sms_template where name=? and user_id=?"
                var state = conn.prepareStatement(sql)
                state.setString(1, sms.name)
                state.setInt(2, loginId)
                val rs = state.executeQuery()
                rs.next()
                val count = rs.getInt("cnt")
                if (count == 0) {
                    sql = "insert into sms_template values (NULL, ?, ?, ?)"
                    state = conn.prepareStatement(sql)
                    state.setInt(1, loginId)
                    state.setString(2, sms.name)
                    state.setString(3, sms.content)
                    state.executeUpdate()
                    sql = "select * from sms_template where name=? and user_id=?"
                    state = conn.prepareStatement(sql)
                    state.setString(1, sms.name)
                    state.setInt(2, loginId)
                    val rs = state.executeQuery()
                    rs.next()
                    val smsId = rs.getInt("sms_id")
                    val resp =
                        ("status" -> 200) ~
                            ("data" ->
                                ("success" -> true) ~
                                    ("detail" ->
                                        ("id" -> smsId) ~
                                            ("name" -> sms.name) ~
                                            ("content" -> sms.content)
                                        )) ~
                            ("msg" -> "添加成功")
                    Ok(compact(renderJson(resp))).withSession(request.session)
                } else {
                    val resp =
                        ("status" -> 200) ~
                            ("data" ->
                                ("success" -> false)) ~
                            ("msg" -> "添加失败")
                    Ok(compact(renderJson(resp))).withSession(request.session)
                }
            }
        }
    }

    def test = Action.async(json) { implicit request =>

        import scala.collection.mutable

        def sendMail(map: mutable.Map[String, String], content: String) = {

            var template = content
            map.foreach{ case (label, value) =>
                template = template.replace(label, value)
            }
            val email = Email(
                "Simple email",
                "test1 FROM <prodigious@163.com>",
                Seq("test2 TO <prodigious@163.com>"),
                // sends text, HTML or both...
                bodyText = Some(template)
            )
            mailClient.send(email)
        }

        val mail = request.body.extract[SendMail]
        //val loginName = request.session.get("login_id").head
        val loginId = 1
        val map = mutable.Map.empty[String, String]
        Future {
            DB.withConnection { conn =>
                var sql = "select * from buybox_scrap where scrap_id=?"
                var state = conn.prepareStatement(sql)
                state.setInt(1, mail.scrap_id)
                var rs = state.executeQuery()
                rs.next()
                map += ("{seller}" -> rs.getString("seller"))
                sql = "select * from users where user_id=?"
                state = conn.prepareStatement(sql)
                state.setInt(1, mail.user_id)
                rs = state.executeQuery()
                rs.next()
                map += ("{buyer}" -> rs.getString("username"))
                sql = "select * from mail_template where mail_id=?"
                state = conn.prepareStatement(sql)
                state.setInt(1, mail.template_id)
                rs = state.executeQuery()
                rs.next()
                val template = rs.getString("content")
                sendMail(map, template)
                val resp =
                    ("status" -> 200) ~
                        ("data" ->
                            ("success" -> true)) ~
                        ("msg" -> "发送成功")
                Ok(compact(renderJson(resp))).withSession(request.session)
            }
        }


    }


}
