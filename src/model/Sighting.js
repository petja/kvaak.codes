import * as CONFIG from '../../config.js'

export function getAll() {
    return fetch(`${CONFIG.API_URL}/sightings`).then(resp => {

        return resp.json()

    })
}
