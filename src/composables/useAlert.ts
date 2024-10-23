// composables/useAlert.ts
import { reactive } from 'vue';

type Alert = { message: string; type: 'success' | 'error' };

const alertState = reactive<Alert>({
    message: '',
    type: 'success',
});

export function useAlert() {
    function showAlert(message: string, type: 'success' | 'error' = 'success') {
        alertState.message = message;
        alertState.type = type;

        // 3초 후 알림 자동 닫힘
        setTimeout(() => {
            alertState.message = '';
        }, 3000);
    }
    function hideAlert() {
        alertState.message = '';
    }

    return { alertState, showAlert, hideAlert };
}
