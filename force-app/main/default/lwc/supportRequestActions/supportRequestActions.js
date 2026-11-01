
import { LightningElement, wire } from 'lwc';

import SupportRequestForm from 'c/supportRequestForm';

import {
    MessageContext,
    publish
} from 'lightning/messageService';

import REQUEST_CREATED from
    '@salesforce/messageChannel/RequestCreated__c';

import { ShowToastEvent } from
    'lightning/platformShowToastEvent';

export default class SupportRequestActions extends LightningElement {

    @wire(MessageContext)
    messageContext;

    async handleNewRequest() {
        try {
            const result = await SupportRequestForm.open({
                size: 'medium',
                label: 'Nueva solicitud de soporte'
            });

            if (result?.saved) {

                // Publicar mensaje a los componentes suscritos
                const payload = {
                    recordId: result.recordId
                };

                publish(
                    this.messageContext,
                    REQUEST_CREATED,
                    payload
                );

                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Solicitud creada',
                        message: 'El registro se guardó correctamente.',
                        variant: 'success'
                    })
                );
            }

        } catch (error) {
            console.error(
                'Error al abrir el formulario:',
                JSON.stringify(error)
            );
        }
    }
}
