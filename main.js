import {estiloMapa} from './js/variables.js';
window.onload = () => {
    var coordenadaAnterior;
    
    let mapaGoogle;
    mapaGoogle = new google.maps.Map(document.getElementById('mapa'), {
        center: { lat: -14, lng: -70},
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
                let marcador = new google.maps.Marker({position: {lat:latitude,lng:longitude}, map: mapaGoogle});
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

    let configurarListeners = ()=>{
        // asignando un evento click al mapa e google
        mapaGoogle.addListener('click',(e)=>{
            $.notify("Se hizo clock en el mapa","success");
            // imprimiendo las coordenadas de donde se ha efectuado el click en el mapa
            console.log(e.latLng.lat());
            console.log(e.latLng.lng());
            // console.log(e);
            // Colocando un marcador en el mapa
            let marcadorNuevo = new google.maps.Marker({position: {lat:e.latLng.lat(),lng:e.latLng.lng()},map: mapaGoogle,icon: './icons/bus.png'});

            // dibujando un polyline entre la coordenada anterior y el nuevo punto
            // en el primer click, "coordenadaAnterior", sera [undefined]
            // es por ello que debera entrar a la zona del "else"
            // del segundo en adelante 

            if(coordenadaAnterior){
                console.log("ya existe una coordenada anterior");

                let coordenadas = [
                    {lat: e.latLng.lat(), lng: e.latLng.lng()},
                    {lat: coordenadaAnterior.lat, lng: coordenadaAnterior.lng}
                  ];

                var lineaBlanca = new google.maps.Polyline({
                path: coordenadas,
                geodesic: true,
                strokeColor: '#FFFFFF',
                strokeOpacity: 1.0,
                strokeWeight: 2
                });

                lineaBlanca.setMap(mapaGoogle);

                coordenadaAnterior = {
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng()
                }
            }else{
                console.log("Primer click.");
                coordenadaAnterior = {
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng()
                }
            }
        })
    }
    posicionActual();
    configurarListeners();
}