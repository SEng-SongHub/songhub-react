import { Button, Divider, Grid, Paper, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import Head from 'next/head'
import Layout from '../components/layout'
import { makeStyles } from '@material-ui/core/styles'
import { DropzoneArea } from 'material-ui-dropzone'
import axios from 'axios'
import Router from 'next/router'

const useStyles = makeStyles((theme) => ({
  container : {
    height : '90vh'
  },
  form      : {
    padding : '4rem',
    width   : 700
  },
  paragraph : {
    marginBottom : '2rem'
  },
  input     : {
    width         : '100%',
    paddingBottom : '1rem'
  },
  input2    : {
    width         : '100%',
    paddingBottom : '2rem'
  },
  btn       : {
    margin : `${theme.spacing(2)}px ${theme.spacing(2)}px 0 0`
  }
}))
const Upload = () => {
  const [ files, setFiles ] = useState([])
  const [ inputState, setInputState ] = useState({
    name   : '',
    artist : ''
  })
  const classes = useStyles()

  const handle = (selectedFiles) => {
    console.log(selectedFiles)
    setFiles(selectedFiles)
  }

  const handleFieldChange = (evt) => {
    setInputState({
      ...inputState,
      [evt.target.name]: evt.target.value
    })
  }

  const handleUpload = (evt) => {
    evt.preventDefault()
    uploadFiles(inputState.name, inputState.artist)
  }

  const uploadFiles = async (name, artist) => {
    console.log(files)
    if (files.length === 1) {
      const formData = new FormData()
      formData.append('file', files[0])
      formData.append('name', name)
      formData.append('artist', artist)

      // Make request to backend
      try {
        const res = await axios({
          method       : 'POST',
          data         : formData,
          responseType : 'json',
          url          : 'http://localhost:5000/management/song'
        })

        if (res.status === 200 || res.status === 201) {
          alert('Files uploaded!')
          Router.push('/play')
        }
      } catch (err) {
        console.log(`Failed to upload files. Reason: ${err}`)
        alert(`${err}`)
      }
    }
  }

  return (
    <Layout>
      <Head>
        <title>Upload Song</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Grid className={classes.container} container direction='column' justify='center' alignItems='center'>
        <Paper className={classes.form} elevation={3}>
          <Typography variant='h2' gutterBottom>
            Upload
          </Typography>
          <Typography className={classes.paragraph} variant='body1' gutterBottom>
            Upload song by inputing the song name, album, and drag the file into the upload box or click on it to find
            it in your file system
          </Typography>
          <form noValidate autoComplete='off'>
            <TextField variant='outlined' className={classes.input} name='album' label='Album Name' />
            <TextField
              variant='outlined'
              className={classes.input}
              onChange={handleFieldChange}
              name='artist'
              label='Artist Name'
              value={inputState.artist}
            />
            <TextField
              variant='outlined'
              className={classes.input2}
              onChange={handleFieldChange}
              name='name'
              label='Song Name'
              value={inputState.name}
            />
            <DropzoneArea filesLimit={1} onChange={handle} />
            <Divider />
            <a href='play'>
              <Button className={classes.btn} variant='contained' onClick={handleUpload} color='primary'>
                Upload
              </Button>
            </a>
            <Button className={classes.btn} variant='contained' color='secondary'>
              Cancel
            </Button>
          </form>
        </Paper>
      </Grid>
    </Layout>
  )
}

export default Upload
