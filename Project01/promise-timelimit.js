/**
 * @param {Function} fn
 * @param {number} t
 * @return {Function}
 */
var timeLimit = function(fn, t) {
    
    return async function(...args) {

        return new Promise((resolve,reject)=>{
            
            setTimeout(()=>{
                    reject("Time Limit Exceeded")
            },t)
            
            fn(...args)
            .then((result)=>{
                resolve(result);
            })
            .catch((error)=>{
                reject(error);
            })
        })
    }
};

const t = 50;
const inputs = [5];
const fn = async (n) => { await new Promise(res => setTimeout(res, 100)); return n * n; }

const limited = timeLimit((t) => new Promise(res => setTimeout(res, t)), 100);
limited(150).catch(console.log) // "Time Limit Exceeded" at t=100ms