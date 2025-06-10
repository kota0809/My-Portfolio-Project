import { LightningElement, wire, api } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import AWARDS from '@salesforce/schema/Portfolio__c.Awards__c';
import LANGUAGES from '@salesforce/schema/Portfolio__c.Languages__c'

export default class PortfolioOthers extends LightningElement {

    @api recordId;
    awards = []
    languages = []

    @wire(getRecord, { recordId: "$recordId", fields: [AWARDS, LANGUAGES] })
    handleOthers({ data, error }) {
        if (data) {
            // console.log('awards : ', JSON.stringify(data));
            this.formatData(data);
        }
        if (error) {
            console.log('error in fetching the other resource :', error)
        }
    }

    formatData(data) {

        const { Awards__c, Languages__c } = data.fields;
        this.awards = Awards__c ? Awards__c.value.split(',') : [];
        this.languages = Languages__c ? Languages__c.value.split(',') : [];
    }

}