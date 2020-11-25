import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Grid, Button } from '@material-ui/core/'
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';

// Styles
import styles from './SongPlayer.module.css'

export default class SongPlayer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            progress: 35.0,
            end: 100.0,
            liked: false,
            shuffleEnabled: false,
            paused: false
        }

        this.togglePlay = this.togglePlay.bind(this)
    }

    propTypes = {
        cover: PropTypes.any,
        song: PropTypes.object,
    }

    togglePlay(evt) {
        evt.preventDefault()
        this.setState({
			paused : !this.state.paused
		});
    }

    render() {
        const { song } = this.props
        return (
            <Grid className={styles.container} container >
                <Grid className={styles.photoContainer} container item xs={12} direction="row" justify="center" alignItems="center">
                    <img src='/files/song_cover.jpg' alt="Album Cover Photo" width={250} height={250} />
                </Grid>
                <Grid className={styles.songInfoContainer} container item xs={12} direction="column">
                    <h1>{song.name}</h1>
                    <h3>{song.artist}</h3>
                    <h4>File format - {song.fileFormat}</h4>
                </Grid>
                <Grid className={styles.controlsContainer} container item xs={12} direction="row" justify="center" alignItems="center">
                    <Grid className={styles.controlsProgressStart} item xs={4} alignItems="center" justify="center">
                        1:22
                    </Grid>
                    <Grid className={styles.controlsButtons} item xs={4} alignItems="center" justify="center">
                        <a href='#' onClick={this.togglePlay}>
                            {this.state.paused ? 'Play' : 'Pause'}
                        </a>
                    </Grid>
                    <Grid className={styles.controlsProgressEnd} item xs={4} alignItems="center" justify="center">
                        -4:08
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <LinearProgress className={styles.progressBar} style={{
                        backgroundColor: '#f0f0f0',
                        height: '20px'
                    }} color="primary" variant="determinate" value={this.state.progress} />
                </Grid>
            </Grid>
        )
    }
}
