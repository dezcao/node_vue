//mysql Test
const mysql = require('mysql');

const connection  = mysql.createConnection({
    host        : '115.71.233.22',
    user        : 'testuser',
    password    : 'test1',
    databae     : 'testdb'
});

connection.connect();

connection.query('select * from User where uid=?', ['user1'], function(error, results, fields) {
    // 콜백이 오면
    if (error) throw error;
    console.log('First User is : ', results[0]);
});

/**
 * 주의!
 * 쿼리는 병렬실행되기 때문에 어떤 쿼리가 먼저 실행되어야만 한다면
 * 콜백 안에서 실행하도록 해야한다.
 * 그런데 콜백 후에 큐에 등록되는 두번째 쿼리는 커넥션이 끝난 후일 수 있으므로
 * 커넥션 종료시점도 조정이 필요함.
 */
connection.beginTransaction(err2 => {
    connection.query('update User set lastlogin=now() where uid=?', ['user1'], function(error, results, fields) {
        // 콜백이 오면
        if (error) throw error;
        console.log('Update : ', results[0]);
    
        // 
        connection.query('select * from User where uid=?', ['user1'], function(error, results, fields) {
            if (error) {
                connection.rollback();
                //throw error;
            } else {
                connection.commit();
            }
            
            console.log('First User is : ', results[0]);

            connection.end(); // 끊어주자.
        });

        // 콜백 지옥에 빠지게 된다. ***** 블루버드 프로미스를 사용해야 한다.
        // bluebird module : connection pool, transaction, Kludgy
        // npm i bluebird --save
    });
});

//
//connection.end(); // 끊어주자.