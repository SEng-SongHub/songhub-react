import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'
import React, { Component } from 'react'
import Head from 'next/head'

// Components
import SongPlayer from '../components/SongPlayer/SongPlayer'

// Styles
import styles from '../styles/Play.module.css'

export default class play extends Component {

    constructor(props) {
        super(props)
    }

    static defaultProps = {
        song: {
            name: 'With a Spirit',
            artist: '009 Sound System',
            fileFormat: 'mp3',
            path: '/files/song.mp3',
        }
    }

    propTypes = {
        song: PropTypes.object,
    }

    render() {
        const { song } = this.props
        return (
            <div className={styles.container}>
                <Head>
                    <title>Listening to { song.name }...</title>
                    <link rel='icon' href='/favicon.ico' />
                </Head>
                <Grid container direction="row" justify="center" alignItems="center">
                    <Grid className={styles.playerContainer} item xs={12}>
                        <SongPlayer song={song} />
                    </Grid>
                </Grid>
            </div>
        )
    }
}
