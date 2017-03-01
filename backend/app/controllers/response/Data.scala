package controllers.response

/**
  * Created by yanxue on 18/02/2017.
  */

// login
case class Login(username: String, password: String)
case class Valid(username: String, password: String, captcha: String)
// shop
case class ShopAdd(name: String, account: String, `type`: Int, access: String, secret: String, seller: String, marketplace: String)
case class ShopUpdate(id: Int, name: String, status: Int, account: String, `type`: Int, access: String, secret: String, seller: String, marketplace: String)
case class ShopRemove(id: Int)
case class ShopItem(id: Int, name: String, status: Int, token: Boolean)
// template
case class MailAdd(name: String, content: String)
case class SMSAdd(name: String, content: String)


