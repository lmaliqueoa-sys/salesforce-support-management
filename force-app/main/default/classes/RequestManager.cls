public with sharing class RequestManager {
    @AuraEnabled(cacheable=true)
    public static list<Support_Request__c> getRecords() {
        List<Support_Request__c> requests = [SELECT Id, Name, Subject__c, Status__c, Resolution_Date__c FROM Support_Request__c];
        return requests;
    }
}