import { LightningElement, api } from 'lwc';

export default class Notification extends LightningElement {

    showNotification = false;
    message
    variant

    get notifyClasses() {
        const notifiedClass = this.variant === 'success' ? 'slds-theme_success' :
            this.variant === 'error' ? 'slds-theme_error' :
                this.variant === 'warning' ? 'slds-theme_warning' : 'slds-theme_info';

        return `slds-notify slds-notify_toast ${notifiedClass}`;

    }

    @api showToast(message, variant) {
        this.showNotification = true;
        this.message = message
        this.variant = variant

        setTimeout(() => {
            this.showNotification = false;
        }, 5000)
    }
}