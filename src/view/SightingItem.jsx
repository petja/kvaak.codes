import React, {Component} from 'react'

import * as Router from '../model/Router.js'
import RelativeTime from './RelativeTime.jsx'

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
            userSelect          : 'none',
            '-webkit-tap-highlight-color': 'transparent',
            '&:hover'           : {
                background          : paperHoverBg,
            },
        },
        opacity             : {
            opacity             : 0.5,
        },
    }
}

class SightingItem extends Component {
    render() {
        const {classes, spot} = this.props
        const {id, species, description, dateTime, count} = spot

        return (
            <div className={classes.card} onClick={this.props.onClick}>
                <Grid container alignItems='center'>
                    <Grid item xs={2} sm={2}>
                        <Typography>{count} <span className={classes.opacity}>&times;</span></Typography>
                    </Grid>
                    <Grid item xs={4} sm={4}>
                        <Typography>{species}</Typography>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <Typography align='right'>
                            <RelativeTime date={dateTime} />
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        )
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({
                time            : Date.now(),
            })
        }, 1000)
    }
}

export default withStyles(styles)(SightingItem)
