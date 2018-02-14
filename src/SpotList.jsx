import React, {Component} from 'react'

import * as CONFIG from './Config.js'
import * as Router from './Router.js'

// Material UI
import {withStyles} from 'material-ui/styles'

import SpotCard from './SpotCard.jsx'

const styles = theme => ({
    animation               : {
        background              : theme.palette.background.paper,
        //background              : '#808080',
        position                : 'fixed',
        maxWidth                : '70em',
        zIndex                  : 1,
        width                   : '100%',
        boxShadow               : '0 0 0.5em rgba(0,0,0,0.5)',
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
                <div className={classes.animation} ref='animation' onClick={() => Router.dispatch('/')} />
                {items}
            </div>
        )
    }

    _openSpot = (e, spotId) => {
        this.setState({
            expandOrigin        : e.currentTarget,
        }, () => {
            Router.dispatch(
                `/spot/${spotId}`,
            )
        })
    }

    _showOpenAnimation = () => {
        const {offsetTop, offsetHeight} = this.state.expandOrigin || document.body
        const animatable = this.refs.animation

        console.log({offsetTop, offsetHeight})

        const startFrom = offsetTop - document.body.scrollTop

        animatable.style.visibility = 'visible'

        animatable.animate([{
            top             : `${startFrom}px`,
            height          : `${offsetHeight}px`,
            opacity         : 0,
        },{
            top             : `64px`,
            height          : `calc(100vh - 64px)`,
            opacity         : 1,
        }], {
            duration        : 250,
            fill            : 'forwards',
        })
    }

    _showCloseAnimation = () => {
        const {offsetTop, offsetHeight} = this.state.expandOrigin || document.body
        const animatable = this.refs.animation

        console.log({offsetTop, offsetHeight})

        const startFrom = offsetTop - document.body.scrollTop

        const animation = animatable.animate([{
            top             : `64px`,
            height          : `calc(100vh - 64px)`,
            opacity         : 1,
        },{
            top             : `${startFrom}px`,
            height          : `${offsetHeight}px`,
            opacity         : 0,
        }], {
            duration        : 250,
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

        fetch(`${CONFIG.API_URL}/sightings`).then(resp => {
            return resp.json()
        }).then(sightings => {

            this._setResults(sightings)

        })
    }
}

export default withStyles(styles)(SpotList)
