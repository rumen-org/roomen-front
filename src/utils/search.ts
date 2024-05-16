import { unref, Ref } from "vue";

interface Inputs {
    [key: string]: Ref | Ref[];
}

export const getSearchVals = (inputs: Inputs): { [key: string]: unknown } => {
    return Object.entries(inputs).reduce((acc, [key, val]) => {
        if (Array.isArray(val)) {
            return { ...acc, [key]: [...val].map(item => unref(item)) };
        }
        return { ...acc, [key]: unref(val) };
    }, {});
};