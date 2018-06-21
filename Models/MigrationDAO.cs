using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Driver;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;

namespace mail_migration.Models

{
    public class MigrationDAO
    {
       
     
    private IMongoClient _client;
    private IMongoDatabase _database;
    private IMongoCollection<MigrationOperetionModel> _collection;
    
    public MigrationDAO()
    {
        _client = new MongoClient("mongodb://DBUserMigration:e2SW3!hX@ds263670.mlab.com:63670/migration");
        _database = _client.GetDatabase("migration");
        _collection = _database.GetCollection<MigrationOperetionModel>("DBmigration");
    }


        public void insertMigration(MigrationOperetionModel migration)
        {   
            
             _collection.InsertOne(migration);

        }
        
        public MigrationOperetionModel getMigration(int idMigration){

            var filter = Builders<MigrationOperetionModel>.Filter.Eq("idMigration", idMigration);
            
           return _collection.Find(filter).Single();
        }

        public List<MigrationOperetionModel> getAllMigration()
        {
            var list =  _collection.Find(new BsonDocument()).ToList();
            
            return list;
    } 
       

}
}