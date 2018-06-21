using System;

namespace mail_migration.Models
{
    public class AccountModel
    {
        public string mail { get; set; }
        public string password { get; set; }


        public AccountModel(string mail, string password){
            this.mail = mail;
            this.password = password;
        }


    }
}