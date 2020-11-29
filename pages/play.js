import PropTypes from 'prop-types'
import { Grid, createMuiTheme, ThemeProvider } from '@material-ui/core'
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled'
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled'
import FastForwardIcon from '@material-ui/icons/FastForward'
import FastRewindIcon from '@material-ui/icons/FastRewind'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import LinearProgress from '@material-ui/core/LinearProgress'
import React, { useState } from 'react'
import Head from 'next/head'

// Styles
import styles from '../styles/Play.module.css'

function play (props) {
  const { song } = props

  const [playing, setPlaying] = useState(false)
  const [progress, updateProgress] = useState(0)

  React.useEffect(
    () => {
      const timer = setInterval(() => {
        updateProgress((oldProgress) => {
          if (oldProgress === 100) {
            return 0
          }
          console.log(playing)
          const diff = playing === true ? 1 : 0
          return Math.min(oldProgress + diff, 100)
        })
      }, 1000)

      return () => {
        clearInterval(timer)
      }
    },
    [playing]
  )

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#333'
      },
      white: {
        text: '#fff'
      },
      secondary: {
        main: '#2980b9',
        dark: '#34495e'
      }
    }
  })

  return (
    <div className={styles.container}>
      <Head>
        <title>Listening to {song.name}...</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Grid container direction='row' justify='center' alignItems='center' alignContent='center'>
        <Grid className={styles.playerContainer} item xs={6} lg={4}>
          <div className={styles.both}>
            <div className={styles.top}>
              <p style={{ textAlign: 'left', marginTop: '0' }}>
                <a href='/'>
                  <ArrowBackIcon style={{ fontSize: 30, color: '#fff' }} />
                </a>
              </p>
              <h2>{song.name}</h2>
              <h3>{song.artist}</h3>
            </div>
            <div className={styles.bottom}>
              <Grid container justify='center' alignContent='center' alignItems='center'>
                <Grid item xs={10}>
                  <p>
                    <ThemeProvider theme={theme}>
                      <LinearProgress
                        style={{
                          height: '8px',
                          borderRadius: '2px'
                        }}
                        variant='determinate'
                        value={progress}
                      />
                    </ThemeProvider>
                  </p>
                </Grid>
                <Grid item xs={4}>
                  <p onClick={() => updateProgress(progress - 15)}>
                    <FastRewindIcon style={{ fontSize: 30 }} />
                  </p>
                </Grid>
                <Grid item xs={4}>
                  <p onClick={() => setPlaying((st) => !st)}>
                    {playing ? (
                      <PauseCircleFilledIcon style={{ fontSize: 60 }} />
                    ) : (
                      <PlayCircleFilledIcon style={{ fontSize: 60 }} />
                    )}
                  </p>
                </Grid>
                <Grid item xs={4}>
                  <p onClick={() => updateProgress(progress + 15)}>
                    <FastForwardIcon style={{ fontSize: 30 }} />
                  </p>
                </Grid>
              </Grid>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

play.propTypes = {
  song: PropTypes.object
}

play.defaultProps = {
  song: {
    name: 'With a Spirit',
    artist: '009 Sound System',
    path: '',
    img_src: '/public/files/song_cover.jpg'
  }
}

export default play
