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
         public IEnumerable<accountSourceAndAccountDestinyModel> accounts { get; set; }
        [BsonElement("dateAndTime")]
         public String dateAndTime { get; set; }

         public static ConnectionModel conn =new ConnectionModel();


         public static List<MigrationOperetionModel> getAll(){
             return conn.getAllMigration();
         }

          public static void insertMigration(MigrationOperetionModel migration)
        {   
            
             conn.insertMigration(migration);
        }

    }   
    
}