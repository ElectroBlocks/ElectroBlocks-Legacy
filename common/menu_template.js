const { APP_TITLE } = require('./constants');


let menuTemplate = [
    {
        label: APP_TITLE,
        submenu: [
            {
                label: 'Update Software'
            },
            {
                label: 'About Software'
            },
            {
                label: 'Advanced Mode'
            },
            {
                label: 'Credits'
            }
        ]
    },
    {
        label: 'File',
        submenu: [
            {
                label: 'Open',
            },
            {
                label: 'Save'
            },
            {
                label: 'Save As'
            },
            {
                label: 'Close'
            }
        ]
    },
    {
        label: 'Help',
        submenu: [
            {
                label: 'Online Help'
            },
            {
                label: 'Report a bug'
            },
        ]
    }
];

module.exports = {
     menuTemplate
};