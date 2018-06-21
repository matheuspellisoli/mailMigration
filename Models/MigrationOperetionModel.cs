using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

using MongoDB.Driver;

namespace mail_migration.Models
{
    [BsonIgnoreExtraElements]
    public class MigrationOperetionModel
    {
        [BsonId]
        public ObjectId _id { get; set; }
        [BsonElement("idMigration")]
        public int idMigration { get; set; }
        [BsonElement("domain")]
        public String domain{get; set;}
        [BsonElement("serverSourceIMAP")]
        public ServerModel serverSourceIMAP { get; set; }
        [BsonElement("serverDestinyIMAP")]
         public ServerModel serverDestinyIMAP { get; set; }
        [BsonElement("accounts")]
         public List<accountSourceAndAccountDestinyModel> accounts { get; set; }
        [BsonElement("dateAndTime")]
         public String dateAndTime { get; set; }

        public static MigrationDAO conn =new MigrationDAO();


         public static List<MigrationOperetionModel> getAllMigration(){
             return conn.getAllMigration();
         }

        public static MigrationOperetionModel getMigration(int idMigration){
             return conn.getMigration(idMigration);
         }
          public static void insertMigration(MigrationOperetionModel migration)
        {               
             conn.insertMigration(migration);
        }

        public String generetionCSV(){
            String csv = "SourceEmail,SourceServer,SourcePassword,SourceSsl,SourcePort,DestinyEmail,DestinyServer,DestinyPassword,DestinyUseSsl,DestinyPort\n";
            
            foreach (accountSourceAndAccountDestinyModel accounts in this.accounts)
            {
                csv = csv + accounts.accountSource.mail + "," + this.serverSourceIMAP.host + ","+ accounts.accountSource.password + "," + this.serverSourceIMAP.getSsl()+ "," + this.serverSourceIMAP.port+",";
                csv = csv + accounts.accountDestiny.mail + "," + this.serverDestinyIMAP.host + ","+ accounts.accountDestiny.password + "," + this.serverDestinyIMAP.getSsl()+ "," + this.serverDestinyIMAP.port+"\n";
            }
           
            return csv;
        
        }




    }   
    
}