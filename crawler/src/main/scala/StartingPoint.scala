import akka.actor.{ActorSystem, Props}

import scala.concurrent.Await

/**
  * Created by yanxue on 08/02/2017.
  */
object StartingPoint extends App{

    val CRAWLER_NUMBER = 10
    val items = List("B00166ES9G", "B00I2EZUF6", "B01A0FEPFU", "B000F9O85E", "B01DAHAIUQ")

    val system = ActorSystem()
    val supervisor = system.actorOf(Props(new Supervisor))

    supervisor ! Start(items)


    println("test")

}
