import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import Tooltip from 'material-ui/Tooltip'

// Icons
import AddIcon from 'material-ui-icons/Add'
import BeenHereIcon from 'material-ui-icons/Beenhere'

import SpotCard from './SpotCard.jsx'

const styles = theme => ({
    root: {
        width: '100%',
    },
    fab                 : {
        position            : 'fixed',
        bottom              : theme.spacing.unit * 5,
        right               : theme.spacing.unit * 5,
    },
    fixedWidth          : {
        width               : '100%',
        maxWidth            : '70em',
        margin              : '0 auto',
    },
    icon                : {
        verticalAlign       : 'middle',
    },
})

function SimpleAppBar(props) {
    const { classes } = props;

    return (
        <div className={classes.root}>
            <AppBar position="static" color="primary">
                <Toolbar className={classes.fixedWidth}>
                    <Typography type="title" color="inherit">
                        kvaakr.io
                    </Typography>
                </Toolbar>
            </AppBar>

            <br />

            <div className={classes.fixedWidth}>
                <Typography gutterBottom type="title">
                    <BeenHereIcon className={classes.icon} /> Viimeisimmät havainnot
                </Typography>

                {[0,1,2,3,4].map(() => <SpotCard />)}
            </div>

            <Tooltip title="Lisää havainto">
                <Button fab className={classes.fab}>
                    <AddIcon />
                </Button>
            </Tooltip>
        </div>
    )
}

SimpleAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SimpleAppBar)
