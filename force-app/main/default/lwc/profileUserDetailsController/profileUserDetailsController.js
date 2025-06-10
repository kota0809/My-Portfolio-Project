import { LightningElement, api, wire } from 'lwc';

export default class ProfileUserDetailsController extends LightningElement {

    @api recordId
    @api objectApiName
    @api resumeUrl

    downloadResume() {
        window.open(this.resumeUrl, "_blank")
    }
}

//https://github.com/kota0809/madhu-resume/raw/main/MyResume%20(1).pdf"