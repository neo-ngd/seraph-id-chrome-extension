import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import useText from "../../commons/hooks/useText"

const useStyles = makeStyles(theme => ({
    container: {
        display: "flex",
        flexWrap: "wrap"
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
    }
}));

export default function OutlinedTextFields() {
    const classes = useStyles();
    var { text, handleChange } = useText()

    return (
        <form className={classes.container} noValidate autoComplete="off">
            <TextField
                id="outlined-name"
                label="Insert Password"
                className={classes.textField}
                onChange={handleChange()}
                value={text}

                margin="normal"
                variant="outlined"
            />
        </form>
    );
}
