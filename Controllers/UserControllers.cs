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
    [Route("api/user")]  
    public class UserControllers : Controller{
    private readonly IConfiguration _iconfiguration;
    
    
    public UserControllers(IConfiguration configuration){
        _iconfiguration = configuration;
    }
    
    [HttpGet("/{id}/")]
    public IActionResult getUser(){ 
        
        return new ObjectResult(null);
        
    }

    [HttpPost("login")]
    public IActionResult loginUser([FromBody] UserModel user){

        var result =UserModel.login(user.mail, user.password); 

        if(result == null){
            return BadRequest("Senha ou e-mail não conferem");
        }
      
        return new ObjectResult(result);       
    }

    [HttpPost("islogin")]
    public IActionResult isloginUser([FromHeader] String key){
        
        if(UserModel.isLogged(key)){
            return StatusCode(202);
        }else{
            return StatusCode(403);
        }
    }

    [HttpPost("logout")]
    public IActionResult logoutUser([FromHeader] string key){
        if(key == null){
            return StatusCode(401);
        }
        UserModel.logout(key);

        return StatusCode(200);
    }

    [HttpPost]
    public IActionResult saveUser([FromBody] UserModel user){
         bool result = UserModel.saveUser(user);

            if(result){
                return StatusCode(200);
            }else{
                return BadRequest("usuário já existe");
            }
    }
    
    }
}

