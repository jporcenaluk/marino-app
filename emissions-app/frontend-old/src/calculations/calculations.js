/*
Provides core calculations for the app
*/
import { math }

export const calculateSum = (a, b) => {
    return a + b;
};

export const avg = (values) => {
    /*
    Assumes values is an integer
    */
    return values.reduce((a, b) => a + b) / values.length;
};