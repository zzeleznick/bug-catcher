import {
    ImageSource,
}
from 'https://esm.sh/excalibur@0.26.0-alpha.264';

// Check if we are running locally vs on a website via the current window location
// This is a hack to get around CORS issues when loading images
const _protocol = window?.location?.protocol; // e.g. "http:", "https:", "file:"
const protocol = _protocol === 'file:' ? 'http:' : _protocol; // use http: if we are running locally
const host = window?.location?.host ?? 'localhost:8000';
const serverUrl = `${protocol}//${host}`;

export const semgreppio = new ImageSource(`${serverUrl}/img/semgreppio.png`);
export const codebug = new ImageSource(`${serverUrl}/img/code-bug.png`);

const Resources = {
    semgreppio,
    codebug,
} as const;

Object.entries(Resources).forEach(([name, resource]) => {
    resource.load().then(() => {
        console.log(`${name} loaded`);
    });
});
