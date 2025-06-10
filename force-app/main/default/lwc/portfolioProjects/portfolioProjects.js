import { LightningElement } from 'lwc';
import portfolioBanner from '@salesforce/resourceUrl/portfolioBanner';

export default class PortfolioProjects extends LightningElement {

    bmiCalculator = `${portfolioBanner}/projects/bmi-app.png`
    currencyConverter = `${portfolioBanner}/projects/currency-converter.png`
    weatherApp = `${portfolioBanner}/projects/weather-app.png`
    noteTakingApp = `${portfolioBanner}/projects/note-taking-app.png`

    projects = [

        {
            "name": "BMI Calculator",
            "image": this.bmiCalculator,
            "link": "https://madhukota-dev-ed.develop.my.site.com/bmi-calculator"
        },
        {
            "name": "Currency Converter",
            "image": this.currencyConverter,
            "link": "https://madhukota-dev-ed.develop.my.site.com/currency-converter"
        },
        {
            "name": "Note Taking App",
            "image": this.noteTakingApp,
            "link": "https://madhukota-dev-ed.develop.my.site.com/note-taking-app"
        },
        {
            "name": "Weather App",
            "image": this.weatherApp,
            "link": "https://madhukota-dev-ed.develop.my.site.com/weather-app"
        }
    ]


}