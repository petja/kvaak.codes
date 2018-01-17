import React, {Component} from 'react'
import {render} from 'react-dom'

import PropTypes from 'prop-types'

import { MuiThemeProvider, createMuiTheme, withStyles } from 'material-ui/styles'
import primaryColor from 'material-ui/colors/deepOrange'
import accentColor from 'material-ui/colors/green'

import MainLayout from './MainLayout.jsx'

console.log(MainLayout)

console.log({primaryColor, accentColor})

const theme = createMuiTheme({
    palette         : {
        primary         : {main: primaryColor['700']},
        secondary       : {main: accentColor['A400']},
        type            : 'dark',
    },
}/*{
    palette: {
        primary: primaryColor,
        secondary: accentColor,
        type: 'dark',
        background: {
            default: '#1A1F24',
            paper: '#2D323B',
            paperHover: '#3A3F48',
        },
    },
}*/)

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <MainLayout />
            </MuiThemeProvider>
        )
    }
}

console.log(<App />)

document.addEventListener('DOMContentLoaded', function() {
    render(<App />, document.querySelector('#root'));
});
