import { Card, Grid, TextField } from '@material-ui/core';
import Head from 'next/head';
import React from 'react';

export default class Upload extends React.Component {

    render() {
        return (
            <Grid>
                <Grid>
                    <div>upload</div>
                    <form noValidate autoComplete="off">
                        <TextField label="Song Name" />
                        <Card>

                        </Card>
                    </form>
                </Grid>
            </Grid>
        )
    }

}