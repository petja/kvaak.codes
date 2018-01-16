//import React, {Component} from 'react'

/*class MainLayout extends Component {
    render() {
        return (
        )
    }
}*/








import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

const styles = {
      root: {
              width: '100%',
            },
};

function SimpleAppBar(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography type="title" color="inherit">
                        Ankkajahti
                    </Typography>
                </Toolbar>
            </AppBar>
            <Typography>ohfsf</Typography>
        </div>
    );
}

SimpleAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleAppBar)
