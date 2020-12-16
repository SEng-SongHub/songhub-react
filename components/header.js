import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Link from 'next/link'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between'
  },
}))

const Header = () => {
  const classes = useStyles()

  return (
    <AppBar position="static">
      <Toolbar className={classes.root}>
        <Typography variant="h6">
          SongHub
      </Typography>
        <div>
          <Link href="/song">
            <Button color="inherit">
              Listen
            </Button>
          </Link>
          <Link href="/upload">
            <Button color="inherit">
              Upload
            </Button>
          </Link>
          <Link href="/">
            <Button color="inherit">
              Signout
            </Button>
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header
