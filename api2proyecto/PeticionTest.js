function get(){
    var fetch = require("node-fetch");
    fetch('http://192.168.0.35:3031/getTipoUsuario')
        .then(response => response.json())
        .then(json => console.log(json))
}
get();
