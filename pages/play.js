import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class play extends Component {

    static defaultProps () {
        return {
            song: {
                path: '/files/song.mp3'
            }
        }
    }

    propTypes = {
        song: PropTypes.object,
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}
