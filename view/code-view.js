const electron = require('electron');
const { ipcRenderer } = electron;

ipcRenderer.send('get:code');

ipcRenderer.on('show:code', (event, code) => {
    attemptCodeGeneration(code, 'cpp')
});

function escapeHTML(s) {
    return s.replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

/**
 * Attempt to generate the code and display it in the UI, pretty printed.
 * @param code {string} the code
 * @param prettyPrintType {string} The file type key for the pretty printer.
 */
let attemptCodeGeneration = function (code, prettyPrintType) {
    var content = document.getElementById('arduino-sketch');
    code = escapeHTML(code);
    content.textContent = code;
    if (typeof PR.prettyPrintOne == 'function') {
        code = content.textContent;
        code = PR.prettyPrintOne(code, prettyPrintType);
        content.innerHTML = code;
    }
};