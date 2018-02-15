import React, {Component} from 'react'

import classnames from 'classnames'

import * as CONFIG from './Config.js'
import * as Router from './Router.js'

// Material UI
import {withStyles} from 'material-ui/styles'

import * as Sighting from './model/Sighting.js'
import SpotCard from './SpotCard.jsx'

const styles = theme => ({
    expand                  : {
        zIndex                  : 1,
        background              : theme.palette.background.paper,
        position                : 'fixed',
        maxWidth                : '70em',
        width                   : '100%',
        height                  : 'calc(100vh - 56px)',
        top                     : '56px',
        visibility              : 'hidden',
        boxShadow               : '0 0 0.5em rgba(0,0,0,0.5)',
    },
    animation               : {
        zIndex                  : 2,
    },
})

class SpotList extends Component {
    state = {
        sightings           : [],
    }

    render() {
        const {classes} = this.props

        const items = this.state.sightings.map(spot => {
            return (
                <SpotCard
                    spot={spot}
                    key={spot.id}
                    onClick={e => this._openSpot(e, spot.id)}
                />
            )
        })

        return (
            <div>
                <div
                    className={classnames(classes.expand, classes.animation)}
                    ref='animation'
                />
                <div
                    className={classes.expand}
                    ref='expand'
                    onClick={() => Router.dispatch('/')}
                />
                {items}
            </div>
        )
    }

    _goBack = () => {
        Router.dispatch('/')
    }

    _openSpot = (e, spotId) => {
        this.setState({
            expandOrigin        : e.currentTarget,
        }, () => {
            Router.dispatch(
                `/spot/${spotId}`,
                {listingUrl: location.href},
            )
        })
    }

    _showOpenAnimation = () => {
        const {offsetTop, offsetHeight} = this.state.expandOrigin || document.body
        const animatable = this.refs.animation

        console.log({offsetTop, offsetHeight})

        const startFrom = offsetTop - document.body.scrollTop

        animatable.style.visibility = 'visible'

        const animation = animatable.animate([{
            top             : `${startFrom}px`,
            height          : `${offsetHeight}px`,
            opacity         : 0,
        },{
            top             : `56px`,
            height          : `calc(100vh - 56px)`,
            opacity         : 1,
        }], {
            duration        : 200,
            fill            : 'forwards',
        })

        animation.onfinish = this._revealExpand
    }

    _revealExpand = () => {
        const animatable = this.refs.animation
        const expand = this.refs.expand

        expand.style.visibility = 'visible'

        const animation = animatable.animate([{
            opacity         : 1,
        },{
            opacity         : 0,
        }], {
            duration        : 200,
            fill            : 'forwards',
        })

        animation.onfinish = () => {
            animatable.style.visibility = 'hidden'
        }
    }

    _showCloseAnimation = () => {
        const {offsetTop, offsetHeight} = this.state.expandOrigin || document.body
        const animatable = this.refs.animation
        const expand = this.refs.expand

        console.log({offsetTop, offsetHeight})

        const startFrom = offsetTop - document.body.scrollTop

        expand.style.visibility = 'hidden'
        animatable.style.visibility = 'visible'

        const animation = animatable.animate([{
            top             : `64px`,
            height          : `calc(100vh - 64px)`,
            opacity         : 1,
        },{
            top             : `${startFrom}px`,
            height          : `${offsetHeight}px`,
            opacity         : 0,
        }], {
            duration        : 200,
            fill            : 'forwards',
        })

        animation.onfinish = () => {
            animatable.style.visibility = 'hidden'
        }
    }

    _closeSpot = e => {
    }

    componentDidMount() {
        this._refreshData()

        Router.listen(payload => {
            const {url, state} = payload

            let match
            if(match = url.pathname.match(/^\/spot\/(.+)$/)) this._showOpenAnimation()
            if(match = url.pathname.match(/^\/$/) && this.state.expandOrigin) this._showCloseAnimation()
        })
    }

    componentWillReceiveProps(nextProps) {
        this._setResults(this.state.sightings, nextProps.isReversed)
    }

    _setResults = (sightings, isReversed = this.props.isReversed) => {
        console.log('b', {isReversed})

        // Sort by timestamp
        sightings = sightings.sort((a, b) => {
            if(isReversed) [a, b] = [b, a]
            return Date.parse(a.dateTime) - Date.parse(b.dateTime)
        })

        this.setState({
            sightings
        })
    }

    // Get all sightings from the API and render them out
    _refreshData = () => {
        Sighting.getAll().then(sightings => {

            this._setResults(sightings)

        })
    }
}

export default withStyles(styles)(SpotList)
