import akka.actor.{ActorRef, Actor}
import akka.actor.Actor.Receive
import org.jsoup.Jsoup
import scala.collection.JavaConverters._

/**
  * Created by yanxue on 11/02/2017.
  */
class Crawler(id: Int, indexer: ActorRef) extends Actor {
    def parse(item: String) = {
        val url = s"https://www.amazon.com/gp/offer-listing/$item/ref=olp_page_1"
        val response = Jsoup
            .connect(url)
            .ignoreContentType(true)
            .userAgent("Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.1")
            .timeout(5000)
            .execute()

        response.contentType match {
            case contentType if contentType.startsWith("text/html") =>
                val doc = response.parse()
                //doc.toString.contains("https://developer.amazonservices.com/ref=rm_c_sv")
                val prices = doc.select(".olpOfferPrice").asScala.map { elem =>
                    elem.text().trim.drop(1).toDouble
                }.toList
                val sellers = doc.select(".olpSellerName").asScala.map { elem =>
                    if (elem.text().isEmpty)
                        "Amazon"
                    else
                        elem.text()
                }.toList
                val items = (1 to prices.size).map{ rank =>
                    Buybox(item, prices(rank - 1), rank, sellers(rank - 1))
                }.toList
                indexer ! Index(items)


            case _ =>
        }
    }

    override def receive: Receive = {
        case Scrap(items: List[String]) =>
            items.foreach { item =>
                parse(item)
            }
    }
}
