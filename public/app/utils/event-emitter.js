const events = new Map();

export const EventEmitter = {
    on(event, listener) {
        //if the event is not on the list, adds it to the list
        if(!events.has(event)) events.set(event, []);
        //add a new listener to the event
        events.get(event).push(listener);
    },
    emit(event, data) {
        //captura o event
        const listeners = events.get(event);
        //verifica se o evento foi encontrado, e executa o listener
        if(listeners) listeners.forEach(listener => listener(data));
    }
};