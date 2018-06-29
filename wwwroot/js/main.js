
var provider = {};

const providers = [
	{
		"name": "RedeHost",
		"host": "mail.redehost.com.br",
		"port": "143",
		"ssl": false
	},
	{
		"name": "Google",
		"host": "imap.google.com",
		"port": "993",
		"ssl": true
	},
	{
		"name": "LocaWeb",
		"host": "email-ssl.com.br",
		"port": "993",
		"ssl": true
	},
	{
		"name": "kingHost",
		"host": "imap.kinghost.net",
		"port": "993",
		"ssl": true
	},
	{
		"name": "Godaddy",
		"host": "imap.secureserver.net",
		"port": "993",
		"ssl": true
	}
]

var migration = {
	accounts: [

		{

			accountDestiny:{mail: "matheus.pellisoli@redehost.com", password: "1233"},
			accountSource:{mail: "matheus.pellisoli@redehost.com", password: "1234"}
		}

	],
	idMigration: 0,
	domain: "",
	serverSourceIMAP: {},
	serverDestinyIMAP: null,
	dateAndTime: ""
}

$("#passwordSource").focusin(function () {
	$("#passwordSource").attr("type", "text");
});

$("#passwordSource").focusout(function () {
	$("#passwordSource").attr("type", "password");
});

$("#passwordDestiny").focusin(function () {
	$("#passwordDestiny").attr("type", "text");
});

$("#passwordDestiny").focusout(function () {
	$("#passwordDestiny").attr("type", "password");
});


function closeModal() {
	$('#myModal').modal('hide');
	
}

$(document).ready(function ($) {
	providers.forEach(item => {
		$("#provider").append(new Option(item.name, providers.indexOf(item)));
	});
	$("#provider").append(new Option("Outro", "Outro"));
	renderTable();


});

function isEmpty(value) {
	if (value == "" || value == null) {
		return true;
	}

	return false;
}

function validPassword(value) {

	if (isEmpty(value)) {

		return true;
	}
	return false;

}

function maskString(value) {
	var newValue = "";
	for (let i = 0; i < value.length; i++) {
		newValue = newValue + "*";
	}
	return newValue;
}

function renderTable() {

	$("#accountList").empty();
	if(migration.accounts.length <= 0){
		let html = "<tr'><td colspan='4' style='text-align:center'>Nenhuma conta foi adicionada.</td></tr>";
		$("#accountList").append(html);
	}else{
		migration.accounts.forEach((account, index) => {
			let html = "<tr id='account" + index + "'> <td>" + account.accountSource.mail + "</td> <td>" + maskString(account.accountSource.password) + "</td> <td>" + account.accountDestiny.mail + "</td> <td>" + maskString(account.accountDestiny.password) + "</td> <td><a  href='javascript:edit(" + (index) + ");'>	<img src='/images/edit.svg' style='height: 20px'></a></td></td> <td><a  href='javascript:remove(" + index + ");'>	<img src='/images/garbage.svg' style='height: 20px'></a></td></tr>";
			$("#accountList").append(html);
		});
	}
	}
