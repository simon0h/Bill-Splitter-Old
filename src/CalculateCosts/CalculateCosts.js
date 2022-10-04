import React, { useState } from "react";
import DividedCosts from "./DividedCosts";

const CalculateCosts = (props) => {

	const calculateTax = () => {
		let tax = 0;
		if (props.inputTaxAsPercent) {
			tax = (Math.floor((props.totalFoodCost * (props.taxTip.tax / 100)) * 100) / 100);
			tax += " (" + props.taxTip.tax + "%)";
		}
		else {
			tax = props.taxTip.tax;
		}
		return tax;
	}

	const calculateTip = () => {
		let tip = 0;
		if (props.inputTipAsPercent) {
			tip = (Math.floor((props.totalFoodCost * (props.taxTip.tip / 100)) * 100) / 100);
			tip += " (" + props.taxTip.tip + "%)";
		}
		else {
			tip = props.taxTip.tip;
		}
		return tip;
	}

	return (
		<div className = "App">
			<div>Tax: ${calculateTax()}</div>
			<div>Tip: ${calculateTip()}</div>
			<div>Cost of food: ${props.totalFoodCost}</div>
			<div>Subtotal: ${calculateTax() + calculateTip() + props.totalFoodCost}</div>
			<DividedCosts itemEatenBy_All = {props.itemEatenBy_All} items = {props.items} people = {props.people}/>
		</div>
	);
}

export default CalculateCosts;