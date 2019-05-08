function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

if (document.location.host == 'gitcourse.kfcoding.com') {

    fetch('http://api.kfcoding.com/api/basic/users/current', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: getCookie('token')
        },
        method: 'GET',
    }).then(resp => resp.json()).then(data => {
        if (data.status !== 200) {
        window.location.href = "http://kfcoding.com/user/login?redirect=" + window.location.href;
        }
    });

    alert(window.location.href.substr(window.location.href.indexOf("#"), window.location.href.length));


    // fetch('http://api.kfcoding.com/api/basic/scenes/isin/', {
    //     headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: getCookie('token')
    //     },
    //     method: 'GET',
    // }).then(resp => resp.json()).then(data => {
    //     if (data.status !== 200) {
    //     window.location.href = "http://kfcoding.com/user/login?redirect=" + window.location.href;
    //     }
    // });

}