function renderTableViwer() {

	$("#accountListView").empty();
	migration.accounts.forEach((account, index) => {
		let html = "<tr id='account" + index + "'> <td>" + account.accountSource.mail + "</td> <td>" + maskString(account.accountSource.password) + "</td> <td>" + account.accountDestiny.mail + "</td> <td>" + maskString(account.accountDestiny.password) + "</td> </tr>";
		$("#accountListView").append(html);
	});
}
function validAcoount(accountSource, passwordSource, accountDestiny, passwordDestiny) {
	var valid = true;
	var cont = 0;
	var reg = /^(\w+([-+.']\w+)*)@(\w+([-.]\w+)*\.\w+([-.]\w+)*)$/;

	if (validPassword(passwordSource.val())) {
		valid = false;
		cont ++;
		passwordSource.addClass("erroPers");
	} else {
		passwordSource.removeClass("erroPers");
	}

	if (validPassword(passwordDestiny.val())) {
		valid = false;
		cont ++;
		passwordDestiny.addClass("erroPers");
	} else {
		passwordDestiny.removeClass("erroPers");
	}
	if (!reg.test(accountSource.val())) {
		valid = false;
		cont ++;
		accountSource.addClass("erroPers");
	} else {
		accountSource.removeClass("erroPers");
	}
	if (!reg.test(accountDestiny.val())) {
		valid = false;
		cont ++;
		accountDestiny.addClass("erroPers");
	} else {
		accountDestiny.removeClass("erroPers");
	}

	if (!valid) {
		if(cont == 1){
			AlertError("Verifique o campo em vermelho.")
		}else{
			AlertError("Verifique os campos em vermelho.")
		}
	} 
	return valid;

}
function addAcoount() {
	var accountSource = $("#accountSource")
	var passwordSource = $("#passwordSource")
	var accountDestiny = $("#accountDestiny")
	var passwordDestiny = $("#passwordDestiny")


	if (validAcoount(accountSource, passwordSource, accountDestiny, passwordDestiny)) {
		migration.accounts.push(
			{
				"accountSource": {
					"mail": accountSource.val(),
					"password": passwordSource.val(),
				},
				"accountDestiny": {
					"mail": accountDestiny.val(),
					"password": passwordDestiny.val()
				}
			})
		$("#accountSource").val("");
		$("#passwordSource").val("");
		$("#accountDestiny").val("");
		$("#passwordDestiny").val("");
		$("#accountSource").focus();

		renderTable();
	}


}
function remove(number) {

	var menuAccount = $("#menuAccount");

	if (menuAccount.hasClass("cadastro")) {
		migration.accounts.splice(number, 1);

	}

	renderTable();

}

function edit(number) {
	var menuAccount = $("#menuAccount");
	if (menuAccount.hasClass("cadastro")) {

		menuAccount.addClass("editar")

		menuAccount.removeClass("cadastro")

		$("#accountSource").val(migration.accounts[number].accountSource.mail);
		$("#passwordSource").val(migration.accounts[number].accountSource.password);
		$("#accountDestiny").val(migration.accounts[number].accountDestiny.mail);
		$("#passwordDestiny").val(migration.accounts[number].accountDestiny.password);

		var menuEditar =
			`
		<div class="pull-right">
        	<a class="span2  btn btn " href="javascript:editCancelar();">Cancelar</a>
        	<a class="span2 btn btn-primary " href="javascript:editConfirmar(${number});">Editar</a>     
      	</div>
 	`

		$("#menuAccount").empty()
		$("#menuAccount").append(menuEditar)
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
		<div class="pull-right">
		<a class="span2 btn btn-primary " href="javascript:addAcoount();">Adicionar e-mail</a>
	</div>
	`
	$("#menuAccount").empty()
	$("#menuAccount").append(menuAdd)

	var menuAccount = $("#menuAccount");
	menuAccount.removeClass("editar")
	menuAccount.addClass("cadastro")
}

function editConfirmar(number) {
	migration.accounts.splice(number, 1);
	addAcoount();

	var menuAdd =
		`
		<div class="pull-right">
		<a class="span2 btn btn-primary " href="javascript:addAcoount();">Adicionar e-mail</a>
	</div> 
	`
	$("#menuAccount").empty()
	$("#menuAccount").append(menuAdd)

	var menuAccount = $("#menuAccount");
	menuAccount.removeClass("editar")
	menuAccount.addClass("cadastro")

}

function validProvider() {
	var providerSelect = $("#provider").val();
	if (providerSelect == null) {
		AlertError("selecione um provedor.")
		$("#provider").addClass("erroPers")
		return false;
	} else {
		$("#provider").removeClass("erroPers")

		if (providerSelect == "Outro") {
			valid = true;
			if ($("#ServerOtherHost").val() == null | $("#ServerOtherHost").val() == "") {
				valid = false;
				$("#ServerOtherHost").addClass("erroPers")
			} else {
				$("#ServerOtherHost").removeClass("erroPers")
			}
			if ($("#ServerOtherPort").val() == null | $("#ServerOtherPort").val() == "") {
				valid = false;
				$("#ServerOtherPort").addClass("erroPers")
			} else {
				$("#ServerOtherPort").removeClass("erroPers")
			}
			if ($("#ServerOtherSSL").val() == null | $("#ServerOtherSSL").val() == "") {
				valid = false;
				$("#ServerOtherSSL").addClass("erroPers")
			} else {
				$("#ServerOtherSSL").removeClass("erroPers")
			}


			return valid;
		}



		return true;
	}
}

function serverProvider() {
	var providerSelect = $("#provider").val();
	validProvider()
	if (providerSelect == "Outro") {
		$("#ServerOther").removeClass("hide");

		provider = {
			server: {
				"host": $("#ServerOtherHost").val(),
				"port": $("#ServerOtherPort").val(),
				"ssl": $("#ServerOtherSSL").val()
			},
			name: "Outro"
		}

	} else {
		$("#ServerOther").addClass("hide");
		$("#ServerOtherHost").val('')
		$("#ServerOtherPort").val('')
		$("#ServerOtherSSL").val('')

		provider = {
			server: {
				"host": providers[providerSelect].host,
				"port": providers[providerSelect].port + "",
				"ssl": providers[providerSelect].ssl,
			},
			name: providers[providerSelect].name
		}
		console.log(provider);
		migration.serverSourceIMAP = provider.server;
		return provider;
	}

	return provider;
}
function validDateAndTimeSchedule() {
	var dateAndTime = $("#formSchedule input[type='radio']:checked").val();
	var valid;
	if (dateAndTime == null) {
		AlertError("Selecione um horário.");
		$(".radio").addClass("error");
		valid = false;
	} else {
		$("#dateAndTimeScheduleError").addClass("hide");
		$(".radio").removeClass("error");
		valid = true;
	}

	if (dateAndTime == "schedule") {
		if ($("#scheduleDate").val() == "") {
			$("#scheduleDate").addClass("erroPers");
			valid = false;
		} else {
			$("#scheduleDate").removeClass("erroPers");
			valid = true;
		}
		if ($("#scheduleTime").val() == "") {
			$("#scheduleTime").addClass("erroPers");
			valid = false;
		} else {
			$("#scheduleTime").removeClass("erroPers");
			valid = true;
		}
		valid == false;
	}


	return valid;
}

function getDomain() {
	var reg = /^(\w+([-+.']\w+)*)@(\w+([-.]\w+)*\.\w+([-.]\w+)*)$/;
	var match = reg.exec(migration.accounts[0].accountDestiny.mail);
	migration.domain = match[3];
	return match[3];

}
function dateAndTimeSchedule() {
	validDateAndTimeSchedule();
	var dateAndTime = $("#formSchedule input[type='radio']:checked").val();
	if (dateAndTime == "schedule") {
		$("#dateAndTimeSchedule").removeClass("hide");
		let date = $("#scheduleDate").val();
		date = date[8] + date[9] + "/" + date[5] + date[6] + "/" + date[0] + date[1] + date[2] + date[3];

		migration.dateAndTime = date + " " + $("#scheduleTime").val();
		return (date + " " + $("#scheduleTime").val());
	} else {
		$("#dateAndTimeSchedule").addClass("hide");
		migration.dateAndTime = "null";
		return ("null");
	}
}

function loadData() {

	if (!validProvider()) return 0;
	if (migration.accounts.length <= 0) {
		$("#AccountsTableError").removeClass("hide");
		return;
	} else {
		$("#AccountsTableError").addClass("hide");
	}
	if (!validDateAndTimeSchedule()) return 0;
	getDomain();
	renderTableViwer();
	$("#nameProviderView").text("Provedor: " + provider.name);
	$("#severProviderView").text("Servidor IMAP: " + provider.server.host);
	$("#portProviderView").text("Porta IMAP: " + provider.server.port);
	$("#sslProviderView").text("SSL: " + provider.server.ssl);
	var time = dateAndTimeSchedule();
	console.log(time);
	$("#dateAndTime").text("Horário: " + (time == "null" ? "Qualquer momento" : time));


	jQuery.noConflict();
	$("#myModal").modal();
}
function enviar() {
	var date = new Date();
	var milliseconds = date.getMilliseconds();

	var data =  JSON.stringify(
		{
			"idMigration": milliseconds * migration.domain.length,
			"domain": migration.domain,
			"serverSourceIMAP": migration.serverSourceIMAP,
			"serverDestinyIMAP": null,
			"accounts": migration.accounts,
			"dateAndTime": migration.dateAndTime
		}
	);

	console.log(data);
	var settings = {
		"async": true,
		"crossDomain": true,
		"url": "/api",
		"method": "POST",
		"headers": {
			"content-type": "application/json"
		},
		success: function () {
			AlertSuccess("Solicitação enviada com sucesso <br>");
			closeModal();			
		},
		"processData": false,
		"data": data
	}
	console.log(settings);
	$.ajax(settings).done(function (response) {
	});

}




