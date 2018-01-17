import React, {Component} from 'react'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
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

class NewSpotDialog extends Component {
    render () {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.onClose}
                transition={Transition}
                keepMounted
            >
                <DialogTitle>Lisää uusi havainto</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Lisää uusi ankkahavainto <strong>kvaakr.io</strong> -järjestelmään
                    </DialogContentText>
                    <TextField
                        fullWidth
                        multiline
                        label="Kuvaus"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.onClose} color="accent">Lisää</Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default withStyles(styles)(NewSpotDialog)
