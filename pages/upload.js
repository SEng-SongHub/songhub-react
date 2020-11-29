import { Button, Divider, Grid, Paper, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import Head from 'next/head'
import Layout from '../components/layout'
import { makeStyles } from '@material-ui/core/styles'
import { DropzoneArea } from 'material-ui-dropzone'

const useStyles = makeStyles((theme) => ({
  container: {
    height: '90vh'
  },
  form: {
    padding: '4rem',
    width: 700
  },
  paragraph: {
    marginBottom: '2rem'
  },
  input: {
    width: '100%',
    paddingBottom: '1rem'
  },
  input2: {
    width: '100%',
    paddingBottom: '2rem'
  },
  btn: {
    margin: `${theme.spacing(2)}px ${theme.spacing(2)}px 0 0`
  }
}))
const Upload = () => {
  const [_, setFiles] = useState()
  const classes = useStyles()

  const handle = (files) => {
    setFiles(files)
  }

  return (
    <Layout>
      <Head>
        <title>Upload Song</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Grid className={classes.container} container direction="column" justify="center" alignItems="center">
        <Paper className={classes.form} elevation={3}>
          <Typography variant="h2" gutterBottom>Upload</Typography>
          <Typography className={classes.paragraph} variant="body1" gutterBottom>
                        Upload song by inputing the song name, album, and drag
                        the file into the upload box or click on it to find it
                        in your file system
          </Typography>
          <form noValidate autoComplete="off">
            <TextField variant="outlined" className={classes.input} name="album" label="Album Name" />
            <TextField variant="outlined" className={classes.input2} name="name" label="Song Name" />
            <DropzoneArea onChange={handle} />
            <Divider />
            <a href="play">
            <Button className={classes.btn} variant="contained" color="primary">
                            Upload
            </Button>
            </a>
            <Button className={classes.btn} variant="contained" color="secondary">
                            Cancel
            </Button>
          </form>
        </Paper>
      </Grid>
    </Layout>
  )
}

export default Upload
