'use strict';

let push = require('web-push');

const GCM_API_KEY = 'AAAA3-MbfN0:APA91bGtlCrxRI-_F6tEZOAW-ebhX5_39F3DiAnwK7wRlsL9dd7bWylNtc3AhzQmaNVVJnLcX2D1l7wVEGjyk1yn3gfKQwW57uJ7Qq7DQzfUJ67zeSeK5cjuEBBRK9SZRZTuDTyzrxUF';
push.setGCMAPIKey(GCM_API_KEY);

// サイトアクセスで表示されるデータをそのままコピペ　( https://kingstonelibrary.github.io/PWA_push/ )
// これはExperiaのchromeのデータ
const data = {
    'endpoint': 'https://android.googleapis.com/gcm/send/c9cJsVZpL10:APA91bHcwU8PQZKQcR9UQbhGlV8qu9aiB7Wq7e0VTgaJD4YYq2FOqL5HxP3dohWfsl7xC8hKq_5Gw7pGMZZMrefwKhwC6vt_vblrD6U2ahv_p0nAcIZRtt4nBmVVcg3WmfY-Zk_T9Bfa',
    'userAuth': 'tqsI7Vuz+zXBjoc9QoW7bQ==',
    'userPublicKey': 'BA8yHS75j09SArSKO5I/TwIWtBR47obUedcyNvILaKtcnSXJR8j7NbnhTzNISRytP4GhtLkqXWMfmzU7n9mjbO4='
};

push.sendNotification(data.endpoint, {
    payload:       'push test for service worker',
    userAuth:      data.userAuth,
    userPublicKey: data.userPublicKey,
})
.then((result) => {
    console.log(result);
})
.catch((err) => {
    console.error('fail', err);
});
