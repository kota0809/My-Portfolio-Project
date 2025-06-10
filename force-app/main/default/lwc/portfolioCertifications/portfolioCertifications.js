import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import SalesforceCertifications from '@salesforce/schema/Portfolio__c.SalesforceCertifications__c'
import OtherCertificates from '@salesforce/schema/Portfolio__c.OtherCertificates__c'

export default class PortfolioCertifications extends LightningElement {

    @api recordId;

    salesforceCertifications = [];
    otherCertificates = [];

    @wire(getRecord, { recordId: '$recordId', fields: [SalesforceCertifications, OtherCertificates] })
    handleCertificates({ data, error }) {
        if (data) {
            //  console.log("Certificates : ", JSON.stringify(data))
            this.formatData(data)
        }
        if (error) {
            console.error('error in fetching the certificate record');
        }
    }

    formatData(data) {

        const { SalesforceCertifications__c, OtherCertificates__c } = data.fields
        this.salesforceCertifications = SalesforceCertifications__c ? SalesforceCertifications__c.value.split(';') : []
        this.otherCertificates = OtherCertificates__c ? OtherCertificates__c.value.split(';') : []

        // console.log(' salesforce certi:', this.salesforceCertifications) // it will print proxy use JSON.stringify(); method view 
        // console.log('other certi : ', this.otherCertificates)
    }
}