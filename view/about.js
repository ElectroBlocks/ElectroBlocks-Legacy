const electron = require('electron');
const { shell } = electron;


const aTags = document.getElementsByTagName("a");
for (let i = 0; i < aTags.length; i++) {
    const url = aTags[i].href;
    aTags[i].addEventListener('click', (e) => {
        e.preventDefault();
        shell.openExternal(url);
    });
    aTags[i].href = "#";
}