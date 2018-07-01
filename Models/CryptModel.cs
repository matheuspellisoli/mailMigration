using System;  
using System.IO;  
using System.Security.Cryptography;
using System.Text;
using System.Configuration;
using Microsoft.Extensions.Configuration;

namespace mail_migration.Models{
    public class CryptModel

    {
        private UnicodeEncoding byteConverter = new UnicodeEncoding();
        private RSACryptoServiceProvider rsa;
        public  CryptModel()  
        {  
            try
            {
                string Keys = ConfiguretionModel.getConfig("RSAKey");
                rsa = new RSACryptoServiceProvider(1024); 
                String a =  rsa.ExportParameters(true).ToString();
                rsa.ImportCspBlob(Convert.FromBase64String(Keys));
            }
            catch (ArgumentNullException)
            {
                //Catch this exception in case the encryption did
                //not succeed.
                Console.WriteLine("Encryption failed.");

            }
        }


        public String RSAencrypt(String StringToEncrypt){

            byte[] encryptedString = rsa.Encrypt(byteConverter.GetBytes(StringToEncrypt),false);
            
            return Convert.ToBase64String(encryptedString);
        }

        public String RSAdescrypt(String StringToEncrypt){

            byte[] encryptedString = rsa.Decrypt( Convert.FromBase64String(StringToEncrypt), false);

            return byteConverter.GetString(encryptedString);
        }

    }
}