const acoounts = [];

var provider = {};

const providers = [
	{
		"name": "RedeHost",
		"host": "mail.redehost.com.br",
		"port": 143,
		"ssl": false 
	},
	{
		"name": "Google",
		"host": "imap.google.com",
		"port": 993,
		"ssl": true 
	},
	{
		"name": "LocalWeb",
		"host": "email-ssl.com.br",
		"port": 993,
		"ssl": true 
	},
	{
		"name": "kingHost",
		"host": "imap.kinghost.net",
		"port": 993,
		"ssl": true 
	},
	{
		"name": "Godaddy",
		"host": "imap.secureserver.net",
		"port": 993,
		"ssl": true 
	}
]

const errors = {
	"elements":[
		"accountSource",
		"accountDestiny", 
		"passwordSource",
		"passwordDestiny",
		"provider",
	],

	"accountSource": {
		"message" : "Digite um e-mail de origem valida",
		"activated" : false,
		"erroLabel": "accountError"
	},
	"accountDestiny":{
		"message" : "Digite um e-mail de destino valida",
		"activated" : false,
		"erroLabel": "accountError"
	},
	"passwordSource":{
		"message" : "Digite uma senha para e-mail de origem",
		"activated" : false,
		"erroLabel": "accountError"
	}	,
	"passwordDestiny":{
		"message" : "Digite uma senha para e-mail de destino",
		"activated" : false,
		"erroLabel": "accountError"
	},
	"provider": [
		{"message" : "Selecione um provedor.",
		"activated" : false,
		"erroLabel": "severError"},
		{
		"message" : "Selecione um provedor.",
		"activated" : false,
		"erroLabel": "severError"
		}
	]
	
	
}



$(document).ready(function($) {
	providers.forEach(item => {
		$("#provider").append(new Option(item.name,providers.indexOf(item)));
	});
	$("#provider").append(new Option("Outro", "Outro"));
  });


function isEmpty(value) {
	if(value == "" || value == null){
		return true;
	}

	return false;
}

function setErro(element){
	var message = "";
	var isError = false
	errors.elements.forEach(input => {
		if(errors[input].activated){
			if(message != ""){
				message = message + "<br>" + errors[input].message;
			}else{
				message = errors[input].message;
			}
			$("#"+input).addClass("erroPers");
			isError = true;
		}else{
			$("#"+input).removeClass("erroPers");	
		}

	if(isError){
		$("#"+element).empty();
		$("#"+element).removeClass("hide");
		$("#"+element).append(message);	
	}else{
		$("#"+element).empty();
		$("#"+element).addClass("hide");		
	} 
	});

	
}

function validMail(id) {

	var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
	
	if (reg.test($("#"+id).val())){		
		errors[id].activated = false;
		setErro("accountError");
		return false;
	}else{
		errors[id].activated = true;
		setErro("accountError");
		return false;
	}
}

function validPassword(id){

	if(	isEmpty($("#"+id).val())){
		errors[id].activated = true;
		setErro("accountError");
		return true;
		}

		errors[id].activated = false;
		setErro("accountError");
		return false;
		
}

function validOther(id) {
	if(isEmpty($("#"+id).val())){
		setErro("severError")
	}
}

function validAcoount() {	
	var isValid = false;
	if(validMail("accountSource")){
		isValid =  true;
	}else{
		isValid = false;
	}
	
	if(validMail("passwordDestiny")){
		isValid =  true;
	}else{
		isValid = false;
	}

	if(validPassword("accountDestiny")){
		isValid =  true;
	}else{
		isValid = false;
	}

	if(validPassword("passwordSource")){
		isValid =  true;
	}else{
		isValid = false;
	}
	
	return isValid;
	
}

function addAcoount() {
	var accountSource = $("#accountSource").val();
	var passwordSource = $("#passwordSource").val();
	var  accountDestiny = $("#accountDestiny").val();
	var  passwordDestiny = $("#passwordDestiny").val();
	
	if(!validAcoount()){
		
		if(acoounts.length <= 0){
			$( "#accountList" ).empty();	
		}
		
		acoounts.push( 
			{
				"accountSource" : accountSource,
				"passwordSource": passwordSource,
				"accountDestiny": accountDestiny,
				"passwordDestiny" : passwordDestiny
			})	

			let html = "<tr id='account" +acoounts.length+"'> <td>"+accountSource+"</td> <td>"+passwordSource+"</td> <td>"+accountDestiny+"</td> <td>"+passwordDestiny+"</td> <td><a  href='javascript:edit("+(acoounts.length)+");'>	<img src='/images/edit.svg' style='height: 20px'></a></td></td> <td><a  href='javascript:remove("+(acoounts.length)+");'>	<img src='/images/garbage.svg' style='height: 20px'></a></td></tr>";
			$('#account').bind('click', false);
			$( "#accountList" ).append( html );
			$("#accountSource").val("");
			$("#passwordSource").val("");
			$("#accountDestiny").val("");
			$("#passwordDestiny").val("");
			$("#accountSource").focus();
	}
}

