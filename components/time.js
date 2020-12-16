import { Typography } from '@material-ui/core';
import React from 'react';

const Time = ({ seconds }) => {
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds - min * 60);

    if (min < 10) { min = `0${min}` }
    if (sec < 10) { sec = `0${sec}` }
    return <Typography>{`${min}:${sec}`}</Typography>;
}

export default Time;
