import React, {Component} from 'react'

import * as CONFIG from './Config.js'

import SpotCard from './SpotCard.jsx'

class SpotList extends Component {
    state = {
        sightings           : [],
    }

    render() {
        const items = this.state.sightings.map(spot => {
            return <SpotCard spot={spot} key={spot.id} />
        })

        return <div>{items}</div>
    }

    componentDidMount() {
        this._refreshData()
    }

    // Get all sightings from the API and render them out
    _refreshData = () => {
        fetch(`${CONFIG.API_URL}/sightings`).then(resp => {
            return resp.json()
        }).then(sightings => {
            this.setState({
                sightings
            })
        })
    }
}

export default SpotList
