const util = require('util'); // node 기본제공 유틸
const utils = require('./utils'); // utils.js에서 확장자 생략 가능

/**
 * 해시맵 테스트
 */
let map = utils.makeMap('name', 'hong');
util.log("......", map.get('name'));
return;

/**
 * 암호화 테스트
 */
let str = 'node.js';
let enc1 = utils.encrypt(str);
let enc2 = utils.encrypt(str, 'aaa');
let enc3 = utils.encryptSha2(str, 'aaa');

util.log(enc1);
util.log(enc2);
util.log(enc3);

util.log(utils.decrypt(enc1));
util.log(utils.decrypt(enc2, 'aaa'));
util.log(utils.decrypt(enc2, 'aab'));
return;

/**
 *  ogs 테스트
 */

let url = 'https://naver.com';
// 두번째 인자는 함수를 주기로 했었다. 전달한 함수에 결과값을 담아 콜백 된다.
utils.ogsinfo(url, (err, ret) => { 
    util.log(err, ret);
}); 