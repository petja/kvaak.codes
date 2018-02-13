import React, {Component} from 'react'
import PropTypes from 'prop-types'

import * as CONFIG from './Config.js'
import * as Router from './Router.js'

import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import Tooltip from 'material-ui/Tooltip'
import Zoom from 'material-ui/transitions/Zoom'

// Icons
import AddIcon from 'material-ui-icons/Add'
import BeenHereIcon from 'material-ui-icons/Beenhere'

import SpotList from './SpotList.jsx'
import NewSpotDialog from './NewSpotDialog.jsx'
import WelcomeDialog from './WelcomeDialog.jsx'

const styles = theme => ({
    root                : {
        background          : theme.palette.background.default,
        width               : '100%',
        minHeight           : '100%',
        paddingTop          : '5em',
        paddingBottom       : '2em',
        boxSizing           : 'border-box',
    },
    fab                 : {
        position            : 'fixed',
        bottom              : theme.spacing.unit * 5,
        right               : theme.spacing.unit * 5,
    },
    fixedWidth          : {
        width               : '100%',
        maxWidth            : '70em',
        margin              : '0 auto',
    },
    icon                : {
        verticalAlign       : 'middle',
    },
    appName             : {
        fontFamily          : '"Fugaz One", cursive',
    },
})

class MainLayout extends Component {

    state = {
        route                       : {
            newSpotDialog               : false,
        },
    }

    render () {
        const {classes} = this.props;

        const fab = (
            <Tooltip title='Lisää havainto'>
                <Zoom in={!this.state.route.newSpotDialog}>
                    <Button
                        variant='fab'
                        className={classes.fab}
                        onClick={() => Router.dispatch('/new-spot')}
                        color='secondary'
                        children={<AddIcon />}
                    />
                </Zoom>
            </Tooltip>
        )

        const appBar = (
            <AppBar position="fixed" color="primary">
                <Toolbar className={classes.fixedWidth}>
                    <Typography
                        variant='title'
                        color='inherit'
                        className={classes.appName}
                        children={CONFIG.APP_NAME}
                    />
                </Toolbar>
            </AppBar>
        )

        return (
            <div className={classes.root}>
                {appBar}

                <br />

                <div className={classes.fixedWidth}>
                    <Typography gutterBottom variant='title'>
                        <BeenHereIcon className={classes.icon} /> Viimeisimmät havainnot
                    </Typography>

                    <SpotList />
                </div>

                <NewSpotDialog
                    open={this.state.route.newSpotDialog}
                    onClose={() => Router.dispatch('/')}
                />

                <WelcomeDialog />

                {fab}
            </div>
        )
    }

    _setRoute(routeInfo) {
        this.setState({
            route           : routeInfo,
        })
    }

    componentDidMount() {
        Router.listen(payload => {
            const {url, state} = payload

            console.log({url, state})

            let match
            if(url.match(/^\/$/)) this._setRoute({frontPage: true})
            if(match = url.match(/^\/spot\/(.+)$/)) this._setRoute({spot: match[1]})
            if(url.match(/^\/new-spot$/)) this._setRoute({newSpotDialog: true})
        })

        Router.dispatch(location.href)

        console.log('ROUTER', Router)
    }

    toggleNewSpotDialog = bool => () => {
        this.setState({
            newSpotDialog                   : bool,
        })
    }
}

MainLayout.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(MainLayout)
