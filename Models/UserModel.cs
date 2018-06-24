using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace mail_migration.Models
{
    public class UserModel
    {
        private static CryptModel crypt = new CryptModel();
        private static UserDAO conn =new UserDAO();

        [BsonElement("_id")]
        public ObjectId _id { get; set; }
         [BsonElement("mail")]
        public String mail{ get; set; } 
        [BsonElement("password")]
        public String password { get; set; }   
        [BsonElement("token")]
        public String token { get; set; }      


        public static bool saveUser(UserModel user)
        {                

            user.password = crypt.RSAencrypt(user.password);
            int resul = conn.saveUser(user);
            if(!(resul == 0)){
                return false;
            }else{
                return true;
            }
            
        }

        public static  UserModel getUser(ObjectId _id){
           return conn.getUser(_id);
        } 

        public static UserModel getUserByMail(String mail){
           return conn.getUserByMail(mail);
        }

        public static void updateUser(UserModel user){
            conn.updateUser(user);
        }  

         public static UserModel getUserByToken(String token){
            return conn.getUserByToken(token);
        }  
        
        public static String login(String mail, String password){
             UserModel _user = UserModel.getUserByMail(mail); 
            if(_user == null){
                return null;
            }
            if(crypt.RSAdescrypt(_user.password) == password){
            String token = DateTime.Now.ToString() + _user.mail;            
            token = crypt.RSAencrypt(token); 
            _user.token = token;
            UserModel.updateUser(_user);
            return token;
            }
            return null;
              
        }
        public static void logout(String token){
            UserModel _user =  UserModel.getUserByToken(token);
            if(_user == null){
            return;
            }                                       
            _user.token = null;
            UserModel.updateUser(_user);
        }

         public static bool isLogged(String token){
            UserModel _user =  UserModel.getUserByToken(token);
            if(_user == null){
            return false;
            }      

            if(token != _user.token){
                return false;
            }     
            return true;                            
        }







    }
}