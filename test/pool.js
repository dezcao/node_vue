// pool with bluebird
const mysql     = require('mysql'),
      util      = require('util'),
      Promise   = require('bluebird');

Promise.promisifyAll(mysql);
Promise.promisifyAll(require('mysql/lib/Connection').prototype);
Promise.promisifyAll(require('mysql/lib/Pool').prototype);

const DB_INFO = {
    host                : '',
    user                : 'testuser',
    password            : 'xxx',
    database            : 'testdb',
    multipleStatements  : true,
    ConnectionLimits    : 5,
    waitForConnection   : false
}

//Usage
Promise.using( pool.connection(), conn => {
     conn.queryAsync(sql1, (err, ret) => {
         util.log('sql1 = ', ret.affectedRows);

         conn.queryAsync(sql2, (err2, ret2) => {
            util.log('sql2 = ', ret2.affectedRows);
         });
     });
});

Promise.using( pool.connection(), conn => {
    //Promise.all().then();
    Promise.all([
        conn.queryAsync(sql1),
        conn.queryAsync(sql2)
    ]).then(r => {
        util.log("End of Then");
        util.log('sql1 = ', r[0].affectedRows);
        util.log('sql1 = ', r[1].affectedRows);
        pool.end();
    });
});
