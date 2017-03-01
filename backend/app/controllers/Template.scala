package controllers

/**
  * Created by yanxue on 01/03/2017.
  */
object Template {
    val buyer = Template("{buyer}", "买家姓名")
    val seller = Template("{seller}", "卖家姓名")

    val list = List(buyer, seller)
}

case class Template(value: String, label: String)