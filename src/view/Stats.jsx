import React, {Component} from 'react'

import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'

import {BarChart, CartesianGrid, ResponsiveContainer, XAxis, Tooltip, Legend, Bar} from 'recharts'
import color from 'color'

// Generate 10 colors so each of them are 12,5%
// lighter than the previous one
let currentColor = '#D03324'
const barColors = [currentColor]

for(let i = 0; i < 10; i++) {
    currentColor = color(currentColor).darken(0.125)
    barColors.push(currentColor.hex())
}

// Create stylesheet
const styles = theme => ({
    root                : {
        ...theme.typography.body1,
    },
})

class Stats extends Component {

    render() {
        const {data, species, classes} = this.props

        const ducksByMonth = {}

        // Loop thru every sighting
        data.sort((a, b) => {

            return Date.parse(a.dateTime) - Date.parse(b.dateTime)

        }).forEach(spot => {
            const date = new Date(spot.dateTime)
            const yearMonth = date.getFullYear() + '-' + (date.getMonth() + 1)

            // Check if YEAR-MONTH exists in the object
            if(!ducksByMonth.hasOwnProperty(yearMonth)) {
                ducksByMonth[yearMonth] = {yearMonth}

                // Add each species to month object with 0 default value
                species.forEach(specie => {
                    ducksByMonth[yearMonth][specie.name] = 0
                })
            }

            // Increment species count on the month
            ducksByMonth[yearMonth][spot.species] += parseInt(spot.count)
        })

        const bars = species.map((specie, index) => {
            const barColor = barColors[index]
            return (
                <Bar
                    dataKey={specie.name}
                    key={specie.name}
                    stackId='specie'
                    unit=' kpl'
                    fill={barColor}
                />
            )
        })

        const chart = (
            <BarChart width={800} height={400} data={Object.values(ducksByMonth)}>
                <XAxis dataKey='yearMonth' />
                <Tooltip cursor={{fill: 'rgba(0,0,0,0.1)'}} />
                <Legend iconType='circle' />
                {bars}
            </BarChart>
        )

        return (
            <div>
                <Typography
                    variant='title'
                    align='center'
                    gutterBottom
                >
                    {data.length} bongausta
                </Typography>

                <ResponsiveContainer width='100%' height={200} className={classes.root}>
                    {chart}
                </ResponsiveContainer>
            </div>
        )
    }

}

export default withStyles(styles)(Stats)
