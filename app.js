document.getElementById('weatherForm').addEventListener('submit', function(e) {
    e.preventDefault();

    let city = document.getElementById('city').value.trim();
    let country = document.getElementById('country').value.trim();
    let apiKey = '7d546aed7c5335914632902cbe10636d'; 
    if (!city) {
        alert('Por favor, ingresa una ciudad.');
        return;
    }

    let query = city;
    if (country) {
        query += `,${country}`;
    }

    // Mostrar un indicador de carga
    document.getElementById('weatherResult').innerHTML = `<p>Cargando...</p>`;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(query)}&appid=${apiKey}&units=metric&lang=es`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                let iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

                let result = `
                    <h2>Clima en ${data.name}, ${data.sys.country}</h2>
                    <img src="${iconUrl}" alt="Icono del clima">
                    <p><strong>Temperatura:</strong> ${data.main.temp}°C</p>
                    <p><strong>Descripción:</strong> ${data.weather[0].description}</p>
                    <p><strong>Humedad:</strong> ${data.main.humidity}%</p>
                    <p><strong>Viento:</strong> ${data.wind.speed} m/s</p>
                `;
                document.getElementById('weatherResult').innerHTML = result;
            } else {
                document.getElementById('weatherResult').innerHTML = `<p>Ciudad no encontrada. Por favor, verifica el nombre e intenta nuevamente.</p>`;
            }
        })
        .catch(error => {
            console.error('Error al obtener los datos del clima:', error);
            document.getElementById('weatherResult').innerHTML = `<p>Error al obtener los datos. Inténtalo de nuevo más tarde.</p>`;
        });
});
