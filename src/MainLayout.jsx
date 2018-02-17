import React, {Component} from 'react'

import PropTypes from 'prop-types'
import color from 'color'

import * as CONFIG from './Config.js'
import * as Router from './Router.js'

// Material UI
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
import SortByAlphaIcon from 'material-ui-icons/SortByAlpha'

import * as Sighting from './model/Sighting.js'
import * as Species from './model/Species.js'

import SpotList from './SpotList.jsx'
import NewSpotDialog from './NewSpotDialog.jsx'
import WelcomeDialog from './WelcomeDialog.jsx'
import Stats from './Stats.jsx'
import SightExpand from './SightExpand.jsx'

const styles = theme => {
    const bgColor = theme.palette.background.default
    //const bgColorAlpha = color(bgColor).alpha(0).toString()

    return {
        root                : {
            background          : bgColor,
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
        stickyHeader        : {
            position            : 'sticky',
            top                 : '56px',
            paddingTop          : '16px',
            paddingBottom       : '8px',
            zIndex              : 1,
            background          : bgColor,
            //background          : `linear-gradient(top, ${bgColor} 0%, ${bgColor} 50%, ${bgColorAlpha} 100%)`,
        },
    }
}

class MainLayout extends Component {

    state = {
        isReversed                  : true,
        newSpotDialog               : false,
        sightings                   : [],
        species                     : [],
    }

    render () {
        const {classes} = this.props
        const {sightings} = this.state

        const fab = (
            <Tooltip title='Lisää havainto'>
                <Zoom in={this.state.frontPage}>
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
            <Grid container alignItems='center' spacing={0} className={classes.stickyHeader}>

                <Grid item xs={9}>
                    <Typography variant='title'>
                        Bongaushistoria
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

        const sightExpand = (
            <SightExpand
                sighting={
                    sightings.find(sighting => sighting.id === this.state.sightingId)
                }
                onClose={this._closeExpand}
            />
        )

        return (
            <div className={classes.root}>
                {appBar}

                <br />

                <div className={classes.fixedWidth}>
                    <Stats
                        data={this.state.sightings}
                        species={this.state.species}
                    />

                    {subheader}

                    <SpotList
                        sightings={this.state.sightings}
                        isReversed={this.state.isReversed}
                    />

                    {sightExpand}
                </div>

                <NewSpotDialog
                    open={this.state.newSpotDialog}
                    species={this.state.species}
                    onClose={() => Router.dispatch('/')}
                    onCreate={this._refreshData}
                />

                <WelcomeDialog />

                {fab}
            </div>
        )
    }

    _closeExpand = () => {
        Router.dispatch('/')
    }

    _refreshData = () => {
        // Fetch all species
        Species.getAll().then(species => {

            this.setState({
                species
            })

        })

        // Fetch all sightings
        Sighting.getAll().then(sightings => {

            this.setState({
                sightings
            })

        })
    }

    _toggleSort = () => {
        this.setState(state => {
            state.isReversed = !state.isReversed

            Router.dispatch(currentUrl => {

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

        // Routings
        Router.listen(payload => {
            const {url, state} = payload

            let match

            if(url.pathname.match(/^\/$/)) {

                const isReversed = url.searchParams.get('sort') !== 'asc'

                this.setState({
                    isReversed,
                    sightingId          : null,
                    frontPage           : true,
                    newSpotDialog       : false,
                })

            } else if(url.pathname.match(/^\/new-spot$/)) {

                this.setState({
                    sightingId          : null,
                    frontPage           : false,
                    newSpotDialog       : true,
                })

            } else if(match = url.pathname.match(/^\/sighting\/(.+)$/)) {

                this.setState({
                    sightingId          : match[1],
                    frontPage           : false,
                    newSpotDialog       : false,
                })

            } else {

                this.setState({
                    sightingId          : null,
                    frontPage           : false,
                    newSpotDialog       : false,
                })

            }
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
