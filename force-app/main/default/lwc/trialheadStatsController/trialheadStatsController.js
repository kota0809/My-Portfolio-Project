import { LightningElement, api } from 'lwc';
import portfolioBanner from '@salesforce/resourceUrl/portfolioBanner';

export default class TrialheadStatsController extends LightningElement {

    trailheadRank
    @api badges
    @api points
    @api trails
    @api rank


    renderedCallback() {
        if (this.rank) {
            let path = `${portfolioBanner}/TrailheadBadges/${this.rank}.png`;
            this.trailheadRank = path;
        }

    }
}