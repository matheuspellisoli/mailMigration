using System;


namespace mail_migration.Models
{
    public class ServerModel
    {

        public String host { get; set; }
        public int port { get; set; }

        public Boolean ssl { get; set; }

        public String getSsl()
        {
            return (this.ssl ? "true" : "false");
        }

    }
}