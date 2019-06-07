const ogs       = require('open-graph-scraper'),
      HashMap   = require('hashmap'),
      Crypto    = require('crypto-js'),
      SHA256    = ('crypto-js/sha256');

const EKey = 'nodevue'; // salt
/**
 * 중괄호 사이의 코드가 밖으로 나가게 된다.
 * 스태틱하다.
 */
module.exports = {
    ogsinfo(url, fn) {
        return ogs({url: url}, (err, ret) => {
            fn(err, ret);
        });
    }
    , // 콤마로 구분한다.

    // 양방향 암호화
    encrypt(data, key) {
        /**
         * 기본 솔트 EKey
         * digest('hex') : 16 진수로 변경한다. 문자열 깨지는것을 방지함.
         */
        return Crypto.AES.encrypt(data, key || EKey).toString();
    }
    ,
    
    decrypt(data, key) {
        // 안전하게 16진수로 풀어서 6e6f64652e6a73 와 같은 형식으로 나오기 때문에 utf8 형태로 만들어 주도록 인코딩 타입을 설정함.
        return Crypto.AES.decrypt(data, key || EKey).toString(Crypto.enc.Utf8);
    }
    ,

    // 단방향 암호화(복호화 안된다.) sha1은 요즘 안씀. 이것으로 암호화 해야 sql에서도 똑같이 사용된다.
    encryptSha2(data, key) {
        if (!data) return null;
        key = key || EKey;

        try {
            return Crypto.SHA256(data + key).toString();
        } catch (error) {
            // 서버 자체가 죽지 않도록 꼭 감싸주자.
            console.log("sha256 encryption error");
        }

        return Crypto.AES.encrypt(data, key || EKey).toString();
    }
    ,

    makeMap(key, value) {
        const map = new HashMap();
        map.set(key, value);
        console.log(map.get(key));
        return map;
    }
};


/**
 * 클래스 형태로 쓸경우 아래와 같다.
 * 매번 실행할 때마다 생성한다.
 * 쓰레드 세이프하게 해야 할 경우 이렇게 쓴다.
 */
//module.exports = class {...}; 