document.getElementById('form').addEventListener("submit", async function (event) {
            event.preventDefault();
            let inputCity = document.getElementById('input-data').value;

            console.log(inputCity);

            if (inputCity !== '') {
                warning("Carregando...");
                clearInfo();

                let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(inputCity)}&appid=577721f652794556e25cae5dd4c03032&units=metric&lang=pt_br`;

                let results = await fetch(url);
                let urlJson = await results.json();
         
                console.log(urlJson)
                
                if (urlJson.cod === 200) {
                    let obj =  {
                        name: urlJson.name,
                        pais: urlJson.sys.country,
                        temp: urlJson.main.temp,
                        wind: urlJson.wind.speed,
                        icon: urlJson.weather[0].icon,
                        description: urlJson.weather[0].description
                    }
                    answer(obj)
                }else {
                    clearInfo();
                    warning("Cidade não encontrada...")
                }


                function answer(obj) {
                    warning('');
                    document.querySelector('.results').style.display = 'block';
                    document.querySelector('.title').innerHTML = `${obj.name}, ${obj.pais}`;
                    document.querySelector('.temp').innerHTML = `${obj.temp}<sup> ºC</sup>`;
                    document.querySelector('.wind').innerHTML = `${obj.wind} Km/h`;
                    document.querySelector('.image').setAttribute("src", `http://openweathermap.org/img/wn/${obj.icon}@2x.png`);
                    document.querySelector('.description').innerHTML = `${obj.description}`;
                }
                

                function warning(msg) {
                    document.querySelector('.message').innerHTML = msg;
                }

                function clearInfo() {
                    warning('');
                    document.querySelector('.results').style.display = 'none';
                }

            }


            });











        const dateCurrent = new Date();
        const year = dateCurrent.getFullYear(); document.getElementById('year').innerHTML = year;