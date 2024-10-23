// composables/useConfirm.ts
import { reactive } from 'vue';

type ConfirmState = {
    message: string;
    isVisible: boolean;
    onConfirm: (() => void) | null;
    onCancel: (() => void) | null;
};

const confirmState = reactive<ConfirmState>({
    message: '',
    isVisible: false,
    onConfirm: null,
    onCancel: null,
});

export function useConfirm() {
    function showConfirm(
        message: string,
        onConfirm: () => void,
        onCancel: () => void = () => {}
    ) {
        confirmState.message = message;
        confirmState.isVisible = true;
        confirmState.onConfirm = () => {
            onConfirm();
            closeConfirm();
        };
        confirmState.onCancel = () => {
            onCancel();
            closeConfirm();
        };
    }

    function closeConfirm() {
        confirmState.isVisible = false;
        confirmState.message = '';
        confirmState.onConfirm = null;
        confirmState.onCancel = null;
    }

    return { confirmState, showConfirm, closeConfirm };
}
