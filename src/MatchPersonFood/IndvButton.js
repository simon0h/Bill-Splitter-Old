import React, { useState } from "react";
import './buttonColor.css';

const IndvButton = (props) => {
	const[buttonColor, setButtonColor] = useState("notSelected");
	const[selectionState, setSelectionState] = useState("false");

	const onPersonSelection = (event) => {
		if (selectionState) {
			setButtonColor("selected");
		}
		else {
			setButtonColor("notSelected");
		}
		setSelectionState(!selectionState);
	}

	return (
		<div className = {buttonColor}>
	  		<button onClick = {onPersonSelection}>{props.name}</button>
	    </div>
    );
}

export default IndvButton;