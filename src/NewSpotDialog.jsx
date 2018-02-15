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
import { CircularProgress } from 'material-ui/Progress'
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
        saving              : false,
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
                    onChange={this._setValue('count')}
                />
            </FormControl>
        )

        const descriptionInput = (
            <FormControl className={classes.formControl} fullWidth>
                <TextField
                    fullWidth
                    multiline
                    label="Kuvaus"
                    onChange={this._setValue('description')}
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
                    {this.state.saving ? <CircularProgress size={20} /> : null}

                    <Button
                        onClick={this._save}
                        color='secondary'
                        disabled={this.state.saving}
                        children='Tallenna havainto'
                    />
                </DialogActions>
            </Dialog>
        )
    }

    _setSpecie = e => {
        this.setState({
            specie          : e.target.value,
        })
    }

    _setValue = name => e => {
        this.setState({
            [name]          : e.target.value,
        })
    }

    _save = () => {
        const {specie, description, count} = this.state

        this.setState({
            saving              : true,
        })

        const body = JSON.stringify({
            ayyyy               : 'lel',
            species             : specie,
            description,
            count,
            dateTime            : new Date(),
        })

        fetch(`${CONFIG.API_URL}/sightings`, {
            method          : 'POST',
            headers         : {
                'Content-Type'  : 'application/json',
            },
            body,
        }).then(resp => {
            this.setState({
                saving              : false,
            })

            this.props.onClose()

            return resp.json()
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
