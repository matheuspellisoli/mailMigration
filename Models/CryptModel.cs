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
                string Keys = "BwIAAACkAABSU0EyAAQAAAEAAQBnIayNXwQL9s/Iak4u/Sbk31H4LAdxEhzILrxyp6d5CLfku1BnicsgaLHCmfgO07kcVipfRngGuTn/lds4J3fY1A0HeABR8w76fTBYhVyIC+MNE4aUaesWOdULFhydxhNpIpPtl9DQq1/wlPIBDn6SVTt6cTCIxWgpn4dcCOdPqvspqMYJF+67xsdyd/KiZRtGcr61AAYGK6+HRLo3Ae04MvzCr4mNpEG9uoFWW0tzIdXIvOifblHdzikomCY1HNWFVlwM+NbYK/AJPshReXFVXAcqc0aSTRKTxf78tkqfh0txo0Q0f0TUQy2ZGN5V+AoWoQ+jD0BDtmSQEUjCqpbM5eQ/QLVFq0eGicH9TdMAsNlPunLVPCZFzulDHs76ACPLOywaMsJgMt3amrUfUf1kjfaZ4MKgCK8UMO3b+JsGrf2j9vTlwXuanvspcf9v91a9Jgjm0OmAB/0AA9r1AudPvCpyfpFaywBteveAjCUl7gcdLLR7oMzPC7CTDWsF2S6KEDeXeXN4GzxBB9+Pke7hF6NF5tRWECHLSKWxBO1tfulhs4K80PNWRV+rp9j6OJpG5G04XTCGB5fzVSjlNAduOUauHoHfspNEK47LXqvOJxDkSv/MccZfpCghtsG6qZAKPVnq81ZVMc76cdZ2seDL3ef+39e+x0agxQTSq09L1xOZ/j4GOBbkLg2QbKo+MWYaH2fp7vjJMpwy1ncseD9Yg/vbOYaP7axEG3pch8pgiBkfvfNBDVLwL7keij5VN3c=";
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