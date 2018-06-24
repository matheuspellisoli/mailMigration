using Microsoft.AspNetCore.Mvc; 
using System.Collections.Generic;
using System;
using Newtonsoft.Json;
using mail_migration.Models;
using System.Globalization;
using Microsoft.Extensions.Configuration;
using System.Text;

namespace mail_migration.Controllers
{   
    [Route("api")]  
    public class MigrationOperetionControllers : Controller{
    private readonly IConfiguration _iconfiguration;
    
    
    public MigrationOperetionControllers(IConfiguration configuration){
        _iconfiguration = configuration;
    }
    
    [HttpGet]
    public IActionResult GetAllMigration(){   
        
        return new ObjectResult(MigrationOperetionModel.getAllMigration());
        
    }

    [HttpGet("{id}/")]
    public IActionResult getMigration(int id){   

        if(id.Equals(null)) return StatusCode(500);

        MigrationOperetionModel b = MigrationOperetionModel.getMigration(id);

        return new ObjectResult(b);
       
    }





    [Produces("application/json")]
    
    [HttpPost]        
    public ActionResult AddMigration([FromBody]  MigrationOperetionModel obj)
    {        
            if(obj == null) return StatusCode(500);
            obj.encryptPasswordAccounts();
            MigrationOperetionModel.insertMigration(obj);

            obj.descryptPasswordAccounts();
        return new ObjectResult(obj);
    }

        [HttpGet("csv/{id}/")]    
        public FileContentResult Download(int id)
    {
        MigrationOperetionModel b = MigrationOperetionModel.getMigration(id);

        string csvContent = b.generetionCSV();
        var data = Encoding.UTF8.GetBytes(csvContent);
        string filename = b.domain +".csv";
        string mime = "text/csv";
        return File(data, mime, filename);
    }


    
    }
}

