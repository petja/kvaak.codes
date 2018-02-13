import React, {Component} from 'react'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Input, { InputLabel } from 'material-ui/Input'
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog'
import Slide from 'material-ui/transitions/Slide'
import { MenuItem } from 'material-ui/Menu'
import { FormControl, FormHelperText } from 'material-ui/Form'
import Select from 'material-ui/Select'

import * as CONFIG from './Config.js'

const styles = theme => ({
    root: {
        width: '100%',
    },
})

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class NewSpotDialog extends Component {
    state = {
        species             : [],
    }

    render () {
        const {classes} = this.props

        const specieOptions = this.state.species.map(specie => {
            return (
                <MenuItem value={specie.name} key={specie.name}>{specie.name}</MenuItem>
            )
        })

        const specieSelect = (
            <FormControl className={classes.formControl} fullWidth>
                <InputLabel htmlFor="specie">Laji</InputLabel>
                <Select
                    value={this.state.specie || ''}
                    onChange={this._setSpecie}
                    input={<Input name="specie" id="specie" />}
                >
                    <MenuItem value=''><em>Ei valintaa</em></MenuItem>
                    {specieOptions}
                </Select>
            </FormControl>
        )

        const countInput = (
            <FormControl className={classes.formControl} fullWidth>
                <TextField
                    fullWidth
                    label="Määrä"
                    type="number"
                />
            </FormControl>
        )

        const descriptionInput = (
            <FormControl className={classes.formControl} fullWidth>
                <TextField
                    fullWidth
                    multiline
                    label="Kuvaus"
                />
            </FormControl>
        )

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
                        Lisää uusi ankkahavainto <strong>{CONFIG.APP_NAME}</strong> -järjestelmään
                    </DialogContentText>
                    <br /><br />

                    {specieSelect}
                    <br /><br />
                    {countInput}
                    <br /><br />
                    {descriptionInput}

                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.onClose} color='secondary'>Tallenna havainto</Button>
                </DialogActions>
            </Dialog>
        )
    }

    _setSpecie = e => {
        this.setState({
            specie          : e.target.value,
        })
    }

    componentDidMount() {
        fetch(`${CONFIG.API_URL}/species`).then(resp => {
            return resp.json()
        }).then(species => {
            this.setState({
                species
            })
        })
    }
}

export default withStyles(styles)(NewSpotDialog)
