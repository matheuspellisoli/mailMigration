using System;

namespace mail_migration.Models
{
    public class AccountModel
    {
        private CryptModel crypt = new CryptModel();

        public string mail { get; set; }
        public string password { get; set; }
        

        public AccountModel(string mail, string password){
            this.mail = mail;
            this.password = password;
        }

        public void encryptPassword(){
            this.password =  crypt.RSAencrypt(this.password);
        }

        public void descryptPassword(){
            this.password =  crypt.RSAdescrypt(this.password);
        }


    }
}