
function setCookie(name, value, days) {
    var d = new Date;
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
    document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
}

function getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}

function isLogin() {

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "/api/user/islogin",
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "key": getCookie("key")
        },
        success: function (response) {
            getMigrations();
        },
        error: function (error) {
            window.location = "/Home/Login";
        },
        "processData": false,
        "data": null
    }

    $.ajax(settings).done(function (response) {

    });
}

function RederMigration(migartions) {

    $("#accountListView").empty();
    migartions.forEach((migartion, index) => {
        let date = migartion.dateAndTime != "null" ? migartion.dateAndTime : "Qualquer momento";

        if (migartion.status >= 0 && migartion.status <= 1) {
            let html = "<tr><td>" + migartion.domain + "</td><td>" + date + "</td><td><a href='javascript:migartionModal(" + migartions[index].idMigration + ")'><img src='/images/message.svg'  style='height: 30px;'></a></td></tr>"
            $("#listView").append(html);
        }
    });
}

function migartionModal(id) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "/api/" + id,
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "key": getCookie("key")
        },
        success: function (response) {
            jQuery.noConflict();
            $("#myModal").modal();
            $("#domain").text("Domínio: " + response.domain);
            $("#NumberAccounts").text("Quantidade de contas: " + response.accounts.length);

            switch (response.status) {
                case 0:
                    $("#StatusMigrartion").text("Status: Novo");
                    break;
                case 1:
                    $("#StatusMigrartion").text("Status: Em andamento");
                    break;
                case 2:
                    $("#StatusMigrartion").text("Status: Concluído");
                    break;
            }


            if (response.serverDestinyIMAP == null) {
                $("#ServerHost").val("");
                $("#ServerPort").val("");
                $('#ServerSSL  option[value="' + false + '"').prop("selected", true);
            } else {

                $("#ServerHost").val(response.serverDestinyIMAP.host);
                $("#ServerPort").val(response.serverDestinyIMAP.port);
                $('#ServerSSL  option[value="' + response.serverDestinyIMAP.ssl + '"').prop("selected", true);
            }


            $("#modalFooter").empty()

            let html = "";
            html = html + '<a href="javascript:Update(' + response.idMigration + ');" class="btn btn-primary">salvar alterações</a>';
            html = html + '<a href="javascript:gerarCSV(' + response.idMigration + ');" class="btn btn-primary">Gerar CSV</a>';

            $("#modalFooter").append(html);



        },
        error: function (error) {
            alert("Não foi possivel carregar as migrações")
        },
        "processData": false,
        "data": null
    }

    $.ajax(settings).done(function (response) {

    });

}

function getMigrations() {

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "/api/",
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "key": getCookie("key")
        },
        success: function (response) {
            RederMigration(response);
            return response;
        },
        error: function (error) {
            alert("Não foi possivel carregar as migrações")
        },
        "processData": false,
        "data": null
    }

    $.ajax(settings).done(function (response) {

    });
}

function validProvider() {

    valid = true;
    if ($("#ServerHost").val() == null | $("#ServerHost").val() == "") {
        valid = false;
        $("#ServerHost").addClass("erroPers")
    } else {
        $("#ServerHost").removeClass("erroPers")
    }

    if ($("#ServerPort").val() == null | $("#ServerPort").val() == "") {
        valid = false;
        $("#ServerPort").addClass("erroPers")
    } else {
        $("#ServerPort").removeClass("erroPers")
    }

    if ($("#ServerSSL").val() == null | $("#ServerSSL").val() == "") {
        valid = false;
        $("#ServerSSL").addClass("erroPers")
    } else {
        $("#ServerSSL").removeClass("erroPers")
    }


    return valid;
}

function serverProvider() {
    var providerSelect = $("#provider").val();

    if (!validProvider()) return null;

    provider = {
        "host": $("#ServerHost").val(),
        "port": Number($("#ServerPort").val()),
        "ssl": $("#ServerSSL").val()
    }
    return provider;
}

function Update(id) {

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "/api/" + id,
        "method": "PUT",
        "headers": {
            "content-type": "application/json",
            "key": getCookie("key")
        },
        success: function (response) {
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "/api/status/" + id + "/" + $("#status").val(),
                "method": "PUT",
                "headers": {
                    "content-type": "application/json",
                    "key": getCookie("key")
                },
                success: function (response) {

                    alert("Alterado")

                    if($("#status").val() == 2){
                        window.location.href = '/Home/Admin'
                    }
                },
                "processData": false,
                "data": null
            }
            $.ajax(settings).done(function (response) {

            });
        },
        "processData": false,
        "data": JSON.stringify(serverProvider())
    }
    $.ajax(settings).done(function (response) {

    });

}

function gerarCSV(id, ) {
    if (!validProvider()) {

        return;
    }

    Update(id);
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "/api/csv/" + id,
        "method": "GET",
        "headers": {
            "content-type": "text/csv",
            "key": getCookie("key")
        },
        success: function (file) {
            var a = document.createElement('a'), blob, url;
            if (typeof a.download === 'undefined') {
                alert('download não suportado pelo navegador');
            } else {
                // criar "arquivo", conteúdo como array e tipo como objeto
                blob = new Blob([file], { type: 'text/csv' });
                // criar URL para arquivo criado
                url = URL.createObjectURL(blob);
                a.href = url;
                // atribuir nome de download do arquivo
                a.download = id + '.csv';
                // fazer download
                a.click();
                // revogar URL criada
                URL.revokeObjectURL(url);
            }
        },
        "processData": false,
        "data": null
    }
    $.ajax(settings).done(function (response) {

    });

}

$(document).ready(function () {

    isLogin();


});
