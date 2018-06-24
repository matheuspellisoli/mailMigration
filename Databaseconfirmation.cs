using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Driver;
using Microsoft.Extensions.Configuration;

namespace mail_migration
{
    public class Databaseconfirmation
    {   
        private static IMongoClient _client;
        private static IMongoDatabase _database;
        
        public Databaseconfirmation(){
            _client = new MongoClient("mongodb://DBUserMigration:e2SW3!hX@ds263670.mlab.com:63670/migration");
            _database = _client.GetDatabase("migration");
        }

        public IMongoDatabase  getDatabase(){
                return _database;
        }

    }
}
