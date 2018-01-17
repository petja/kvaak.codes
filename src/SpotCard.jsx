import React, {Component} from 'react'

import Card, {CardContent} from 'material-ui/Card'
import Typography from 'material-ui/Typography'

export default class SpotCard extends Component {
    render() {
        return (
            <Card>
                <CardContent>
                    <Typography>Test</Typography>
                </CardContent>
            </Card>
        )
    }
}
