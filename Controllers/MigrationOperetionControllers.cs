using Microsoft.AspNetCore.Mvc; 
using System.Collections.Generic;
using System;
using Newtonsoft.Json;
using mail_migration.Models;
using System.Globalization;
using Microsoft.Extensions.Configuration;

namespace mail_migration.Controllers
{   
    [Route("api")]  
    public class MigrationOperetionControllers : Controller{
    private IConfiguration _iconfiguration;
    
    
    public MigrationOperetionControllers(IConfiguration iconfiguration){
        _iconfiguration = iconfiguration;
    }
    
    [HttpGet]
    public IActionResult GetAll(){   
        
        return new ObjectResult(MigrationOperetionModel.getAll());
        
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

 