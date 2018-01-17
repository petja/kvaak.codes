import React, {Component} from 'react'
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

import Zoom from 'material-ui/transitions/Zoom'

import SpotCard from './SpotCard.jsx'
import NewSpotDialog from './NewSpotDialog.jsx'

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
    appName             : {
        fontFamily          : '"Fugaz One", cursive',
    },
})

class MainLayout extends Component {

    state = {
        newSpotDialog               : false,
    }

    render () {
        const {classes} = this.props;

        const fab = (
            <Tooltip title="Lisää havainto">
                <Zoom in={!this.state.newSpotDialog}>
                    <Button fab className={classes.fab} onClick={this.toggleNewSpotDialog(true)}>
                        <AddIcon />
                    </Button>
                </Zoom>
            </Tooltip>
        )

        return (
            <div className={classes.root}>
                <AppBar position="static" color="primary">
                    <Toolbar className={classes.fixedWidth}>
                        <Typography type="title" color="inherit" className={classes.appName}>
                            kvaakr.io
                        </Typography>
                    </Toolbar>
                </AppBar>

                <br />

                <div className={classes.fixedWidth}>
                    <Typography gutterBottom type="title">
                        <BeenHereIcon className={classes.icon} /> Viimeisimmät havainnot
                    </Typography>

                    {[0,1,2,3,4].map(key => <SpotCard key={key} />)}
                </div>

                <NewSpotDialog
                    open={this.state.newSpotDialog}
                    onClose={this.toggleNewSpotDialog(false)}
                />

                {fab}
            </div>
        )
    }

    toggleNewSpotDialog = bool => () => {
        this.setState({
            newSpotDialog                   : bool,
        })
    }
}

MainLayout.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(MainLayout)
