import { useEffect, useState } from "react";
import Head from 'next/head'
import axios from 'axios'
import Header from "../components/header";
import { TableBody, TableCell, TableHead, Grid, Table, TableRow, ThemeProvider, createMuiTheme } from "@material-ui/core";
import Player from "../components/player";


function song(props) {
    const [songs, setSongs] = useState([]);
    const [current, setCurrent] = useState(-1);

    useEffect(() => {
        axios({
            method: 'GET',
            responseType: 'json',
            url: 'http://localhost:5000/management/song'
        }).then(res => {
            if (res.status === 200) {
                setSongs(res.data)
            }
        });
    }, [])

    const play = (index) => {
        setCurrent(index)
    }

    const next = () => {
        setCurrent(current + 1);
    }

    const pervious = () => {
        setCurrent(current - 1);
    }

    const like = (songId) => {
        axios({
            method: 'POST',
            url: `http://localhost:5000/management/song/${songId}/like`
        }).then((res) => {
            if (res.status === 200 || res.status === 201) {
                let temp = [...songs];
                let index = songs.findIndex((song) => song.id === songId);
                let item = { ...temp[index] };
                item.likes += 1;
                temp[index] = item;
                setSongs(temp);
                console.log(temp)
            }
        })
    }

    const theme = createMuiTheme({
        palette: {
            primary: {
                main: '#333'
            },
            white: {
                text: '#fff'
            },
            secondary: {
                main: '#2980b9',
                dark: '#34495e'
            }
        }
    })

    return (
        <ThemeProvider theme={theme}>
            <Head>
                <title>Song Player</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Header />
            <Grid container direction='column'>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Album</TableCell>
                            <TableCell>Artist</TableCell>
                            <TableCell>♥</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {songs.map((song, i) => (
                            <TableRow key={song.id} onClick={() => play(i)}>
                                <TableCell>{i}</TableCell>
                                <TableCell>{song.name}</TableCell>
                                <TableCell>{song.album}</TableCell>
                                <TableCell>{song.artist}</TableCell>
                                <TableCell onClick={() => like(song.id)}>
                                    {(song.likes == 0) ? "♡" : "♥"}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </Grid>
            <Player song={songs[current]} next={next} pervious={pervious} />
        </ThemeProvider>
    )
}

export default song;