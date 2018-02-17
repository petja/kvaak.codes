import React, {Component} from 'react'

// Third party
import classnames from 'classnames'

import RelativeTime from './RelativeTime.jsx'

// Material UI
import {withStyles} from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import Button from 'material-ui/Button'

const styles = theme => ({
    root                    : {
        zIndex                  : 1,
        background              : theme.palette.background.paper,
        position                : 'fixed',
        maxWidth                : '70em',
        width                   : '100%',
        height                  : 'calc(100vh - 56px)',
        top                     : '56px',
        visibility              : 'hidden',
        boxShadow               : '0 0 0.5em rgba(0,0,0,0.5)',
        textAlign               : 'center',
        paddingTop              : '2em',
    },
    animation               : {
        zIndex                  : 2,
    },
    quote                   : {
        fontFamily              : '"Roboto Slab"',
        fontSize                : '1.2em',
        color                   : theme.typography.body1.color,
    },
})

const animationConfig = {
    duration            : 200,
    fill                : 'forwards',
}

class SightExpand extends Component {
    state = {
        expandOrigin            : null,
        sighting                : {},
    }

    render() {
        const {classes, sighting} = this.props

        if(!sighting) return null

        const {id, species, count, description, dateTime} = sighting

        const animationElement = (
            <div
                className={classnames(classes.expand, classes.animation)}
                ref='animation'
            />
        )

        const expandElement = (
            <div
                className={classes.root}
                ref='expand'
            >
                <Typography variant='display1' gutterBottom>havainto #{id}</Typography>

                <Typography>
                    {species}&emsp;&middot;&emsp;
                    {count} kpl&emsp;&middot;&emsp;
                    <RelativeTime date={dateTime} />
                </Typography>

                <br />

                <Divider />

                <blockquote className={classes.quote}>
                    {description}
                </blockquote>

                <Button
                    color='secondary'
                    onClick={this.props.onClose}
                >
                    Paluu
                </Button>
            </div>
        )

        return (
            <div>
                {animationElement}
                {expandElement}
            </div>
        )
    }

    _showOpenAnimation = () => {
        const {offsetTop, offsetHeight} = this.state.expandOrigin || document.body
        const animatable = this.refs.animation

        console.log({offsetTop, offsetHeight})

        const startFrom = offsetTop - document.body.scrollTop

        animatable.style.visibility = 'visible'

        const animation = animatable.animate([{
            top             : `${startFrom}px`,
            height          : `${offsetHeight}px`,
            opacity         : 0,
        },{
            top             : `56px`,
            height          : `calc(100vh - 56px)`,
            opacity         : 1,
        }], animationConfig)

        animation.onfinish = this._revealExpand
    }

    _showCloseAnimation = () => {
        const {offsetTop, offsetHeight} = this.state.expandOrigin || document.body
        const animatable = this.refs.animation
        const expand = this.refs.expand

        console.log({offsetTop, offsetHeight})

        const startFrom = offsetTop - document.body.scrollTop

        expand.style.visibility = 'hidden'
        animatable.style.visibility = 'visible'

        const animation = animatable.animate([{
            top             : `64px`,
            height          : `calc(100vh - 64px)`,
            opacity         : 1,
        },{
            top             : `${startFrom}px`,
            height          : `${offsetHeight}px`,
            opacity         : 0,
        }], {
            duration        : 200,
            fill            : 'forwards',
        })

        return new Promise(fulfill => {
            animation.onfinish = () => {
                animatable.style.visibility = 'hidden'
                fulfill()
            }
        })
    }

    // Fade out overlay from the top of sighting info
    _revealExpand = () => {
        const animatable = this.refs.animation
        const expand = this.refs.expand

        expand.style.visibility = 'visible'

        const animation = animatable.animate([{
            opacity         : 1,
        },{
            opacity         : 0,
        }], animationConfig)

        animation.onfinish = () => {
            animatable.style.visibility = 'hidden'
        }
    }

    componentWillReceiveProps(nextProps) {

        const currentProps = this.props

        const willOpen = nextProps.sighting
        const didOpen = currentProps.sighting

        // If sighting has been set to props
        if(willOpen && !didOpen) {
            this.setState({
                sighting            : nextProps.sighting,
                expandOrigin        : document.body,
            }, () => {
                this._showOpenAnimation()
            })
        } else if (!willOpen && didOpen) {
            this._showCloseAnimation()
        }

    }
}

export default withStyles(styles)(SightExpand)
