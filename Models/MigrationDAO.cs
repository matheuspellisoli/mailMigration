using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Driver;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using mail_migration;
namespace mail_migration.Models

{
    public class MigrationDAO
    {


        private IMongoCollection<MigrationOperetionModel> _collection;
        private Databaseconfirmation conn = new Databaseconfirmation();
        public MigrationDAO()
        {
            _collection = conn.getDatabase().GetCollection<MigrationOperetionModel>("DBmigration");

        }

        public void saveMigration(MigrationOperetionModel migration)
        {

            _collection.InsertOne(migration);

        }
        public void updateMigration(MigrationOperetionModel migration)
        {
            var filter = Builders<MigrationOperetionModel>.Filter.Eq("idMigration", migration.idMigration);
            _collection.ReplaceOne(filter, migration);
        }

        public MigrationOperetionModel getMigration(int idMigration)
        {

            var filter = Builders<MigrationOperetionModel>.Filter.Eq("idMigration", idMigration);

            return _collection.Find(filter).Single();
        }

        public List<MigrationOperetionModel> getAllMigration()
        {
            var filter = Builders<MigrationOperetionModel>.Sort.Ascending("dateAndTime");
            var list = _collection.Find(new BsonDocument()).Sort(filter).ToList();

            return list;
        }

    }
}