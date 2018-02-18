import React, {Component} from 'react'

import * as Router from './Router.js'

// Material UI
import {withStyles} from 'material-ui/styles'
import Typography from 'material-ui/Typography'

import * as Sighting from './model/Sighting.js'
import SpotCard from './SpotCard.jsx'

const styles = theme => ({
    // Nothing here :)
})

class SpotList extends Component {
    state = {
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
        Router.dispatch(`/sighting/${spotId}`, {
            listingUrl      : location.href,
            expandOrigin    : {
                offsetTop       : e.currentTarget.offsetTop,
                offsetHeight    : e.currentTarget.offsetHeight,
            },
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
