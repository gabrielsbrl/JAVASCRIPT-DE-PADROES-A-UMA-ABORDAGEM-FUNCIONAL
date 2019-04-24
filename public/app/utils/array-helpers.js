if(!Array.prototype.$flatMap) {

    Array.prototype.$flatMap = function(cb) {
       return this.map(cb).reduce((flat, arr) => flat.concat(arr), []);
    };

}