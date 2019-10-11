// Copyright (c) 2019 Swisscom Blockchain AG
// Licensed under MIT License

import {createMuiTheme} from "@material-ui/core";

/**
 * Return @material-ui theme
 * @type {Theme}
 */
const theme = createMuiTheme({
    palette: {
        text: {
            primary: '#FFF',
            secondary: '#CBCFD4',
            light: '#CBCFD4',
            hint: '#00BF0B',
            error: '#FF6E6E',
        },
        primary: {
            main: '#3C444D',
            dark: '#30363D',
            light: '#FFF',
            contrastText: '#00BF0B',
            error: '#FF6E6E',
        },
    },
});

export default theme;
