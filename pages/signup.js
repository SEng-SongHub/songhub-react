import Head from 'next/head'
import React, { Component } from 'react'
import styles from '../styles/Home.module.css'

export default class Home extends Component {
	render () {
		return (
			<div className={styles.container}>
				<Head>
					<title>Create Next App</title>
					<link rel='icon' href='/favicon.ico' />
				</Head>

				<main className={styles.signupMain}>
					<h1 className={styles.title}>
						<a>Signup for SongHub!</a>
					</h1>

					<p className={styles.description}>A world of free, unlimited music is waiting...</p>

					<div className={styles.vertical}>
						<p className={styles.descriptionsmall}>
							Please give us a bit of information about youself to get started!
						</p>

						<input type='text' id='email' name='email' className={styles.textbox} placeHolder='Email' />

						<input
							type='text'
							id='password'
							name='password'
							className={styles.textbox}
							placeHolder='Password'
						/>

						<input
							type='text'
							id='passwordConfirm'
							name='passwordConfirm'
							className={styles.textbox}
							placeHolder='Confirm Password'
						/>

						<input type='date' id='dob' name='dob' className={styles.datepicker} />

						<a href='upload' className={styles.signup}>
							Sign up!
						</a>
					</div>

					<h2>-- OR --</h2>

					<a href='upload' className={styles.signupGoogle}>
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
}
