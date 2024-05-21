import {Ref, ref} from 'vue';

export function useModal() {
    const isShowModal: Ref<boolean> = ref(false);
    // const modalType : Ref<null | string> = ref(null);
    function closeModal() {
        isShowModal.value = false;
        // modalType.value = null;
    }
    function callModal() {
        isShowModal.value = true;
        // modalType.value = a;
    }

    return {
        isShowModal,
        closeModal,
        callModal,
    };
}