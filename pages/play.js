import PropTypes from 'prop-types'
import { Grid, createMuiTheme, ThemeProvider, Button } from '@material-ui/core'
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled'
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled'
import FastForwardIcon from '@material-ui/icons/FastForward'
import FastRewindIcon from '@material-ui/icons/FastRewind'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import LinearProgress from '@material-ui/core/LinearProgress'
import React, { useState, useRef } from 'react'
import Head from 'next/head'
import axios from 'axios'

// Styles
import styles from '../styles/Play.module.css'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Time from '../components/time'

function play() {
  const router = useRouter();
  const { id } = router.query;
  const [song, setSong] = useState(null);
  const [playing, setPlaying] = useState(false)
  const [progress, updateProgress] = useState(0)
  const [length, setLength] = useState(0);
  let audio = useRef(null);

  React.useEffect(() => {
    if (id) {
      axios({
        method: 'GET',
        url: `http://localhost:5000/management/song/${id}`
      }).then((res) => {
        if (res.status === 200 || res.status === 201) {
          setSong(res.data);
        }
      })
    }
  }, [id])

  React.useEffect(() => {
    if (audio != null && song) {
      let a = audio.current;
      if (playing) {
        a.play();
      } else {
        a.pause();
      }
    }
  }, [audio, song, playing]);

  React.useEffect(() => {
    if (audio !== null && song) {
      audio.current.currentTime = progress;
    }
  }, [audio, song]);

  const updateTime = (event) => {
    updateProgress(event.currentTarget.currentTime);
  }

  const seek = (time) => {
    audio.current.currentTime = time;
  }

  const onReady = (event) => {
    setLength(event.currentTarget.duration);
  }

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
        <title>Listening to the newly uploaded song.</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Grid container direction='column' justify='center' alignItems='center' alignContent='center'>
        <Grid style={{ width: '100%' }} className={styles.playerContainer} item xs={10} lg={6}>
          {
            !song ? null :
              <div className={styles.both}>
                <audio src={encodeURI(`http://localhost:5000${song.file}`)} ref={audio} onTimeUpdate={updateTime} onLoadedMetadata={onReady} >Your browser does not support the <code>audio</code> element.</audio>
                <div className={styles.top}>
                  <p style={{ textAlign: 'left', marginTop: '0' }}>
                    <a href='/upload'>
                      <ArrowBackIcon style={{ fontSize: 30, color: '#fff' }} />
                    </a>
                  </p>
                  <h2>{song.name}</h2>
                  <h3>{song.artist}</h3>
                </div>
                <div className={styles.bottom}>
                  <Grid container justify='center' alignContent='center' alignItems='center'>
                    <Grid item xs={10}>
                      <ThemeProvider theme={theme}>
                        <Grid container justify='space-around' direction="row" alignItems='center'>
                          <Time seconds={progress} />
                          <div style={{ width: '80%' }}>
                            <LinearProgress
                              style={{
                                height: '8px',
                                borderRadius: '2px'
                              }}
                              variant='determinate'
                              value={progress}
                            />
                          </div>
                          <Time seconds={length} />
                        </Grid>
                      </ThemeProvider>
                    </Grid>
                    <Grid item xs={4}>
                      <p onClick={() => seek(progress - 15)}>
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
                      <p onClick={() => seek(progress + 15)}>
                        <FastForwardIcon style={{ fontSize: 30 }} />
                      </p>
                    </Grid>
                  </Grid>
                </div>
              </div>
          }
        </Grid>
        <Grid style={{ marginTop: '3rem' }} item xs={12}>
          <Link href="/song">
            <Button>
              View all Uploaded Songs
            </Button>
          </Link>
        </Grid>
      </Grid>
    </div>
  )
}

export default play
