import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'


export default function Home() {

  var apiKey = "f1c3aba9f416efdb16702d2866709e98";
  const location = "vancouver";
  var lang = "en";
  var units = "metric";
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=${units}&appid=${apiKey}&lang=${lang}`;

  const [data, setData] = useState();
  const grabWeather = useRef(false);

  const fetchWeather = async () => {
    const response = await axios.get(url);
    console.log(response);

    console.log(response.data.list);
    const arrayOfDays = [];

    let weatherData = response.data.list.map((weather, index)=>{
      console.log(parseInt(weather.dt_txt.substr(8,2),10))
      let num = parseInt(weather.dt_txt.substr(8,2),10)

      if (num !== arrayOfDays.find(element => element === num)) {
        arrayOfDays.push(num);
        console.log("Here");
        console.log(response.data.list[index]);

        var month = '';
        var icon = '';

        if (weather.dt_txt.substr(5,2) == 1){
          month = 'January';
        } else if (weather.dt_txt.substr(5,2) == 2){
          month = 'February';
        }else if (weather.dt_txt.substr(5,2) == 3){
          month = 'March';
        }else if (weather.dt_txt.substr(5,2) == 4){
          month = 'April';
        }else if (weather.dt_txt.substr(5,2) == 5){
          month = 'May';
        }else if (weather.dt_txt.substr(5,2) == 6){
          month = 'June';
        }else if (weather.dt_txt.substr(5,2) == 7){
          month = 'July';
        }else if (weather.dt_txt.substr(5,2) == 8){
          month = 'August';
        }else if (weather.dt_txt.substr(5,2) == 9){
          month = 'September';
        }else if (weather.dt_txt.substr(5,2) == 10){
          month = 'October';
        }else if (weather.dt_txt.substr(5,2) == 11){
          month = 'November';
        }else if (weather.dt_txt.substr(5,2) == 12){
          month = 'December';
        }

        if (weather.weather[0].main == "Clouds"){
          icon = '/weather icons/clouds.svg'
        } else if(weather.weather[0].main == "Clear"){
          icon = '/weather icons/sun.svg'
        }else if(weather.weather[0].main == "Atmosphere"){
          icon = '/weather icons/mist.svg'
        }else if(weather.weather[0].main == "Rain"){
          icon = '/weather icons/rain.svg'
        }else if(weather.weather[0].main == "Drizzle"){
          icon = '/weather icons/rain.svg'
        }else if(weather.weather[0].main == "Snow"){
          icon = '/weather icons/snow.svg'
        }else if(weather.weather[0].main == "Thunderstorm"){
          icon = '/weather icons/thunderstorm.svg'
        }
        

        var now = new Date(weather.dt_txt);
        var days = ["Sunday", "Monday", "Tuesday", "Wednsday", "Thursday", "Friday", "Saturday"];
        var day = days[now.getDay()];

        return(
          <div key={index} style={{width:"200px", display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
            <Image
            src={icon}
            alt={icon}
            width={180}
            height={180}
            priority
            />
            <div>{weather.main.temp.toFixed(1)}°</div>
            <div>{weather.weather[0].main}</div>
            <p>
              {day} <br /> {month} {weather.dt_txt.substr(8,2)}, {weather.dt_txt.substr(0,4)}
            </p>
          </div>
        )
      }
    })
    console.log(arrayOfDays);
    setData(weatherData);
  }

  useEffect (() => {
    if(grabWeather.current === true) {
      fetchWeather();
    }

    return () => {
      grabWeather.current = true;
    }
  }, [])

  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`


  return (
    <>
      {/* <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.svg.ico" />
      </Head> */}
      <main style={{width:"100vw", display:"flex", flexDirection: "column", justifyContent:'center', alignItems:'center'}}>
          <div>
          <Image 
          className={styles.logo}
          src="/logo.png"
          alt="Next.js Logo"
          width={300}
          height={200}
          priority
          />
          </div>

          <div >
          <p>
            Vancouver <br/>
            Last Update: {date}
          </p>
          {/* <div>
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
            >
              By{' '}
              Renata
            </a>
          </div> */}
        </div>

        <div style={{display:"flex", flexDirection:"row", flexWrap:"wrap"}}>
          {data}
        </div>

      </main>
    </>
  )
}
