import akka.actor.{ActorRef, Props, Actor}
import akka.actor.Actor.Receive

/**
  * Created by yanxue on 09/02/2017.
  */
class Supervisor extends Actor {
    val GROUP_NUM = 5

    def scrap(items: List[String], indexer: ActorRef) = {
        var count = 0
        val crawler = context.actorOf(Props(new Crawler(count, indexer)))
        count += 1
        crawler ! Scrap(items)
    }


    override def receive: Receive = {
        case Start(items: List[String]) =>
            println("Start scraping")
            val indexer = context.actorOf(Props(new Indexer))
            scrap(items, indexer)
    }
}
