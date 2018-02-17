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
        saving              : false,

        // Default values of the form
        count               : 1,
        specie              : '',
        description         : '',
    }

    render () {
        const {classes} = this.props

        // Get name of each species, from the object
        const species = this.props.species.map(specie => {
            return specie.name
        }).sort()

        // Validate user input
        const errors = {
            COUNT           : (parseInt(this.state.count) < 1 || this.state.count === '' ? 'Syötä luku joka on suurempi tai yhtäsuuri kuin 1' : null),
            SPECIES         : (!species.includes(this.state.specie) ? 'Valitse lajike' : null),
        }

        // Check if there's errors, if there's even one, prevent sending form
        const hasErrors = !!(Object.values(errors).find(error => error))

        // Menu items for the species dropdown
        const specieOptions = species.map(name => {
            return (
                <MenuItem value={name} key={name}>{name}</MenuItem>
            )
        })

        // Dropdown to select species
        const specieSelect = (
            <FormControl
                className={classes.formControl}
                error={!!errors.SPECIES}
                fullWidth
            >
                <InputLabel htmlFor="specie">Laji</InputLabel>
                <Select
                    value={this.state.specie || ''}
                    onChange={this._setValue('specie')}
                    input={<Input name="specie" id="specie" />}
                >
                    <MenuItem value=''><em>Ei valintaa</em></MenuItem>
                    {specieOptions}
                </Select>
                {errors.SPECIES ? <FormHelperText>{errors.SPECIES}</FormHelperText> : null}
            </FormControl>
        )

        // Number input to give number of ducks
        const countInput = (
            <FormControl className={classes.formControl} fullWidth>
                <TextField
                    fullWidth
                    label="Määrä"
                    type="number"
                    value={this.state.count}
                    onChange={this._setValue('count')}
                    error={!!errors.COUNT}
                    helperText={errors.COUNT}
                    inputProps={{
                        max         : 9999,
                        min         : 1,
                    }}
                />
            </FormControl>
        )

        // Text input for optional description
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
                        Syötä <strong>{CONFIG.APP_NAME}</strong> -järjestelmään lisättävän uuden ankkahavainnon tiedot
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
                        disabled={this.state.saving || hasErrors}
                        children='Tallenna havainto'
                    />
                </DialogActions>
            </Dialog>
        )
    }

    _setValue = name => e => {
        this.setState({
            [name]          : e.target.value,
        })
    }

    // Post new sightings to the server
    _save = () => {
        const {specie, description, count} = this.state

        this.setState({
            saving              : true,
        })

        const body = JSON.stringify({
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

            this.props.onCreate()
            this.props.onClose()

            return resp.json()
        })
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.species.length < 1) return

        this.setState({
            specie              : nextProps.species[0].name,
        })
    }
}

export default withStyles(styles)(NewSpotDialog)
