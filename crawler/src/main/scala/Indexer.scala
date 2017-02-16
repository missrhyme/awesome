import java.sql.{DriverManager, Connection}

import akka.actor.Actor
import akka.actor.Actor.Receive

/**
  * Created by yanxue on 11/02/2017.
  */
class Indexer extends Actor{
    val url = "jdbc:mysql://127.0.0.1:3306/amz_defend"
    val driver = "com.mysql.jdbc.Driver"
    val username = "root"
    val password = "xueyang890115"
    var connection:Connection = _

    override def receive: Receive = {
        case index: Index =>
            try {
                Class.forName(driver)
                connection = DriverManager.getConnection(url, username, password)
                val statement = connection.createStatement
                val rs = statement.executeQuery("SELECT * FROM buybox_scrap")
                while (rs.next()) {

                }

            }
            catch {
                case e: Exception => e.printStackTrace()
            }
            finally {

            }


    }
}
