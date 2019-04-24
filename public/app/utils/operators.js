//Receive as rest, and set as spread
export const partialize = (fn, ...args) => fn.bind(null, ...args);

export const compose = (...fns) => value => fns.reduceRight((previousValue, current) => current(previousValue), value);

export const pipe = (...fns) => value => fns.reduce((previousValue, current) => current(previousValue), value);

export const takeUntil = (times, fn) => () => times-- > 0 && fn();

export const debounceTime = (milliseconds, fn) => {
    let timer = 0;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(fn, milliseconds);
    }
};