using System;

namespace mail_migration.Models
{
    public class AccountModel
    {
        private static CryptModel crypt = new CryptModel();

        public string mail { get; set; }
        public string password { get; set; }
        

        public AccountModel(string mail, string password){
            this.mail = mail;
            this.password = password;
        }

        public static String encryptPassword(String password){
            return  crypt.RSAencrypt(password);
        }

        public static String descryptPassword(String password){
           return crypt.RSAdescrypt(password);
        }


    }
}