import { LightningElement, wire } from 'lwc';
import getRecords from '@salesforce/apex/RequestManager.getRecords';
const records = [
    { label: 'Nombre', fieldName: 'Name' },
    { label: 'Asunto', fieldName: 'Subject__c' },
    { label: 'Estado', fieldName: 'Status__c' },
    { label: 'Fecha de resolución', fieldName: 'Resolution_Date__c', type: 'date' }
];
export default class SupportRequestList extends LightningElement {

    columns = records;

    @wire(getRecords)
    requests;
}