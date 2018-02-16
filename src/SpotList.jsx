import React, {Component} from 'react'

import classnames from 'classnames'

import * as CONFIG from './Config.js'
import * as Router from './Router.js'

// Material UI
import {withStyles} from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import Button from 'material-ui/Button'

import * as Sighting from './model/Sighting.js'
import SpotCard from './SpotCard.jsx'
import RelativeTime from './RelativeTime.jsx'

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
        textAlign               : 'center',
    },
    animation               : {
        zIndex                  : 2,
    },
    quote                   : {
        fontFamily              : '"Roboto Slab"',
        fontSize                : '1.2em',
        color                   : theme.typography.body1.color,
    },
})

class SpotList extends Component {
    state = {
        sightings           : [],
        openSpot            : {},
    }

    render() {
        const {classes, sightings} = this.props

        const items = this._sortResults().map(spot => {
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
                >
                    <br /><br />

                    <Typography variant='display1'>havainto #{this.state.openSpot.id}</Typography>

                    <Typography>
                        {this.state.openSpot.species}&emsp;&middot;&emsp;
                        {this.state.openSpot.count} kpl&emsp;&middot;&emsp;
                        <RelativeTime date={this.state.openSpot.dateTime} />
                    </Typography>

                    <br />

                    <Divider />

                    <blockquote className={classes.quote}>
                        {this.state.openSpot.description}
                    </blockquote>

                    <Button color='secondary' onClick={this._goBack}>Paluu</Button>
                </div>

                {items}
            </div>
        )
    }

    _goBack = () => {
        this._showCloseAnimation().then(() => {
            this.setState({
                expandOrigin        : null,
                openSpot            : {},
            })

            Router.dispatch('/')
        })
    }

    _openSpot = (e, spotId) => {
        const currentSpot = this.props.sightings.find(sighting => {
            return sighting.id === spotId
        })

        this.setState({
            expandOrigin        : e.currentTarget,
            openSpot            : currentSpot,
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

        return new Promise(fulfill => {
            animation.onfinish = () => {
                animatable.style.visibility = 'hidden'
                fulfill()
            }
        })
    }

    _closeSpot = e => {
    }

    componentDidMount() {
        Router.listen(payload => {
            const {url, state} = payload

            let match
            if(match = url.pathname.match(/^\/spot\/(.+)$/)) this._showOpenAnimation()
        })
    }

    _sortResults = () => {
        // Sort by timestamp

        return [...this.props.sightings].sort((a, b) => {
            if(this.props.isReversed) [a, b] = [b, a]
            return Date.parse(a.dateTime) - Date.parse(b.dateTime)
        })
    }
}

export default withStyles(styles)(SpotList)
