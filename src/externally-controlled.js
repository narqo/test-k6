import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    scenarios: {
        contacts: {
            executor: 'externally-controlled',
            vus: 0,
            duration: '30s',
        },
    },
};

export default function () {
    http.get(http.url`https://example.com`);
    sleep(1);
}