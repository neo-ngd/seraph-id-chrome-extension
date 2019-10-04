import React, {createRef, useEffect, useState} from 'react';
import {makeStyles, Box, Typography, CircularProgress} from "@material-ui/core";
import BaseButton from "../../components/Buttons/BaseButton";
import RotationLogo from "../../components/RotatingLogo/RotatingLogo";
import {useDispatch} from "react-redux";
import {IMPORT_ERROR_MSG, IMPORT_SUCCESS_MSG, SUCCESS, ERROR, WALLET_NAME} from "../../commons/constants";
import {importWalletAlias} from "../Background/actions";

const useStyles = makeStyles(({palette, spacing}) => ({
    container: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column'
    },
    text: {
        color: palette.text.primary,
    },
    textSuccess: {
        color: palette.text.hint,
    },
    textError: {
        color: palette.text.error,
    },
    input: {
        display: 'none',
    },
    inputLabel: {
        margin: spacing(3)
    },
    loader: {
        color: palette.text.primary,
        margin: spacing(3),
    }
}));

const Form = () => {
    const dispatch = useDispatch();
    const [isUploading, setIsUploading] = useState(false);
    const [ status, setStatus ] = useState(null);
    const classes = useStyles();
    const fileInput = createRef();

    useEffect(() => {
        chrome.runtime.onMessage.addListener(request => {
            if (request.msg === IMPORT_SUCCESS_MSG) {
                setIsUploading(false);
                setStatus(SUCCESS)
            }
            if (request.msg === IMPORT_ERROR_MSG) {
                setIsUploading(false);
                setStatus(ERROR)
            }
        })
    }, []);

    const validfile = json => {
        const parsed = JSON.parse(json);
        return !!parsed.accounts && !!parsed.name && parsed.name === WALLET_NAME;
    };

    const importWallet = e => {
        setIsUploading(true);
        const file = fileInput.current.files[0];

        if (!file.name.includes('.json')) {
            setIsUploading(false);
            return setStatus(ERROR);
        }
        const reader = new FileReader();

        reader.onload = async () => {
            const json = reader.result;
            if (validfile(json)) {
                return dispatch(importWalletAlias(json));
            }
            setIsUploading(false);
            return setStatus(ERROR);
        };

        reader.readAsText(file);
    };

    return (
        <Box className={classes.container}>
            <RotationLogo maxWidth={'320px'}/>
            {!status && <Typography className={classes.text}>
                Please select a wallet to import.
            </Typography>}
            {status === SUCCESS && <Typography className={classes.textSuccess}>
                Your wallet has been imported.
            </Typography>}
            {status === ERROR && <Typography className={classes.textError}>
                Something went wrong! Try again.
            </Typography>}
            {<form className={classes.form}>
                <input ref={fileInput} id={'import-input'} className={classes.input} type={'file'} accept={'.json'}
                       onChange={importWallet}/>
                {!isUploading ? <label htmlFor={'import-input'} className={classes.inputLabel}>
                        <BaseButton component={'span'} text={`import ${status === SUCCESS ? 'another' : ''} wallet`}
                                    fullWidth={false}/>
                    </label> : <CircularProgress variant={'indeterminate'} className={classes.loader} /> }
            </form>}

        </Box>
    )
};

export default Form;
