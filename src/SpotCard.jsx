import React, {Component} from 'react'

import * as Router from './Router.js'

// Material UI
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'

// Third party
import color from 'color'

const styles = theme => {
    const paperBg = theme.palette.background.paper
    const paperHoverBg = color(paperBg).lighten(0.2).hex()
    const paperBorder = color(paperBg).darken(0.1).hex()

    return {
        card                : {
            background          : theme.palette.background.paper,
            transition          : '0.15s background',
            borderBottom        : `1px solid ${paperBorder}`,
            padding             : `1.2em`,
            cursor              : `pointer`,
            '&:hover'           : {
                background          : paperHoverBg,
            },
        },
        opacity             : {
            opacity             : 0.5,
        },
    }
}

class SpotCard extends Component {
    render() {
        const {classes, spot} = this.props
        const {id, species, description, dateTime, count} = spot

        return (
            <div className={classes.card} onClick={this.props.onClick}>
                <Grid container alignItems='center'>
                    <Grid item xs={6} sm={1}>
                        <Typography>{count} <span className={classes.opacity}>&times;</span></Typography>
                    </Grid>
                    <Grid item xs={6} sm={8}>
                        <Typography>{species}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Typography>{this.formatDate(dateTime)}</Typography>
                    </Grid>
                </Grid>
            </div>
        )
    }

    formatDate = date => {

        const diff = (Date.now() - Date.parse(date)) / 86400000

        if (diff < 1 / 24 / 60) {
            return Math.round(diff / 24 / 60 / 60) + ' sekuntia sitten'
        } else if (diff < 1 / 24) {
            return Math.round(diff / 24 / 60) + ' minuuttia sitten'
        } else if (diff >= 1 / 24 && diff < 1) {
            return Math.round(diff / 24) + ' tuntia sitten'
        } else {
            return Math.round(diff) + ' päivää sitten'
        }
    }
}

export default withStyles(styles)(SpotCard)
