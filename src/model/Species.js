import * as CONFIG from '../../config.js'

export function getAll() {
    return fetch(`${CONFIG.API_URL}/species`).then(resp => {

        return resp.json()

    })
}
