
import { LightningElement, wire } from 'lwc';

import getRecords from
    '@salesforce/apex/RequestManager.getRecords';

import { refreshApex } from '@salesforce/apex';

import {
    MessageContext,
    subscribe,
    unsubscribe,
    APPLICATION_SCOPE
} from 'lightning/messageService';

import REQUEST_CREATED from
    '@salesforce/messageChannel/RequestCreated__c';

const COLUMNS = [
    { label: 'Nombre', fieldName: 'Name' },
    { label: 'Asunto', fieldName: 'Subject__c' },
    { label: 'Estado', fieldName: 'Status__c' },
    { label: 'Prioridad', fieldName: 'Priority__c' },
    {
        label: 'Fecha de resolución',
        fieldName: 'Resolution_Date__c',
        type: 'date'
    }
];

export default class SupportRequestList extends LightningElement {

    columns = COLUMNS;

    subscription = null;

    wiredRequests;


    @wire(MessageContext)
    messageContext;

    @wire(getRecords)
    wiredRecords(result) {
        this.wiredRequests = result;
    }

    get hasData() {
        return this.wiredRequests?.data !== undefined;
    }

    get hasError() {
        return this.wiredRequests?.error !== undefined;
    }

    get requests() {
        return this.wiredRequests?.data || [];
    }

    get isEmpty() {
        return this.requests.length === 0;
    }

    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    subscribeToMessageChannel() {
        if (this.subscription || !this.messageContext) {
            return;
        }

        this.subscription = subscribe(
            this.messageContext,
            REQUEST_CREATED,
            (message) => this.handleMessage(message),
            { scope: APPLICATION_SCOPE }
        );
    }

    async handleMessage(message) {
        console.log('Solicitud creada:', message.recordId);

        if (this.wiredRequests) {
            await refreshApex(this.wiredRequests);
        }
    }

    disconnectedCallback() {
        if (this.subscription) {
            unsubscribe(this.subscription);
            this.subscription = null;
        }
    }
}
