import http from 'k6/http';
import { sleep } from 'k6';
import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.1.0/index.js';

export const options = {
    //vus: 5,
    //duration: '10s',
    //stages = [
    //    { duration: '5s', target: 5 },
    //    { duration: '5s', target: 5 },
    //],

    scenarios: {
        contacts: {
            executor: 'ramping-vus',
            startVUs: 0,
            stages: [
                { duration: '10s', target: 5 },
                { duration: '10s', target: 5 },
            ],
            gracefulRampDown: '0s',
        },
    },

    thresholds: {
        http_req_failed: ['rate<0.01'], // http errors should be less than 1%
        http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
    },

    // reduce memory consumption for cases where response body isn't required
    discardResponseBodies: true,
};

export default function () {
    http.get(http.url`https://c.pi.home.varank.in/k6/?id=${uuidv4()}`);
    sleep(1);
}
