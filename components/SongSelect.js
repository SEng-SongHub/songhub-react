import { Grid, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled'
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled'
import PropTypes from 'prop-types'
import { useState } from 'react'

// Styles
import styles from '../styles/SongSelect.module.css'

function SongSelect (props) {
  const { songs, playing } = props
  const [ selected, setSelected ] = useState(null)

  const handleSelect = (songID) => {
    props.onSelect(songID)
    setSelected(songID)
  }

  return (
    <div className={styles.songSelectContainer}>
      <Grid container direction='column'>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Album</TableCell>
              <TableCell>Artist</TableCell>
              <TableCell>Play</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={styles.songTableBody}>
            {songs.map((song, i) => (
              <TableRow className={styles.songRow} key={song.id} onClick={() => handleSelect(song.id)}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{song.name}</TableCell>
                <TableCell>{song.album}</TableCell>
                <TableCell>{song.artist}</TableCell>
                <TableCell>
                  {selected === song.id && playing ? (
                    <PauseCircleFilledIcon style={{ fontSize: 20, color: '#333' }} />
                  ) : (
                    <PlayCircleFilledIcon style={{ fontSize: 20, color: '#333' }} />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </div>
  )
}

SongSelect.propTypes = {
  songs    : PropTypes.array,
  playing  : PropTypes.bool,
  onSelect : PropTypes.func
}

export default SongSelect
