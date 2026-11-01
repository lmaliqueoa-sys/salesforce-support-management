
import LightningModal from 'lightning/modal';

export default class SupportRequestForm extends LightningModal {

    handleSuccess(event) {
        console.log('Registro creado:', event.detail.id);

        this.close({
            saved: true,
            recordId: event.detail.id
        });
    }

    handleError(event) {
        console.error('Error al guardar:', event.detail);
        console.error(
            'Detalle:',
            JSON.stringify(event.detail, null, 2)
        );
    }

    handleCancel() {
        this.close({ saved: false });
    }
}
