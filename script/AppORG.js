
'use strict';

let push = require('web-push');
const GCM_API_KEY = 'AAAA3-MbfN0:APA91bGtlCrxRI-_F6tEZOAW-ebhX5_39F3DiAnwK7wRlsL9dd7bWylNtc3AhzQmaNVVJnLcX2D1l7wVEGjyk1yn3gfKQwW57uJ7Qq7DQzfUJ67zeSeK5cjuEBBRK9SZRZTuDTyzrxUF';
push.setGCMAPIKey(GCM_API_KEY);
let data = {
    'endpoint': '',
    keys: {
        'auth': '',
        'p256dh': '' 
    }
};

if ('serviceWorker' in navigator) {
    document.addEventListener('DOMContentLoaded', () => {
        let endpoint = document.querySelector('#subscription-endpoint');
        let key = document.querySelector('#subscription-public-key');
        let auth = document.querySelector('#subscription-auth');

        navigator.serviceWorker.register('./service-worker.js');
        navigator.serviceWorker.ready
        .then((registration) => {
            return registration.pushManager.subscribe({userVisibleOnly: true});
        })
        .then((subscription) => {
            var rawKey = subscription.getKey ? subscription.getKey('p256dh') : '';
            key.value = rawKey ? btoa(String.fromCharCode.apply(null, new Uint8Array(rawKey))) : '';
            var rawAuthSecret = subscription.getKey ? subscription.getKey('auth') : '';
            auth.value = rawAuthSecret ? btoa(String.fromCharCode.apply(null, new Uint8Array(rawAuthSecret))) : '';
            endpoint.value = subscription.endpoint;
            data.endpoint = endpoint.value;
            data.keys.auth = auth.value;
            data.keys.p256dh = key.value;
        }).then(() => {
            console.log(data);                                      // この出力には全部必要事項が含まれていることが確認できている
            
            push.sendNotification(data,'プッシュ通知')
            .then((result) => {
                console.log(result);
            })
            .catch((err) => {
                console.error('fail', err);
            })

        }).catch(console.error.bind(console));
    }, false);
}

            
