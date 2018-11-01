import config from "./config";
import redirect from "./bootstrap";

$(function () {
    // getMenu()
    // getUser()
    // getBack()
})

function getMenu() {
    $.ajax({
        url: config.apiUrl + '/modules',
        type: 'get',
        headers: config.getHeaders(),
        data: {
            include: 'apps.methods'
        },
        statusCode: config.getStatusCode(),
    }).done(function (response) {
        let path = window.location.pathname
        let pathArray = path.split('/')
        if (pathArray.length > 1 && pathArray[0] == '') {
            pathArray.shift()
        }

        let modules = response.data
        var html = ''
        for (var i = 0; i < modules.length; i++) {
            let module = modules[i]
            var modulesHtml = ''

            let apps = module.apps.data
            if (apps.length > 0) {
                modulesHtml = '<li class="site-menu-category">' + module.name + '</li>';


                for (var j = 0; j < apps.length; j++) {
                    let app = apps[j]
                    let methods = app.methods.data
                    //判断是否激活
                    var appHtml = '<li class="site-menu-item has-sub">';


                    if (pathArray[0] === module.code && pathArray[1] === app.code) {
                        appHtml = '<li class="site-menu-item has-sub open active">';
                    }

                    if (methods.length > 0) {
                        appHtml += '<a href="javascript:void(0)">'
                    } else {
                        appHtml += '<a href="/' + module.code + '/' + app.code + '">'
                    }
                    appHtml += '<i class="site-menu-icon md-' + app.icon + '" aria-hidden="true"></i>'
                    appHtml += '<span class="site-menu-title">' + app.name + '</span>'
                    if (methods.length > 0) {
                        appHtml += '<span class="site-menu-arrow"></span>'
                    }
                    appHtml += '</a>'

                    if (methods.length > 0) {
                        var methodHtml = '<ul class="site-menu-sub">';
                        for (var k = 0; k < methods.length; k++) {
                            let method = methods[k]

                            var methodItem = '<li class="site-menu-item ">'
                            //判断是否激活
                            if (pathArray[2] === method.code) {
                                methodItem = '<li class="site-menu-item active">'
                            }
                            methodItem += '<a class="animsition-link" href="/' + module.code + '/' + app.code + '/' + method.code + '">' +
                                '<span class="site-menu-title">' + method.name + '</span>' +
                                '</a>' +
                                '</li>';
                            methodHtml += methodItem
                        }
                        methodHtml += '</ul>'
                        appHtml += methodHtml
                    }

                    appHtml += '</li>'

                    modulesHtml += appHtml
                }
            }
            html += modulesHtml
        }

        $('#left-menu').append(html)

    })


}

function getBack() {
    $('#toggleMenubar').click(function () {
        window.history.back();
    })
}

function getUser() {
    $.ajax({
        url: config.apiUrl + '/users/my',
        type: 'get',
        headers: config.getHeaders(),
        statusCode: config.getStatusCode(),
    }).done(function (response) {
        let data = response.data;
        $('#user-avatar').attr('src', data.avatar);
        $('#user-nickname').text(data.nickname)
    })
}