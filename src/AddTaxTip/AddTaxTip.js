import React, { useState } from "react";
import './buttonColor.css';

const AddTaxTip = (props) => {
	const[tax, setTax] = useState(props.taxTip.tax);
	const[tip, setTip] = useState(props.taxTip.tip);

	const[taxButtonColor_Percent, setTaxButtonColor_Percent] = useState(props.inputTaxAsPercent);
	const[tipButtonColor_Percent, setTipButtonColor_Percent] = useState(props.inputTipAsPercent);

	const taxChangeHandler = (event) => {
		if (event.target.value < 0) {
			window.alert("Tax cannot be negative");
			setTax("");
		}
		else {
			setTax(Math.floor(event.target.value * 100) / 100); // Truncating past two decimal points
		}
	}

	const tipChangeHandler = (event) => {
		if (event.target.value < 0) {
			window.alert("Tip cannot be negative");
			setTip("");
		}
		else {
			setTip(Math.floor(event.target.value * 100) / 100); // Truncating past two decimal points
		}
	}

	const taxLabel = () => {
		if (taxButtonColor_Percent) {
			return (["%", ""]);
		}
		return (["", "$"]);
	}

	const tipLabel = () => {
		if (tipButtonColor_Percent) {
			return (["%", ""]);
		}
		return (["", "$"]);
	}

	const changeTaxInputType = () => {
		if (taxButtonColor_Percent) {
			setTaxButtonColor_Percent(false);
		}
		else {
			setTaxButtonColor_Percent(true);
		}
	}

	const changeTipInputType = () => {
		if (tipButtonColor_Percent) {
			setTipButtonColor_Percent(false);
		}
		else {
			setTipButtonColor_Percent(true);
		}
	}

	const changeTaxInputButton = () => {
		if (taxButtonColor_Percent) {
			return ("Change to amount");
		}
		return ("Change to percentage");
	}

	const changeTipInputButton = () => {
		if (tipButtonColor_Percent) {
			return ("Change to amount");
		}
		return ("Change to percentage");
	}

	const submitHandler = (event) => {
		event.preventDefault();
		props.setTaxTip({tax: tax, tip: tip});
		props.setInputTaxAsPercent(taxButtonColor_Percent);
		props.setInputTipAsPercent(tipButtonColor_Percent);
	}

 	return (
    	<div className = "AddTaxTip">
      		<div>Add a new item</div>
      		<form onSubmit = {submitHandler}>
	      		<div className = "AddItemInputField">
	      			<label>Tax: {taxLabel()[1]}</label>
	      			<input
	      				type = "number"
	      				min = "0"
	      				step = "0.01" 
	      				value = {tax}
	      				onChange = {taxChangeHandler}
	      			/>
	      			{taxLabel()[0]}
	      			<div>
						<button onClick = {changeTaxInputType}>{changeTaxInputButton()}</button>
					</div>
	    		</div>
	    		<div className = "AddItemInputField">
	      			<label>Tip: {tipLabel()[1]}</label>
	      			<input
	      				type = "number"
	      				min = "0"
	      				step = "0.01" 
	      				value = {tip}
	      				onChange = {tipChangeHandler}
	      			/>
	      			{tipLabel()[0]}
	      			<div>
	      				<button onClick = {changeTipInputType}>{changeTipInputButton()}</button>
	    			</div>
	      		</div>
	      		<div>
	      			<button type = "submit">Save tax and tip</button>
	      		</div>
      		</form>
    	</div>
  	);
}

export default AddTaxTip;