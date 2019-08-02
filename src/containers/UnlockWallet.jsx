import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

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
    const [values, setValues] = React.useState("");
    console.log(values);

    const handleChange = name => event => {
        setValues(event.target.value);
    };

    return (
        <form className={classes.container} noValidate autoComplete="off">
            <TextField
                id="outlined-name"
                label="Insert Password"
                className={classes.textField}
                value={values}
                onChange={handleChange()}
                margin="normal"
                variant="outlined"
            />
        </form>
    );
}
