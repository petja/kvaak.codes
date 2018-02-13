const listeners     = []
let routes          = []

export function listen(callback) {
    listeners.push(callback)
    return callback({url: location.pathname})
}

export function dispatch(url, state = {}, isReplace = false) {
    console.log('url dispatch', {url, isReplace})

    if(isReplace) {
        history.replaceState(state, null, url)
    } else {
        history.pushState(state, null, url)
    }

    listeners.forEach(listener => {
        listener({
            state,
            url
        })
    })
}

addEventListener('popstate', e => {
    dispatch(location.pathname, e.state, true)
})
