window.addEventListener('load', ()=>{
    let lon;
    let lat;

    let temperaturaValor = document.getElementById('temperatura-valor')
    let temperaturaDescripcion = document.getElementById('temperatura-descripcion')

    let ubicacion = document.getElementById('ubicacion')
    let iconoAnimado = document.getElementById('icono-animado')

    let vientoVelocidad = document.getElementById('viento-velocidad')


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(posicion =>{
            lat = posicion.coords.latitude
            lon = posicion.coords.longitude
            //Ubicacion actual
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=es&units=metric&appid=24d893f5f3b54623fbb5a71b121c63e6`
            
            
            //Ubicacion por ciudad
            //const url = 'https://api.openweathermap.org/data/2.5/weather?q=Posadas&lang=es&units=metric&appid=24d893f5f3b54623fbb5a71b121c63e6'
            //console.log(url)
            
            fetch(url)
            .then(response => {return response.json()})
            .then(data => {
                let temp = Math.round(data.main.temp)
                temperaturaValor.textContent = `${temp} °C`
                let desc = data.weather[0].description
                temperaturaDescripcion.textContent = desc.toUpperCase()
                ubicacion.textContent = data.name
                vientoVelocidad.textContent = `${data.wind.speed} m/s`
                //console.log(data)
                

                //iconos estáticos
                /*
                console.log(data.weather[0].icon)
                let iconCode = data.weather[0].icon
                const urlIcon = `https://openweathermap.org/img/wn/${iconCode}.png`
                console.log(urlIcon)  
                */


                //para iconos animados
                console.log(data.weather[0].main)
                switch(data.weather[0].main){
                    case 'Clear':
                        iconoAnimado.src = 'animations/animated/day.svg'
                        console.log('LIMPIO')
                    break;
                    case 'Clouds':
                        iconoAnimado.src = 'animations/animated/cloudy-day-1.svg'
                        console.log('NUBES')
                    break;
                    case 'Rain':
                        iconoAnimado.src = 'animations/animated/rainy-7.svg'
                        console.log('LLUVIA')
                    break;
                    case 'Snow':
                        iconoAnimado.src = 'animations/animated/snowy-6.svg'
                        console.log('NIEVE')
                    break;
                    case 'Thunderstorm':
                        iconoAnimado.src = 'animations/animated/thunder.svg'
                        console.log('TORMENTA')
                    break;
                    case 'Drizzle':
                        iconoAnimado.src = 'animations/animated/rainy-2.svg'
                        console.log('TORMENTA')
                    break;
                    case 'Atmosphere':
                        iconoAnimado.src = 'animations/animated/weather.svg'
                        console.log('ATMOSFERA')
                    break;
                    default:
                }

            })
            .catch(error=>{
                console.log(error)
            })
        })
    }
})