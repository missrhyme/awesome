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
        case Index(items) =>
            try {
                Class.forName(driver)
                connection = DriverManager.getConnection(url, username, password)
                items.foreach { item =>
                    val sql = "insert into buybox_scrap values (NULL, NOW(), ?, ?, ?, ?)"
                    val state = connection.prepareStatement(sql)
                    state.setString(1, item.item_id)
                    state.setDouble(2, item.price)
                    state.setInt(3, item.rank)
                    state.setString(4, item.seller)
                    state.executeUpdate()
                }
            }
            catch {
                case e: Exception => e.printStackTrace()
            }
            finally {
                connection.close()
            }


    }
}
