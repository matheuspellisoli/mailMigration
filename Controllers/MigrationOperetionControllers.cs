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
    public IActionResult GetAllMigration([FromHeader] string key){   
        if(key == null){
            return StatusCode(401);
        }
        if(!UserModel.isLogged(key)){
            return StatusCode(401);
        }

        return new ObjectResult(MigrationOperetionModel.getAllMigration());
        
    }

    [HttpGet("{id}/")]
    
    public IActionResult getMigration([FromHeader] string key, int id){   

        if(key == null){
            return StatusCode(401);
        }
        if(!UserModel.isLogged(key)){
            return StatusCode(401);
        }

        if(id.Equals(null)) return StatusCode(500);

        MigrationOperetionModel b = MigrationOperetionModel.getMigration(id);

        return new ObjectResult(b);
       
    }

    [HttpGet("csv/{id}/")]    
    public IActionResult getCsv([FromHeader] string key, int id)
    {

        if(key == null){
            return StatusCode(401);
        }
        if(!UserModel.isLogged(key)){
            return StatusCode(401);
        }

        MigrationOperetionModel migration = MigrationOperetionModel.getMigration(id);

        // if(true){
        //    return BadRequest(500);       
        // }
        
        string csvContent = migration.generetionCSV();
        var data = Encoding.UTF8.GetBytes(csvContent);
        string filename = migration.domain +".csv";
        string mime = "text/csv";
        return File(data, mime, filename);
    }

    [Produces("application/json")]
    
    [HttpPost]        
    public ActionResult addMigration(MigrationOperetionModel obj)
    {        
            if(obj == null) return StatusCode(500);
            obj.encryptPasswordAccounts();
            MigrationOperetionModel.saveMigration(obj);

        return new ObjectResult(obj);
    }

    [HttpPut("{id}/")]        
    public ActionResult updateMigrationSeverDetiny(int id,[FromHeader] string key, [FromBody]  ServerModel obj)
    {        

            if(key == null){
                return StatusCode(401);
            }
            if(!UserModel.isLogged(key)){
                return StatusCode(401);
            }

            if(obj == null) return StatusCode(501);
            
            MigrationOperetionModel _migration = MigrationOperetionModel.getMigration(id);

            _migration.serverDestinyIMAP = obj;

            MigrationOperetionModel.updateMigration(_migration);        

        return new ObjectResult(_migration);
    }
    
    }
}

