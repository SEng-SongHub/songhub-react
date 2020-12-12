import React, { useState } from 'react'
import Head from 'next/head'
import axios from 'axios'
import styles from '../styles/Home.module.css'
import Router from 'next/router'
import Collapse from '@material-ui/core/Collapse'
import { v4 as uuid } from 'uuid'

export default function Home () {
  const [inputState, setInputState] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState([])

  const handleInputChange = (evt) => {
    setInputState({
      ...inputState,
      [evt.target.name]: evt.target.value
    })
  }

  const login = async (evt) => {
    evt.preventDefault()

    try {
      const res = await axios({
        method: 'POST',
        url: 'http://localhost:5000/authentication/login',
        data: inputState,
        responseType: 'json'
      })

      // Successful Login
      if (res.status === 200 || res.status === 201) {
        Router.push('/upload')
      }
    } catch (err) {
      console.log(err)
      setErrors(['Invalid Credentials'])
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>SongHub</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.signupMain}>
        <h1 className={styles.title}>
          <a>Welcome to SongHub!</a>
        </h1>

        <p className={styles.description}>Get started by logging in or creating a new account!</p>

        <div className={styles.vertical}>
          <h1>Log In</h1>

          {errors ? (
            <Collapse className={styles.errorContainer} in={errors.length > 0}>
              <div>
                <ul>{errors.map((error) => <li key={uuid()}>{error}</li>)}</ul>
              </div>
            </Collapse>
          ) : null}

          <input
            type='text'
            id='email'
            name='email'
            onChange={handleInputChange}
            className={styles.textbox}
            placeholder='Email'
          />

          <input
            type='text'
            id='password'
            name='password'
            onChange={handleInputChange}
            className={styles.textbox}
            placeholder='Password'
          />
        </div>

        <a href='#' onClick={login} className={styles.signup}>
                    Log In
        </a>

        <h2>-- OR --</h2>

        <a href='signup' className={styles.signup}>
                    Sign up!
        </a>
      </main>

      <footer className={styles.footer}>
        <a target='_blank' rel='noopener noreferrer'>
                    Powered by Sick Beats
        </a>
      </footer>
    </div>
  )
}
