using System;  
using System.Collections.Generic;

namespace mail_migration.Models{
    public class ConfiguretionModel{

    private static SortedDictionary<String, String> map = new SortedDictionary<String, String>();


    public static void addConfig(String key, String value){
       map[key] = value;
    }

    public static String getConfig(String key){
        String value = map[key];
       return value;
    }   


    }
    
}