function remove(number){
	var  menuAccount = $("#menuAccount");
	if(menuAccount.hasClass( "cadastro" )){
		var id = "#account" + number + "";
		acoounts.splice(number -1,1);
		$( id ).remove();
	}
}

function editCancelar() {
	$("#accountSource").val("");
	$("#passwordSource").val("");
	$("#accountDestiny").val("");
	$("#passwordDestiny").val("");
	$("#accountSource").focus();

	var menuAdd =
	`
	<div class="span3 offset9">
      <a class="span2 btn btn-primary " href="javascript:addAcoount();">Adicionar e-mail</a>
     </div> 
	`
	$("#menuAccount").empty()
	$("#menuAccount").append(menuAdd)

	var  menuAccount = $("#menuAccount");
	menuAccount.removeClass("editar")
	menuAccount.addClass("cadastro")
}

function editConfirmar(number) {
	remove(number);
	addAcoount();
	
	var menuAdd =
	`
	<div class="span3 offset9">
      <a class="span2 btn btn-primary " href="javascript:addAcoount();">Adicionar e-mail</a>
     </div> 
	`
	$("#menuAccount").empty()
	$("#menuAccount").append(menuAdd)

	var  menuAccount = $("#menuAccount");
	menuAccount.removeClass("editar")
	menuAccount.addClass("cadastro")

}

function edit(number){
	var  menuAccount = $("#menuAccount");
	if(menuAccount.hasClass( "cadastro" )){
	
	menuAccount.addClass("editar")

	menuAccount.removeClass("cadastro")

	$("#accountSource").val(acoounts[number -1].accountSource);
	$("#passwordSource").val(acoounts[number -1].passwordSource);
	$("#accountDestiny").val(acoounts[number -1].accountDestiny);
	$("#passwordDestiny").val(acoounts[number -1].passwordDestiny);

	var  menuEditar= 
	`
		<div class="offset6">
        	<a class="span2  btn btn " href="javascript:editCancelar();">Cancelar</a>
        	<a class="span2 btn btn-primary " href="javascript:editConfirmar(${number});">Editar</a>     
      	</div>
 	`

 $("#menuAccount").empty()
 $("#menuAccount").append(menuEditar)
	}
}	


function serverProvider(){
	var providerSelect = $("#provider").val();
	if(providerSelect == "Outro"){
		$("#ServerOther").removeClass("hide");	
		provider = {
			"severSource":$("#ServerOtherHost").val(),
			"porSource":$("#ServerOtherPort").val(),
			"sslSource":$("#ServerOtherSSL").val()
		}
	}else{	
		$("#ServerOther").addClass("hide");
		$("#ServerOtherHost").val('')
		$("#ServerOtherPort").val('')
		$("#ServerOtherSSL").val('')
		
		provider = {
			"severSource": providers[providerSelect].host,
			"porSource":providers[providerSelect].port,
			"sslSource":providers[providerSelect].ssl,
		}
	}		
	


	return provider;
}


function dateAndTimeSchedule(){
	var dateAndTime = $("#formSchedule input[type='radio']:checked").val();
	if(dateAndTime == "schedule"){
		$("#dateAndTimeSchedule").removeClass("hide");
		return ($("#scheduleDate").val() +" "+ $("#scheduleTime").val());
	}else{
		$("#dateAndTimeSchedule").addClass("hide");
		return (null);
	}


	
}

function loadData() {
	validOther("provider");
	
	if(acoounts.length <= 0){
		return 0;	
	}

	if(false){
		return 0;
	}
	
	jQuery.noConflict();
    $("#myModal").modal();

	if(acoounts.length > 0){
		$( "#accountListView" ).empty();
		acoounts.forEach(item => {
			let html = "<tr'> <td>"+item.accountSource+"</td> <td>"+item.passwordSource+"</td> <td>"+item.accountDestiny+"</td> <td>"+item.passwordDestiny+"<td></tr>";
			$( "#accountListView" ).append( html );
		});
	}else{
		$( "#accountListView" ).append("<tr> <td colspan='4'>Nenhuma conta cadastrada</td></tr>");
	}
	
}



// {
//     "idMigration": 1258,
// 		"domain":"redehost.com.br",
// 		"dateAndTime": "22/05/2018 12:00",
//      "serverSourceIMAP": {
//         "host":"imap",
//         "porta":"143",
//         "ssl":"false"
//     },
//      "serverDestinyIMAP": {
//         "host":"imap",
//         "porta":"143",
//         "ssl":"false"
//     },
//      "accounts": [
//         {
//             "accountDestiny": {
//                 "mail": "matheus@redehost.com.br",
//                 "password": "1234"
//             },
//             "accountSource": {
//                 "mail": "matheus@redehost.com.br",
//                 "password": "1234"
//             }
//         },
//         {
//             "accountDestiny": {
//                 "mail": "matheus@redehost.com.br",
//                 "password": "1234"
//             },
//             "accountSource": {
//                 "mail": "matheus@redehost.com.br",
//                 "password": "1234"
//             }
//         }
//     ]
    
// }