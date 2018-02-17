import React, {Component} from 'react'

import * as Router from './Router.js'

// Material UI
import {withStyles} from 'material-ui/styles'
import Typography from 'material-ui/Typography'

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
                {items}
            </div>
        )
    }

    _openSpot = (e, spotId) => {
        Router.dispatch(
            `/sighting/${spotId}`,
            {listingUrl: location.href},
        )
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
