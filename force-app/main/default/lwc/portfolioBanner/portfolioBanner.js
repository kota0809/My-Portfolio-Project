import { LightningElement, wire, api } from 'lwc';
import portfolioBanner from '@salesforce/resourceUrl/portfolioBanner'
import { getRecord, getFieldValue } from 'lightning/uiRecordApi'
import FullName from '@salesforce/schema/Portfolio__c.Full_Name__c';
import Designation from '@salesforce/schema/Portfolio__c.Designation__c';
import Address from '@salesforce/schema/Portfolio__c.Address__c'

export default class PortfolioBanner extends LightningElement {

    @api recordId
    profile = portfolioBanner + '/myPortfolioAssets/mypic.jpg'
    linkedIn = portfolioBanner + '/Social/linkedIn.png'
    github = portfolioBanner + '/Social/github.png'
    @api linkedInUrl
    @api githubUrl

    @wire(getRecord, { recordId: '$recordId', fields: [FullName, Designation, Address] })
    // portfolioHandler({ data, error }) {
    //     if (data) {
    //         console.log('portfolio data is :', JSON.stringify(data))
    //     }
    //     if (error) {
    //         console.error('error is : ', error)
    //     }

    // }
    portfolioData

    get fullName() {
        return getFieldValue(this.portfolioData.data, FullName)
    }
    get designation() {
        return getFieldValue(this.portfolioData.data, Designation)
    }
    get address() {
        return getFieldValue(this.portfolioData.data, Address)
    }
}