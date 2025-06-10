import { LightningElement, wire, api } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi'
import technicalskills from '@salesforce/schema/Portfolio__c.TechnicalSkills__c'
import softskills from '@salesforce/schema/Portfolio__c.SoftSkills__c'
import methodologies from '@salesforce/schema/Portfolio__c.SoftwareMethodologies__c'
import softwaretools from '@salesforce/schema/Portfolio__c.SoftwareTools__c'

export default class PortfolioSkills extends LightningElement {

    techSkills = []
    softSkills = []
    softwareTools = []
    Methodologies = []


    @api recordId

    @wire(getRecord, { recordId: "$recordId", fields: [technicalskills, softskills, methodologies, softwaretools] })
    skillHandler({ data, error }) {
        if (data) {

            //console.log('skill details : ', JSON.stringify(data))
            this.formatSkills(data)
        }
        if (error) {
            console.error('error in fetching skills :', error)
        }
    }
    formatSkills(data) {

        const { TechnicalSkills__c, SoftSkills__c, SoftwareMethodologies__c, SoftwareTools__c } = data.fields
        this.techSkills = TechnicalSkills__c ? TechnicalSkills__c.value.split(',') : []
        this.softSkills = SoftSkills__c ? SoftSkills__c.value.split(',') : []
        this.Methodologies = SoftwareMethodologies__c ? SoftwareMethodologies__c.value.split(',') : []
        this.softwareTools = SoftwareTools__c ? SoftwareTools__c.value.split(',') : []

        // console.log('skill details : ', this.techSkills) LWC wraps public and reactive properties like 
        // this.techSkills in a Proxy to track mutations and reactivity.
        //  When you console.log them directly, 
        // the browser may display them as Proxy(Array) {} depending on how the Chrome DevTools interprets Proxies in the moment of logging.

    }

}