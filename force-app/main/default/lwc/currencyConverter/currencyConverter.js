import { LightningElement } from 'lwc';
import { countryCodeList } from 'c/countryCodeList';
import currencyconverterassets from '@salesforce/resourceUrl/myCurrencyConverter'
import getExchangeRate from '@salesforce/apex/CurrencyConverterService.getExchangeRate';
export default class CurrencyConverter extends LightningElement {
    currencyImg = currencyconverterassets + '/exchange-money.svg'

    countryList = countryCodeList
    amount = ''
    countryFrom = 'INR'
    countryTo = 'USD'
    result = ''
    error = ''
    handleChange(event) {
        const { name, value } = event.target
        // console.log('name', name)
        // console.log('value', value)
        //  console.log('amount', this.amount)
        this[name] = value
        this.result = ''
        this.error = ''
    }

    handleSubmit(event) {
        event.preventDefault()
        this.convert()
    }

    async convert() {
        // const API_KEY = 'aa54d7d2a9693176ea6c5f55'
        // const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${this.countryFrom}/${this.countryTo}`

        try {
            // const data = await fetch(API_URL)
            // const jsonData = await data.json()
            //    console.log('jsonData :', jsonData)
            //    console.log('conversion_rates :', jsonData.conversion_rates)
            //     debugger;
            //     this.result = (jsonData.conversion_rates * Number(this.amount)).toFixed(2)
            //     console.log('result : ', this.result)
            const jsonData = await getExchangeRate({
                countryFrom: this.countryFrom,
                countryTo: this.countryTo
            })

            // console.log(jsonData)
            const parsedData = JSON.parse(jsonData)
            // console.log('conversion-rate  after parsing the json data which is in string form to javascript object : ', parsedData.conversion_rate)
            let money = Number(this.amount)
            this.result = (money * parsedData.conversion_rate).toFixed(2)
            // console.log('the final result is : ', this.result)
        }
        catch (error) {
            this.error = error
            // console.log('error is :', this.error)
            this.error = "An error occurred. Please try again..."
        }

    }

}