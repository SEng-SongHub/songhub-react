import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, { useState } from 'react'
import Collapse from '@material-ui/core/Collapse'
import { v4 as uuid } from 'uuid'
import Router from 'next/router'
import axios from 'axios'

export default function SignUp () {
  const [ inputState, setInputState ] = useState({
    email           : '',
    password        : '',
    passwordConfirm : '',
    dob             : ''
  })

  const [ errors, setErrors ] = useState([])

  const handleInput = (evt) => {
    evt.preventDefault()

    setInputState({
      ...inputState,
      [evt.target.name]: evt.target.value
    })
  }

  const validateInputs = () => {
    const inputErrors = []

    if (inputState.email.length === 0) {
      inputErrors.push('You must enter an email!')
    }
    if (inputState.password.length < 8) {
      inputErrors.push('You must enter a password that is at least 8 characters long!')
    }

    // Calculate dob time difference in years
    const dateOfBirth = Date.parse(inputState.dob)
    const timeDifference = Math.ceil(Math.abs(dateOfBirth) / (1000 * 60 * 60 * 24 * 365) - 51)
    if (inputState.dob.length === 0 || timeDifference > -13) {
      inputErrors.push('You must be at least 13 years old to use SongHub.')
    }

    if (inputState.password !== inputState.passwordConfirm) {
      inputErrors.push('Your passwords must match.')
    }

    if (inputErrors.length > 0) {
      setErrors(inputErrors)

      return false
    }

    return true
  }

  const registerUser = async (evt) => {
    evt.preventDefault()

    // Validate
    if (validateInputs()) {
      // Start register on backend
      try {
        const res = await axios({
          method       : 'POST',
          url          : 'http://localhost:5000/auth/register',
          data         : inputState,
          responseType : 'json'
        })

        // Successful Login
        if (res.status === 200 || res.status === 201) {
          Router.push('/')
        }
      } catch (err) {
        setErrors([ 'Error occurred registering your account. Reason: Account already exists with that email.' ])
      }
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Signup</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.signupMain}>
        <h1 className={styles.title}>
          <a>Signup for SongHub!</a>
        </h1>

        <p className={styles.description}>A world of free, unlimited music is waiting...</p>

        <div className={styles.vertical}>
          <p className={styles.descriptionsmall}>Please give us a bit of information about youself to get started!</p>

          {errors ? (
            <Collapse className={styles.errorContainer} in={errors.length > 0}>
              <div>
                <ul>{errors.map((error) => <li key={uuid()}>{error}</li>)}</ul>
              </div>
            </Collapse>
          ) : null}

          <input
            type='email'
            id='email'
            onChange={handleInput}
            name='email'
            className={styles.textbox}
            placeholder='Email'
          />

          <input
            type='password'
            id='password'
            onChange={handleInput}
            name='password'
            className={styles.textbox}
            placeholder='Password'
          />

          <input
            type='password'
            id='passwordConfirm'
            name='passwordConfirm'
            onChange={handleInput}
            className={styles.textbox}
            placeholder='Confirm Password'
          />

          <input type='date' id='dob' onChange={handleInput} name='dob' className={styles.datepicker} />

          <a href='#' onClick={registerUser} className={styles.signup}>
            Sign up!
          </a>
        </div>

        <h2>-- OR --</h2>

        <a href='#' className={styles.signupGoogle}>
          Sign Up Using Google
        </a>
      </main>

      <footer className={styles.footer}>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'>
          Powered by Sick Beats
        </a>
      </footer>
    </div>
  )
}
