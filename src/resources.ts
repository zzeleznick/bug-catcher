import {
    ImageSource,
}
from 'https://esm.sh/excalibur@0.26.0-alpha.264';

const server = 'http://localhost:8000';
export const semgreppio = new ImageSource(`${server}/img/semgreppio.png`);

semgreppio.load().then(() => {
    console.log('semgreppio loaded');
});
