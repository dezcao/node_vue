// pool with bluebird
const mysql     = require('mysql'),
      util      = require('util'),
      Promise   = require('bluebird');

Promise.promisifyAll(mysql); // mysql을 프로미스파이 하게 만들면, .then()을 쓸 수 있다. 편해진다...
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

/**
 * 커넥션 풀에선 싱글톤 하게 해야한다.
 * 커넥션을 재사용하기 위해서 닫지 않는다. 이걸 관리해주는게 풀
 */
module.exports = class {
    constructor(dbinfo) {
        dbinfo = dbinfo || DB_INFO;
        this.pool = mysql.createPool(dbinfo);
    }

    connect() {
        // this.pool.getConnectionAsync() 커넥션 다쓰면 되돌아온걸 disposer에서 놔줌.
        return this.pool.getConnectionAsync().disposer(conn => {
            return conn.release();
        });
    }

    end() {
        this.pool.end(function(err) {
            util.log('End of Pool');
            if (err) {
                util.log('ERR of Pool');
            }
        });
    }
}


//Usage
const Pool = require('./pool');
const pool = new Pool();


Promise.using( pool.connection(), conn => {
    // 비동기쿼리에서 .then을 사용해도 되고 아래처럼 콜백을 써도 된다.
     conn.queryAsync(sql1, (err, ret) => {
         util.log('sql1 = ', ret.affectedRows);

         conn.queryAsync(sql2, (err2, ret2) => {
            util.log('sql2 = ', ret2.affectedRows);
         });
     });    
});

// then 사용
Promise.using( pool.connection(), conn => {
     conn.queryAsync(sql1)
         .then(console.log)
         .then(ret => {// 
            })
         .catch(err => {
            util.log('err>>>', err);
            });

     pool.end();

});

// all
Promise.using( pool.connection(), conn => {
    Promise.all([
                conn.queryAsync(sql1),
                conn.queryAsync(sql2)
                // 두개는 병렬(각각 돌고 결과를 준다.)
            ])
           .then( r => {
               // 위 병렬의 결과가 어레이로 오게된다.

           }).catch( err => {
               // 에러처리
               pool.end();
           });
    conn.queryAsync(sql1)
        .then(console.log)
        .then(ret => {// 
           })
        .catch(err => {
           util.log('err>>>', err);
           });

    pool.end();

});

// 트랜잭션
Promise.using( pool.connection(), conn => {
    conn.beginTransaction( txerr => {
        Promise.all([
            conn.queryAsync(sql1),
            conn.queryAsync(sql2)
            // 두개는 병렬(각각 돌고 결과를 준다.)
        ])
       .then( r => {
           // 위 병렬의 결과가 어레이로 오게된다.

           conn.commit();
           pool.end();

       }).catch( err => {
           // 에러처리
           conn.rollback();
           pool.end();
       });
    })
        
    pool.end();

});

// 복잡하니까 함수화 하는경우.
excute(conn => {
    Promise.all([
        conn.queryAsync(sql1),
        conn.queryAsync(sql2)
        // 두개는 병렬(각각 돌고 결과를 준다.)
    ])
   .then( r => {
       // 위 병렬의 결과가 어레이로 오게된다.

   }).catch( err => {
       // 에러처리
       pool.end();
   });
});

function excute(fn) {
    Promise.using( pool.connection(), conn => {
        conn.beginTransaction( txerr => {
            fn(conn);
        });
    });

}