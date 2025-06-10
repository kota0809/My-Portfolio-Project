import { LightningElement, wire } from 'lwc';
import createNoteRecord from '@salesforce/apex/NoteTakingController.createNoteRecord';
import getNotes from '@salesforce/apex/NoteTakingController.getNotes';
import updateNoteRecord from '@salesforce/apex/NoteTakingController.updateNoteRecord';
import deleteNoteRecord from '@salesforce/apex/NoteTakingController.deleteNoteRecord';
import { refreshApex } from '@salesforce/apex';
import LightningConfirm from 'lightning/confirm'


const Default_Note_Record =
{
    Name: '',
    Note_Description__c: ''
}
export default class NotetakingApp extends LightningElement {

    showmodal = false;
    selectedRecordId
    wiredNoteRecords

    noteRecord = Default_Note_Record

    noteList = []

    formats = [
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'list',
        'indent',
        'align',
        'link',
        'clean',
        'table',
        'header',
        'color',
    ];
    @wire(getNotes)
    noteListInfo(result) {
        this.wiredNoteRecords = result
        const { data, error } = result;
        if (data) {
            // this.noteList = data
            console.log('note list after stringify :', JSON.stringify(data))
            //  console.log('the note list is : ', this.noteList)
            this.noteList = data.map(item => {
                let formatedDate = new Date(item.LastModifiedDate).toDateString()

                return { ...item, formatedDate }
            })
        }
        if (error) {
            console.error('There is an error in fetching notes : ', error)
            this.showToastMsg(error.message.body, 'error')
        }
    }

    get modalName() {
        return this.selectedRecordId ? 'Update Note' : 'Add Note';
    }

    changeHandler(event) {

        const { name, value } = event.target

        this.noteRecord = { ...this.noteRecord, [name]: value }
    }
    createNoteHandler() {
        this.showmodal = true;
    }

    cancelHandler() {
        this.showmodal = false
        this.noteRecord = Default_Note_Record
        this.selectedRecordId = null
    }

    submitHandler(event) {
        event.preventDefault();
        this.showmodal = false;
        console.log('the title : ' + this.noteRecord.Name)
        console.log('the description : ' + this.noteRecord.Note_Description__c)
        if (this.selectedRecordId) {
            this.updateNote(this.selectedRecordId)
        } else {
            this.createNote()
        }


    }

    get isFormInvalid() {
        return this.noteRecord && this.noteRecord.Name && this.noteRecord.Note_Description__c ? false : true
    }

    createNote() {
        createNoteRecord({
            title: this.noteRecord.Name,
            description: this.noteRecord.Note_Description__c
        }).then(() => {
            this.showmodal = false
            this.selectedRecordId = null
            this.refresh()
            console.log('the note is created successfully')
            this.showToastMsg('The note is created successfully !!!', 'success')
        }).catch(error => {
            console.error('error ', error.message.body)
            this.showToastMsg(error.message.body, 'error')
        })
    }

    showToastMsg(message, variant) {

        const ele = this.template.querySelector('c-notification')
        if (ele) {
            ele.showToast(message, variant);
        }

    }

    editNoteHandler(event) {

        const recordId = event.target.dataset.recordid
        const letNoteRecord = this.noteList.find(item => item.Id === recordId)
        this.noteRecord = {
            Name: letNoteRecord.Name,
            Note_Description__c: letNoteRecord.Note_Description__c
        }

        this.selectedRecordId = recordId
        this.showmodal = true;
    }

    updateNote(recordId) {

        const { Name, Note_Description__c } = this.noteRecord
        updateNoteRecord({
            "NoteId": recordId,
            "title": Name,
            "description": Note_Description__c
        }).then(() => {
            this.selectedRecordId = null
            this.showmodal = false
            this.refresh()
            this.showToastMsg('The note is updated successfully!!!', 'success')
        }).catch(error => {
            console.error('error', error)
            this.showToastMsg(error.message.body, 'error')
        })
    }

    deleteNoteHandler(event) {
        this.selectedRecordId = event.target.dataset.recordid

        this.handleConfirm()
    }

    async handleConfirm() {

        const result = await LightningConfirm.open({
            message: 'Are you sure you want to delete this note?',
            label: 'Delete ?',
            variant: 'headerless'
        })
        if (result) {
            this.handleDelete()
        } else {
            this.selectedRecordId = null;
        }

    }

    handleDelete() {

        deleteNoteRecord({ noteId: this.selectedRecordId }).then(() => {
            this.showmodal = false;
            this.showToastMsg('Note Record is deleted successfully!!!', 'success')
            this.selectedRecordId = null
            this.refresh()
        }).catch(error => {
            this.showToastMsg(error.message.body, 'error')
            console.error(error)
        })

    }

    refresh() {
        refreshApex(this.wiredNoteRecords)
    }


}

