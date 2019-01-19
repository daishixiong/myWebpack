'use strict';

module.exports = {
    dev: {
        '/api': {
            target: 'https://yapi.avatarfield.com',
            changeOrigin: true,
            pathRewrite: {
                '^/api': '/mock/17/api'
            }
        },
        '/hospital-api': {
            target: 'http://47.104.28.208:8100',
            // target: 'http://172.20.11.179:8200',
            changeOrigin: true,
            pathRewrite: {

            }
        }
    },
    test: {
        '/api': {
            target: 'http://dmd.avfield.com',
            // target: 'http://172.20.1.174',
            changeOrigin: true,
            pathRewrite: {
            }
        },
        '/hospital-api': {
            target: 'http://47.104.28.208:8100',
            changeOrigin: true,
            pathRewrite: {
            }
        }
    }
};
