import { LightningElement, api, wire } from 'lwc';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';

const COLUMNS = [
    { label: 'Education', fieldName: 'Education' },
    { label: 'Institution Name', fieldName: 'InstitutionName' },
    { label: 'Passing Year', fieldName: 'PassingYear' },
    { label: 'CGPA/Percentage', fieldName: 'result' },
];

export default class PortfolioEducation extends LightningElement {
    columns = COLUMNS
    tableData = []
    @api recordId

    @wire(getRelatedListRecords, {
        parentRecordId: "$recordId",
        relatedListId: 'Educations__r',
        fields: ['Education__c.InstitutionName__c', 'Education__c.Title__c', 'Education__c.PassingYear__c', 'Education__c.CGPA_Percentage__c'],
        sortBy: ['Education__c.PassingYear__c']
    }) EducationHandler({ data, error }) {
        if (data) {
            //  console.log('education details : ', JSON.stringify(data))
            this.formatEducationDetails(data)
        }

        if (error) {
            console.error('error in fetching education details : ', error)

        }
    }

    formatEducationDetails(data) {
        this.tableData = [...data.records].reverse().map(item => {
            let Id = item.id
            const { InstitutionName__c, Title__c, PassingYear__c, CGPA_Percentage__c } = item.fields
            let Education = Title__c.value;
            let InstitutionName = InstitutionName__c.value;
            let PassingYear = PassingYear__c.value;
            let result = CGPA_Percentage__c.value;
            return { Id, Education, InstitutionName, PassingYear, result }
        })

        // console.log('table data is : ', JSON.stringify(this.tableData))


    }
}