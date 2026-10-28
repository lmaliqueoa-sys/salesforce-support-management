trigger SupportRequestTrigger on Support_Request__c (before update) {
    for (Support_Request__c request : Trigger.new) {
        Support_Request__c oldRequest = Trigger.oldMap.get(request.Id);
        if (request.Status__c =='Cerrado' && oldRequest.Status__c != 'Cerrado') {
            request.Resolution_Date__c = Date.today();
        }
    }
}