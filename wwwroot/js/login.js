function setCookie(name, value, days) {
	var d = new Date;
	d.setTime(d.getTime() + 24*60*60*1000*days);
	document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
}

function getCookie(name) {
	var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
	return v ? v[2] : null;
}

function deleteCookie(name) { setCookie(name, '', -1); }

function login() {
	var data = JSON.stringify({
				"mail" : $("#mail").val(),
				"password" : $("#password").val()
		});

	var settings = {
		"async": true,
		"crossDomain": true,
		"url": "/api/user/login",
		"method": "POST",
		"headers": {
			"content-type": "application/json"
		},
		success: function (response){
			setCookie("key", response, Date.now());
			window.location = "/Home/Admin";
		},
		error: function (error) {
			alert('error; ' + eval(error));
		},
		"processData": false,
		"data":data
	}

		$.ajax(settings).done(function (response) {
		
		});
}

