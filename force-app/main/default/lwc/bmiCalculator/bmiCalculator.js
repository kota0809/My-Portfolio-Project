import { LightningElement } from 'lwc';

export default class BmiCalculator extends LightningElement {

    height = ''
    weight = ''
    bmiValue = ''
    result = ''
    changeHandler(event) {
        const { name, value } = event.target
        if (name === 'height') {
            this.height = value
        }
        if (name === 'weight') {
            this.weight = value
        }
    }

    submitHandler(event) {
        event.preventDefault()
        // console.log(this.height);
        //console.log(this.weight);
        this.calculateBMI();
    }

    calculateBMI() {
        let height = Number(this.height) / 100;
        let bmi = Number(this.weight) / (height * height);
        //  console.log("bmi value  is ", bmi);

        this.bmiValue = Number(bmi.toFixed(2));

        //console.log("the bmiValue is : ", this.bmiValue);

        if (this.bmiValue < 18.5) {
            this.result = 'You are Underweight'
        }
        else if (this.bmiValue >= 18.5 && this.bmiValue < 25) {
            this.result = 'You are a Healty Weight Range'
        }
        else if (this.bmiValue >= 25 && this.bmiValue < 30) {
            this.result = 'you are Overweight'
        }
        else {
            this.result = 'you are Obese'
        }

        //c/bmiCalculator console.log("the result is :", this.result);
    }

    reCalculate() {
        this.bmiValue = ''
        this.result = ''
        this.height = ''
        this.weight = ''
    }
}