import { AppBar, Toolbar, makeStyles, Typography } from '@material-ui/core';
import React, { useState, useEffect, useRef } from 'react';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: "fixed",
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: "#000",
        color: 'white',
        height: '70px'
    },
    progressBar: {
        width: '100%',
        padding: '0rem 1rem',
        boxSizing: 'border-box',
        appearance: "none",
        cursor: "pointer",
        '&::-webkit-progress-bar': {
            backgroundColor: '#fff',
            borderRadius: '2px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.25) inset',
        }
    },
    media: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    playerButtons: {
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%'
    },
    playerInfo: {

    },
    volume: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    }
}));

const Time = ({ seconds }) => {
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds - min * 60);

    if (min < 10) { min = `0${min}` }
    if (sec < 10) { sec = `0${sec}` }
    return <span>{`${min}:${sec}`}</span>;
}

const Player = ({ song, next, pervious }) => {
    const classes = useStyles();
    let [playing, setPlaying] = useState(false);
    let [currentTime, setCurrentTime] = useState(0);
    let [volume, setVolume] = useState(100);
    let [length, setLength] = useState(0);
    let audio = useRef(null);

    useEffect(() => {
        if (audio != null && song) {
            let a = audio.current;
            if (playing) {
                a.play();
            } else {
                a.pause();
            }
        }
    }, [audio, song, playing]);

    useEffect(() => {
        if (audio !== null && song) {
            audio.current.currentTime = currentTime;
        }
    }, [audio, song]);

    useEffect(() => {
        if (audio !== null && song) {
            let v = Math.min(Math.max(volume, 0), 100) / 100;
            audio.current.volume = v;
        }
    }, [audio, song, volume])

    const updateTime = (event) => {
        setCurrentTime(event.currentTarget.currentTime);
    }

    const onReady = (event) => {
        setLength(event.currentTarget.duration);
        // setLoading(false);
    }

    const onSeek = (event) => {
        let unit = length / event.currentTarget.clientWidth;
        let x = event.pageX - event.currentTarget.offsetLeft;
        let value = x * unit;
        if (audio !== null) {
            audio.current.currentTime = value;
        }
    }

    const changeVolume = (event) => {
        let unit = length / event.currentTarget.clientWidth;
        let x = event.pageX - event.currentTarget.offsetLeft;
        let value = x * unit;
        setVolume(value);
    }

    return <div position="fixed" className={classes.appBar}>
        <Toolbar className={classes.media}>
            {
                !song ? <div /> :
                    <>
                        <div>
                            <Typography>{song.name}</Typography>
                            <Typography>{song.album} - {song.artist}</Typography>
                        </div>
                        <div>
                            <audio src={encodeURI(`http://localhost:5000${song.file}`)} ref={audio} onTimeUpdate={updateTime} onLoadedMetadata={onReady} >Your browser does not support the <code>audio</code> element.</audio>
                            <div className={classes.playerButtons}>
                                <button onClick={() => pervious()}><img src="/previous.svg" /></button>
                                <button onClick={() => setPlaying(!playing)}><img src={playing ? "/pause.svg" : "/play.svg"} /></button>
                                <button onClick={() => next()}><img src="/next.svg" /></button>
                            </div>
                            <div className={classes.playerInfo}>
                                <Time seconds={currentTime} />
                                <progress onClick={onSeek} value={currentTime} max={length} />
                                <Time seconds={length} />
                            </div>
                        </div>
                        <div className={classes.volume}>
                            <img src="/volume.svg" />
                            <progress onClick={changeVolume} value={volume} min={0} max={100} />
                        </div>
                    </>
            }
        </Toolbar>
    </div >
}

export default Player;