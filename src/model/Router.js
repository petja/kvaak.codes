const listeners     = []
let routes          = []

export function listen(callback) {
    listeners.push(callback)
    dispatch(location.href, {}, true)
}

export function dispatch(url, state = {}, isReplace = false) {

    if (typeof url === 'function') {
        const urlObj = new URL(location.href)
        return dispatch(url(urlObj).href, state, isReplace)
    }

    const urlObj = new URL(url, location.origin)
    const newUrl = urlObj.pathname + urlObj.search

    if (urlObj.origin !== location.origin) return location.href = urlObj.href

    if (isReplace) {
        history.replaceState(state, null, newUrl)
    } else {
        history.pushState(state, null, newUrl)
    }

    console.log('url dispatch', {url, state, isReplace})

    listeners.forEach(listener => {
        listener({
            state,
            url         : urlObj,
        })
    })

}

addEventListener('popstate', e => {
    dispatch(location.href, e.state, true)
})
