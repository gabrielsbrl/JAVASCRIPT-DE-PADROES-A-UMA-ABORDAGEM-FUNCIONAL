//Don't forget to say the file extension
import { log, timeoutPromise, delay, retry } from "./utils/promise-helper.js";
import { notasService as service} from "./nota/service.js";
import { takeUntil, debounceTime, partialize, pipe } from "./utils/operators.js";
import { EventEmitter } from './utils/event-emitter.js';

const operations = pipe(
  partialize(takeUntil, 3),
  partialize(debounceTime, 500)
);

//the retry need to receive a function that returns a promise
//cause the promise cant be "re-called", it needs 
const action = operations(() => 
    retry(3, 3000, 
      () => timeoutPromise(3000, service.sumItems('2143'))
    )
      .then(total => EventEmitter.emit('itensTotalizados', total))
      .catch(log)
  );

document
  .querySelector('#myButton')
  .onclick = () => action();