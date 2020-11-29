import React from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default class Home extends React.Component {
	constructor (props) {
		super(props)
	}

	render () {
		return (
			<div className={styles.container}>
				<Head>
					<title>Create Next App</title>
					<link rel='icon' href='/favicon.ico' />
				</Head>

				<main className={styles.signupMain}>
					<h1 className={styles.title}>
						<a>Welcome to SongHub!</a>
					</h1>

					<p className={styles.description}>Get started by logging in or creating a new account!</p>

					<div className={styles.vertical}>
						<h1>Log In</h1>

						<input type='text' id='email' name='email' className={styles.textbox} placeHolder='Email' />

						<input
							type='text'
							id='password'
							name='password'
							className={styles.textbox}
							placeHolder='Password'
						/>
					</div>
            
                    <a href='upload' className={styles.signup}>
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
}
