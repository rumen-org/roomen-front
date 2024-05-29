import type {Ref} from "vue";
import { LabelValueType } from '@/type/values'
export interface InputTextModel {
    id: string;
    placeholder: string;
    required: boolean;
    value: Ref<string>;
    readonly: boolean;
    style: string;
}

export interface InputRadioModel {
    value: Ref<string>;
    label: string;
    labelStyle: string;
    required: boolean;
    inputStyle: string;
    radioName: string;
    radios: Ref<LabelValueType[]>;
    setValue?: (value: string) => void;
}
