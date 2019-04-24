import { handleStatus } from '../utils/promise-helper.js';
import '../utils/array-helpers.js';
import { partialize, compose, pipe } from "../utils/operators.js";
import { Maybe } from "../utils/maybe.js";

const API = 'http://localhost:3000/notas';

const getItemsFromNotas = notasM => notasM.map(notas => notas.$flatMap(nota => nota.itens));
const filterItemsByCode = (code, itemsM) => itemsM.map(items => items.filter(item => item.codigo == code));
const sumItemsValue = itemsM => itemsM.map(items => items.reduce((total, item) => total + item.valor , 0));

export const notasService = {
    listAll() {
        return fetch(API)
            .then(handleStatus)
            .then(notas => Maybe.of(notas))
            .catch(err => {
                console.log(err);
                return Promise.reject("Não foi possivel obter as notas fiscais!");
            });
    },
    sumItems(code) {
        const filterItems = partialize(filterItemsByCode, code);
        //will compose a new function, that receive a single parameter, and return the needed value
        //pointer free function
        const sumItems = pipe(getItemsFromNotas, filterItems, sumItemsValue);
        return this.listAll()
            .then(sumItems)
            .then(result => result.getOrElse(0));
    }
};