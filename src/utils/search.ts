import {unref} from "vue";

export const getSearchVals = inputs => {
    return Object.entries(inputs).reduce((acc, [key, val]) => {
        if (Array.isArray(val)) {
            return { ...acc, [key]: [...val].map(item => unref(item)) };
        }
        return { ...acc, [key]: unref(val) };
    }, {});
};