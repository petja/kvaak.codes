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
        pointerEvents           : 'none',
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
        sighting                : {},
    }

    render() {
        const {classes} = this.props
        const {id, species, count, description, dateTime} = this.state.sighting

        const animationElement = (
            <div
                className={classnames(classes.root, classes.animation)}
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
        const {offsetTop, offsetHeight} = this.props.expandOrigin || document.body
        const animatable = this.refs.animation

        const startFrom = offsetTop - document.body.scrollTop

        animatable.style.visibility = 'visible'

        const animation = animatable.animate([{
            top             : `${startFrom}px`,
            height          : `${offsetHeight}px`,
        },{
            top             : `56px`,
            height          : `calc(100vh - 56px)`,
        }], animationConfig)

        return animation
    }

    _showCloseAnimation = () => {
        const {offsetTop, offsetHeight} = this.props.expandOrigin || document.body
        const animatable = this.refs.animation
        const expand = this.refs.expand

        const startFrom = offsetTop - document.body.scrollTop

        console.log(this.refs)

        expand.style.visibility = 'hidden'
        animatable.style.visibility = 'visible'

        const animation = animatable.animate([{
            top             : `64px`,
            height          : `calc(100vh - 64px)`,
        },{
            top             : `${startFrom}px`,
            height          : `${offsetHeight}px`,
        }], animationConfig)

        return new Promise(fulfill => {
            animation.onfinish = () => {
                animatable.style.visibility = 'hidden'
                fulfill()
            }
        })
    }

    // Fade out overlay from the top of sighting info
    // Direction true: Fade out overlay after expanding card
    // Direction false: Fade in overlay before collapsing card
    _fadeOverlay = direction => {
        const animatable = this.refs.animation
        const expand = this.refs.expand

        animatable.style.visibility = 'visible'
        expand.style.visibility = 'visible'

        const animation = animatable.animate([{
            opacity         : direction ? 1 : 0,
        },{
            opacity         : direction ? 0 : 1,
        }], animationConfig)

        return animation
    }

    componentDidUpdate(currentProps) {

        const nextProps = this.props

        const willOpen = nextProps.sighting
        const didOpen = currentProps.sighting

        if(!this.refs.animation) return
        console.log('did update', this.refs)

        // If sighting has been set to props
        if(willOpen && !didOpen) {
            this.setState({
                sighting            : nextProps.sighting,
            })

            const ready = () => {
                this.refs.expand.visibility = 'visible'
                this._fadeOverlay(true)
            }

            if(!this.refs.animation) return ready()

            const animation = this._showOpenAnimation()
            animation.onfinish = ready

        } else if (!willOpen && didOpen) {
            const animation = this._fadeOverlay(false)
            animation.onfinish = () => {
                this.refs.expand.visibility = 'hidden'
                this._showCloseAnimation()
            }
        }

    }
}

export default withStyles(styles)(SightExpand)
