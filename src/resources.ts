import {
    ImageSource,
}
from 'https://esm.sh/excalibur@0.26.0-alpha.264';

const server = 'http://localhost:8000';

export const semgreppio = new ImageSource(`${server}/img/semgreppio.png`);
export const codebug = new ImageSource(`${server}/img/code-bug.png`);

const Resources = {
    semgreppio,
    codebug,
} as const;

Object.entries(Resources).forEach(([name, resource]) => {
    resource.load().then(() => {
        console.log(`${name} loaded`);
    });
});
