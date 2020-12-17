import { Grid, createMuiTheme, ThemeProvider } from '@material-ui/core'
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled'
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled'
import FastForwardIcon from '@material-ui/icons/FastForward'
import FastRewindIcon from '@material-ui/icons/FastRewind'
import VolumeIcon from '@material-ui/icons/VolumeUp'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import LinearProgress from '@material-ui/core/LinearProgress'
import React, { useState, useRef, useEffect } from 'react'
import Time from '../components/time'
import SongSelect from '../components/SongSelect'
import Head from 'next/head'
import axios from 'axios'

// Styles
import styles from '../styles/Play.module.css'

function play () {
  const [ songs, setSongs ] = useState([])
  const [ song, setSong ] = useState(null)
  const [ playing, setPlaying ] = useState(false)
  const [ progress, updateProgress ] = useState(0)
  const [ length, setLength ] = useState(0)
  const [ volume, setVolume ] = useState(60)
  const audio = useRef(null)

  useEffect(() => {
    axios({
      method       : 'GET',
      responseType : 'json',
      url          : 'http://localhost:5000/management/song'
    })
      .then((res) => {
        if (res.status === 200) {
          setSongs(res.data)

          // Init with first song
          setSong(res.data[0])
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const selectSong = (id) => {
    if (id) {
      axios({
        method : 'GET',
        url    : `http://localhost:5000/management/song/${id}`
      }).then((res) => {
        if (res.status === 200 || res.status === 201) {
          setSong(res.data)
          setPlaying(true)
          updateProgress(0)

          // required to reset progress of song immediatly
          audio.current.currentTime = 0
        }
      })
    }
  }

  useEffect(
    () => {
      if (audio != null && song) {
        const a = audio.current
        if (playing) {
          a.play()
        } else {
          a.pause()
        }
      }
    },
    [ audio, song, playing ]
  )

  useEffect(
    () => {
      if (audio !== null && song) {
        audio.current.currentTime = progress
      }
    },
    [ audio, song ]
  )

  useEffect(
    () => {
      if (audio !== null && song) {
        const v = Math.min(Math.max(volume, 0), 100) / 100
        audio.current.volume = v
      }
    },
    [ audio, song, volume ]
  )

  const updateTime = (event) => {
    if (event.currentTarget.currentTime === length) {
      updateProgress(0)
      setPlaying(false)
    }
    updateProgress(event.currentTarget.currentTime)
  }

  const seek = (time) => {
    audio.current.currentTime = time
  }

  const onReady = (event) => {
    setLength(event.currentTarget.duration)
  }

  const changeVolume = (event) => {
    var x = event.pageX - event.currentTarget.offsetLeft
    var clickedValue = x * event.currentTarget.max / event.currentTarget.offsetWidth
    setVolume(clickedValue)
  }

  const theme = createMuiTheme({
    palette : {
      primary   : {
        main : '#333'
      },
      white     : {
        text : '#fff'
      },
      secondary : {
        main : '#2980b9',
        dark : '#34495e'
      }
    }
  })

  return (
    <div className={styles.container}>
      <Head>
        <title>SongHub | Player</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Grid container direction='column' justify='center' alignItems='center' alignContent='center'>
        <Grid style={{ width: '100%' }} className={styles.playerContainer} item xs={10} lg={6}>
          {!song ? null : (
            <div className={styles.both}>
              <audio
                src={encodeURI(`http://localhost:5000${song.file}`)}
                ref={audio}
                onTimeUpdate={updateTime}
                onLoadedMetadata={onReady}>
                Your browser does not support the <code>audio</code> element.
              </audio>
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
                      <Grid container justify='space-around' direction='row' alignItems='center'>
                        <Time seconds={progress} />
                        <div style={{ width: '80%' }}>
                          <LinearProgress
                            style={{
                              height       : '8px',
                              borderRadius : '2px'
                            }}
                            variant='determinate'
                            value={progress / length * 100}
                          />
                        </div>
                        <Time seconds={length} />
                      </Grid>
                    </ThemeProvider>
                  </Grid>
                  <Grid item xs={4}>
                    <p onClick={() => seek(progress - 5)}>
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
                    <p onClick={() => seek(progress + 5)}>
                      <FastForwardIcon style={{ fontSize: 30 }} />
                    </p>
                  </Grid>
                  <Grid item xs={8}>
                    <p />
                  </Grid>
                  <ThemeProvider theme={theme}>
                    <Grid className={styles.volumeSlider} item xs={4}>
                      <VolumeIcon style={{ color: '#333' }} />
                      <progress onClick={changeVolume} value={volume} min={0} max={100} />
                    </Grid>
                  </ThemeProvider>
                </Grid>
              </div>
            </div>
          )}
        </Grid>
      </Grid>
      <Grid style={{ position: 'absolute', bottom: '2rem', width: '100%' }} item xs={12}>
        <SongSelect songs={songs} playing={playing} onSelect={selectSong} />
      </Grid>
    </div>
  )
}

export default play
