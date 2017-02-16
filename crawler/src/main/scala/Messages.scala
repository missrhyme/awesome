/**
  * Created by yanxue on 09/02/2017.
  */

case class Start(items: List[String])
case class Scrap(items: List[String])
case class Buybox(item_id: String, price: Double, rank: Int, seller: String)
case class Index(buyboxes: List[Buybox])
