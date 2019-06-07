// function excute(fn) {
//     Promise.using( pool.connection(), conn => {
//         conn.beginTransaction( txerr => {
//             fn(conn);
//         });
//     });
// }

// 위 함수 자체가 모듈이 되었다.
//module.exports = excute;

// 좀 더 실전적인 예제, json 형태로 컴마로 구분해야 한다.
const Promise = require('bluebird');
const Pool = require('pool'); // index.js에서 만들어서 지속 사용하라.

module.exports = class {
    constructor(pool) {
        this.pool = pool || Pool;
    }
    
    excute(fn) {
        Promise.using( pool.connection(), conn => {
            fn(conn);
        });
    }
    
    excuteTx(fn) {
        Promise.using( pool.connection(), conn => {
            conn.beginTransaction( txerr => {
                fn(conn);
            });
        });
    }
};


// usage
// const mydb = require('./mydb');
// mydb( conn => {
// });