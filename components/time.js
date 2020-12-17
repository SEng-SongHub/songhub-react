import { Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'

const Time = (props) => {
  const { seconds } = props
  let min = Math.floor(seconds / 60)
  let sec = Math.floor(seconds - min * 60)

  if (min < 10) {
    min = `0${min}`
  }
  if (sec < 10) {
    sec = `0${sec}`
  }
  return <Typography>{`${min}:${sec}`}</Typography>
}

Time.propTypes = {
  seconds : PropTypes.number
}

export default Time
