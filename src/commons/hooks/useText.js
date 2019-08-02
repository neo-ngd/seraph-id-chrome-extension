import { useState } from "react"

export default function useText() {

    const [text, setText] = useState("");

    const handleChange = name => event => {
        setText(event.target.value);
    };

    return { text, handleChange }
}




