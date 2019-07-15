import {estiloMapa} from './js/variables.js';
window.onload = () => {
    
    let mapaGoogle;
    mapaGoogle = new google.maps.Map(document.getElementById('mapa'), {
        center: { lat: -16.4039671, lng: -71.5740311},
        zoom: 8,
        styles: estiloMapa
    });

    let posicionActual = ()=>{
        // solicitar permiso de acceso a ubicaion al navegador
        if(navigator.geolocation){
            // getCurrentPosition(posicion) => funcion que devuelve 
            // informacion de la ubicacion del equipo (Coordenadas, lat y long)
            navigator.geolocation.getCurrentPosition(posicion => {
                console.log(posicion);
                // forma 1
                let {latitude,longitude} = posicion.coords;
                // forma 2
                // let latitude = position.coords.latitude;
                // let longitude = position.coords.longitude;
                var marcador = new google.maps.Marker({position: {lat:latitude,lng:longitude}, map: mapaGoogle});
                mapaGoogle.setCenter({lat:latitude,lng:longitude});
                mapaGoogle.setZoom(16);
            },error => {
                $.notify("No se ha concedido permisos para acceder a tu ubicacion...","error");
                //alert("No se ha concedido permisos para acceder a tu ubicacion...");
                console.log(error);
                
            })
        }else{
            console.log("El navegador no posee Geolocalizacion");
        }
    }
    posicionActual();
}