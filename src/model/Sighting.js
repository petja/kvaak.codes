import * as CONFIG from '../Config.js'

export function getAll() {
    return fetch(`${CONFIG.API_URL}/sightings`).then(resp => {

        return resp.json()

    })
}
