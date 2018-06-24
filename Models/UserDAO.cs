using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Driver;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;

namespace mail_migration.Models

{
    public class UserDAO
    {
       
     
        private Databaseconfirmation conn = new Databaseconfirmation();
        private IMongoCollection<UserModel> _collection;
    
        public UserDAO()
        {
          _collection = conn.getDatabase().GetCollection<UserModel>("DBUsermigration");
            var options = new CreateIndexOptions() { Unique = true };
            var field = new StringFieldDefinition<UserModel>("mail");
            var indexDefinition = new IndexKeysDefinitionBuilder<UserModel>().Ascending(field);
            _collection.Indexes.CreateOneAsync(indexDefinition,options);
        }


        public int saveUser(UserModel User)
        {   
            try{
                _collection.InsertOne(User);
            }catch(MongoException e){
                // Console.WriteLine(e.HResult);

                if(e.HResult == -2146233088){
                    return -1;
                }
            }

            return 0;
        }   


        public UserModel getUser(ObjectId _id){
        var filter = Builders<UserModel>.Filter.Eq("_id", _id);        
        return _collection.Find(filter).Single();
        }   

        public UserModel getUserByMail(String mail){
        var filter = Builders<UserModel>.Filter.Eq("mail", mail);        
        
         return _collection.Find(filter).SingleOrDefault();
         
        }  

        public UserModel getUserByToken(String token){
        var filter = Builders<UserModel>.Filter.Eq("token", token);        
        
         return _collection.Find(filter).SingleOrDefault();
         
        } 


        public void updateUser(UserModel user){
            var filter = Builders<UserModel>.Filter.Eq("_id", user._id);
            _collection.ReplaceOne(filter, user);
        }



    }
}