import React from 'react'

const ONE_HOUR = 3600
const ONE_DAY = ONE_HOUR * 24

export default function RelativeTime(props) {

    if(!props.date) return null

    const date = new Date(props.date)
    const diff = (Date.now() - date) / 1000

    let str = Math.round(diff / 60 / 60 / 24) + ' päivää sitten'

    if (diff < 60) {
        str = Math.round(diff) + ' sekuntia sitten'
    } else if (diff >= 60 && diff < ONE_HOUR) {
        str = Math.round(diff / 60) + ' minuuttia sitten'
    } else if (diff >= ONE_HOUR && diff < ONE_DAY) {
        str = Math.round(diff / 60 / 60) + ' tuntia sitten'
    }

    const isoString = date.toISOString()

    return (
        <time
            dateTime={isoString}
            title={isoString}
            children={str}
        />
    )

}
