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
import IconButton from 'material-ui/IconButton'
import Grid from 'material-ui/Grid'

// Icons
import AddIcon from 'material-ui-icons/Add'
import BeenHereIcon from 'material-ui-icons/Beenhere'
import SortByAlphaIcon from 'material-ui-icons/SortByAlpha'
import InsertChartIcon from 'material-ui-icons/InsertChart'

import * as Sighting from './model/Sighting.js'

import SpotList from './SpotList.jsx'
import NewSpotDialog from './NewSpotDialog.jsx'
import WelcomeDialog from './WelcomeDialog.jsx'
import Stats from './Stats.jsx'

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
        position            : 'relative',
        //margin              : '-0.5em auto 0 auto',
        marginTop           : '-0.5em',
        '&:after'           : {
            opacity             : 0.75,
            position            : 'absolute',
            content             : '""',
            background          : 'url("/for-vincit.png") right 50% no-repeat',
            backgroundSize      : 'contain',
            width               : '100%',
            height              : '0.5em',
            bottom              : '-0.5em',
            right               : '0',
        },
    },
})

class MainLayout extends Component {

    state = {
        route                       : {
            newSpotDialog               : false,
        },
        isReversed                  : true,
   
        sightings           : [],
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

        const subheader = (
            <Grid container alignItems='center' spacing={0}>

                <Grid item xs={9}>
                    <Typography variant='title'>
                        <BeenHereIcon className={classes.icon} /> Viimeisimmät havainnot
                    </Typography>
                </Grid>

                <Grid item xs={3} style={{textAlign: 'right'}}>
                    <Tooltip title='Järjestele havaintoajankohdan mukaan'>
                        <IconButton
                            children={<SortByAlphaIcon />}
                            onClick={this._toggleSort}
                        />
                    </Tooltip>
                </Grid>

            </Grid>
        )

        return (
            <div className={classes.root}>
                {appBar}

                <br />

                <div className={classes.fixedWidth}>
                    <Typography variant='title'>
                        <InsertChartIcon className={classes.icon} /> Tilastot
                    </Typography>

                    <Stats
                        data={this.state.sightings}
                        species={[{"name":"mallard"},{"name":"redhead"},{"name":"gadwall"},{"name":"canvasback"},{"name":"lesser scaup"}]}
                    />

                    {subheader}

                    <br />

                    <SpotList
                        isReversed={this.state.isReversed}
                    />

                    <br />

                    <Button color='secondary'>Lisää havaintoja</Button>
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

    _refreshData = () => {
        Sighting.getAll().then(sightings => {

            this.setState({
                sightings
            })

        })
    }

    _setRoute(routeInfo) {
        this.setState({
            route           : routeInfo,
        })
    }

    _toggleSort = () => {
        this.setState(state => {
            state.isReversed = !state.isReversed

            Router.dispatch(currentUrl => {
                console.log({currentUrl})
                currentUrl.searchParams.set(
                    'sort',
                    state.isReversed ? 'desc' : 'asc'
                )

                return currentUrl
            }, {}, true)

            return state
        })
    }

    componentDidMount() {
        this._refreshData()

        Router.listen(payload => {
            const {url, state} = payload

            //console.log({url, state})

            let match
            if(url.pathname.match(/^\/$/)) {
                const isReversed = url.searchParams.get('sort') !== 'asc'
                console.log({isReversed})

                this.setState({
                    isReversed,
                    route: {},
                })
            }

            if(url.pathname.match(/^\/new-spot$/)) this._setRoute({newSpotDialog: true})
        })

        Router.dispatch(location.href, {}, true)

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
