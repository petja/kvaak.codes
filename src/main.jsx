import React, {Component} from 'react'
import {render} from 'react-dom'

import PropTypes from 'prop-types'
import color from 'color'

import { MuiThemeProvider, createMuiTheme, withStyles } from 'material-ui/styles'
import primaryColor from 'material-ui/colors/deepOrange'
import accentColor from 'material-ui/colors/yellow'

import MainLayout from './MainLayout.jsx'

const defaultColor      = '#18191d'
const paperColor        = color(defaultColor).lighten(0.5).hex()

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
            main            : accentColor['500']
        },
        background      : {
            default         : defaultColor,
            paper           : paperColor,
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
