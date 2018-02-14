import React, {Component} from 'react'
import {render} from 'react-dom'

import PropTypes from 'prop-types'

import { MuiThemeProvider, createMuiTheme, withStyles } from 'material-ui/styles'
import primaryColor from 'material-ui/colors/deepOrange'
import accentColor from 'material-ui/colors/green'

import MainLayout from './MainLayout.jsx'

const theme = createMuiTheme({
    palette         : {
        type            : 'dark',
        primary         : {
            //main            : primaryColor['700']
            main            : '#EF4036',
            main            : '#F04E30',
            main            : '#D03324',
        },
        secondary       : {
            main            : accentColor['A400']
        },
        background      : {
            default         : '#18191d',
            paper           : '#282e33',
        },
    },
})

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
