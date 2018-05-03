const electron = require('electron');
const { ipcRenderer } = electron;

ipcRenderer.send('get:code');

ipcRenderer.on('show:code', (event, code) => {
    const div = document.querySelector('#arduino-sketch');
    div.innerHTML = escapeHTML(code);
});

function escapeHTML(s) {
    return s.replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}