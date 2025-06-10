import { LightningElement } from 'lwc';
import getWeatherDetail from '@salesforce/apex/WeatherAppService.getWeatherDetails'
import weatherIcons from '@salesforce/resourceUrl/myWeatherAppIcons';

export default class WeatherApp extends LightningElement {
    clearIcon = weatherIcons + '/weatherAppIcons/clear.svg'
    cloudyIcon = weatherIcons + '/weatherAppIcons/cloud.svg'
    snowIcon = weatherIcons + '/weatherAppIcons/snow.svg'
    hazeIcon = weatherIcons + '/weatherAppIcons/haze.svg'
    rainIcon = weatherIcons + '/weatherAppIcons/rain.svg'
    stormIcon = weatherIcons + '/weatherAppIcons/storm.svg'
    dropletIcon = weatherIcons + '/weatherAppIcons/droplet.svg'
    arrowbackIcon = weatherIcons + '/weatherAppIcons/arrow-back.svg'
    thermometerIcon = weatherIcons + '/weatherAppIcons/thermometer.svg'
    mapIcon = weatherIcons + '/weatherAppIcons/map.svg'

    loadedIcon = ''
    response
    cityname = '';
    loadingText = ''
    isError = false
    hideError = false
    get loadedClasses() {
        return this.isError ? 'error-msg' + (this.hideError ? ' hide-error' : '') : 'success-msg'
    }

    changeHandler(event) {
        const { name, value } = event.target;
        this[name] = value
        //this.cityname = value
        // console.log('name of input is :' + name + 'and value of input field is : ', value)
        if (this.isError && value.trim() !== '') {

            this.hideError = true;

            setTimeout(() => {
                this.isError = false;
                this.loadingText = '';
                this.hideError = false;
            }, 800); // Optional: clear any old error message
        }

    }
    submitHandler(event) {
        const { value } = event.target.elements.cityname

        event.preventDefault()
        this.weatherNow(value)

    }

    weatherNow(city) {
        // console.log('value of cityname var is (this.cityname is used)', this.cityname)
        // const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        // fetch(URL).then(res => res.json()).then(result => {
        //     console.log(result)
        //     console.log('result after apllying stringify method is ', JSON.stringify(result))
        // }).catch(error => {
        //     console.error(error)
        //     console.error('Error in fetching data from weather api')
        // })

        this.loadingText = 'fetching the weather details...'
        getWeatherDetail({ city: city }).then(result => {
            // console.log('result is ', result)
            const parsedData = JSON.parse(result)
            // console.log('parsedData is ', parsedData)
            // console.log('Parsed cod:', parsedData.cod);
            // console.log('Parsed message:', parsedData.message)

            // console.log('Full Parsed Data:\n', JSON.stringify(parsedData, null, 2));
            // console.log('applying after for each method ')
            // console.log('Keys:', Object.keys(parsedData)); // → ['cod', 'message', ...]
            // console.log('Entries:');
            // Object.entries(parsedData).forEach(([key, value]) => {
            //     console.log(`${key}: ${value}`);
            // });

            this.weatherDetails(parsedData)
        }).catch((error) => {
            this.isError = true
            this.loadingText = 'someting went wrong try again after some time'
            // console.error(error)
            // console.log('error from client side : ', error)
            // console.error('error is arising in fetching data from weather api ')
        })
    }

    weatherDetails(returnValue) {
        if (returnValue.cod === '404') {
            this.isError = true
            this.loadingText = this.cityname + ' City name you entered is not a valid one'
        }
        else {
            this.loadingText = ''
            this.isError = ''

            const city = returnValue.name
            const country = returnValue.sys.country
            const { description, id } = returnValue.weather[0]
            const { temp, feels_like, humidity } = returnValue.main
            this.response = {
                city: city,
                temperature: Math.floor(temp),
                description: description,
                location: `${city}, ${country}`,
                feels_like: Math.floor(feels_like),
                humidity: `${humidity}%`
            }

            // this.feelslike = returnValue.main.feels_like
            // this.humidity = returnValue.main.humidity
            // this.temp = returnValue.main.temp
            // this.location = returnValue.sys.country
            // this.city = returnValue.name
            //this.description = returnValue.weather[0].description
            // console.log('description :  ' + description + '  and id is : ' + id)
            if (id >= 200 && id <= 232) {
                this.loadedIcon = this.stormIcon
            }

            else if (id >= 300 && id <= 321) {
                this.loadedIcon = this.dropletIcon
            } else if (id >= 500 && id <= 531) {
                this.loadedIcon = this.rainIcon
            } else if (id >= 600 && id <= 622) {
                this.loadedIcon = this.snowIcon
            }
            else if (id >= 701 && id <= 781) {
                this.loadedIcon = this.hazeIcon
            }

            else if (id == 800) {
                this.loadedIcon = this.clearIcon
            }
            else if (id >= 801 && id <= 804) {
                this.loadedIcon = this.cloudyIcon
            }


        }
    }

    handleClick(event) {
        this.response = ''
        this.loadedIcon = ''
        this.isError = false
        this.cityname = ''

    }
}