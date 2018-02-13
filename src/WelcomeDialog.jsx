import React, {Component} from 'react'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog'
import Slide from 'material-ui/transitions/Slide'

const styles = theme => ({
    root: {
        width: '100%',
    },
})

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class WelcomeDialog extends Component {
    render () {
        const {classes} = this.props
        const muscle = "💪"

        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.onClose}
                transition={Transition}
                keepMounted
            >
                <DialogTitle>Moikka Vincitin ankkabongailijat!</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Tässä teille sovellus helppottamaan ankkojen bongausharrastustanne. Toivottavasti pidätte {muscle}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.onClose} color="accent">Selvä homma</Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default withStyles(styles)(WelcomeDialog)
