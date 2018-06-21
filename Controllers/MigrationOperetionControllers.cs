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
    private IConfiguration _iconfiguration;
    
    
    public MigrationOperetionControllers(IConfiguration iconfiguration){
        _iconfiguration = iconfiguration;
    }
    
    [HttpGet]
    public IActionResult GetAllMigration(){   
        
        return new ObjectResult(MigrationOperetionModel.getAllMigration());
        
    }

    [HttpGet("get")]
    public IActionResult getMigration(int id){   

        if(id == null) return StatusCode(500);

        MigrationOperetionModel b = MigrationOperetionModel.getMigration(id);

        return new ObjectResult(b);
       
    }

    [HttpGet("csv")]    
        public FileContentResult Download(int id)
    {
        MigrationOperetionModel b = MigrationOperetionModel.getMigration(id);

        string csvContent = b.generetionCSV();
        var data = Encoding.UTF8.GetBytes(csvContent);
        string filename = b.domain +".csv";
        string mime = "text/csv";
        return File(data, mime, filename);
    }

    [Produces("application/json")]
    
    [HttpPost]        
    public ActionResult AddMigration([FromBody]  MigrationOperetionModel obj)
    {        
            if(obj == null) return StatusCode(500);

            MigrationOperetionModel.insertMigration(obj);

        return new ObjectResult(obj);
    }



    
    }
}

 