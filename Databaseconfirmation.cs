using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Driver;
using Microsoft.Extensions.Configuration;
using mail_migration.Models;

namespace mail_migration
{
    public class Databaseconfirmation
    {   
        private static IMongoClient _client;
        private static IMongoDatabase _database;
        
        public Databaseconfirmation(){
            _client = new MongoClient(ConfiguretionModel.getConfig("MongoDBString"));
            _database = _client.GetDatabase("migration");
        }

        public IMongoDatabase  getDatabase(){
                return _database;
        }

    }
}
