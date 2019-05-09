function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

var token = getCookie('token');

if (document.location.host == 'gitcourse.kfcoding.com') {
    fetch('http://api.kfcoding.com/api/basic/users/current', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: token
        },
        method: 'GET',
    }).then(resp => resp.json()).then(data => {
        alert(data.status);
        if (data.status !== 200) {
        window.location.href = "http://kfcoding.com/user/login?redirect=" + window.location.href;
        }
    });

    var gitRepo = window.location.href.substr(window.location.href.indexOf("#")+1, window.location.href.length)

    fetch('http://api.kfcoding.com/api/basic/scenes/isIn', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: token
        },
        method: 'POST',
        body: JSON.stringify({repo: gitRepo})
    }).then(resp => resp.json()).then(data => {
        alert(data.staus);
        if (data.status !== 200) {
            window.location.href = "http://kfcoding.com/user/login?redirect=" + window.location.href;
        } else {
            if(!data.data)
                window.location.href = "http://kfcoding.com/account/authBook?redirect=" + window.location.href;
        }
    });

}