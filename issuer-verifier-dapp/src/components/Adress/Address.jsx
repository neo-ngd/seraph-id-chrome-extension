import React from 'react';
import {Box, makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles(({spacing}) => ({
    container: {

    },
    address: {
        borderRadius: '12px',
        padding: '0 25px',
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    caption: {
        color: 'white',
    }
}));
const Address = ({address}) => {
    const classes = useStyles();

    return (
        <Box className={classes.container}>
            <Typography className={classes.caption} variant={'caption'}>
                Current address
            </Typography>
            <Box className={classes.address}>
                <Typography variant={'body2'}>
                    {address}
                </Typography>
            </Box>
        </Box>
    )
};

export default Address;
