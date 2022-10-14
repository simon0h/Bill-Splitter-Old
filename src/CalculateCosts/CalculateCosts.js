import React , { useState } from "react";
import DividedCosts from "./DividedCosts";

const CalculateCosts = (props) => {

	const[refresh, setRefresh] = useState("");

	const[splitTaxButton, setSplitTaxButton] = useState(() => {
		if (props.splitTaxEvenly) {
			return ("Don't split tax evenly");
		}
		return ("Split tax evenly")
	});

	const[splitTipButton, setSplitTipButton] = useState(() => {
		if (props.splitTipEvenly) {
			return ("Don't split tip evenly");
		}
		return ("Split tip evenly")
	});

	const[totalTax, setTotalTax] = useState(() => {
		let tax = 0;
		if (props.inputTaxAsPercent) {
			tax = (Math.floor((props.totalFoodCost * (props.taxTip.tax / 100)) * 100) / 100);
		}
		else {
			tax = props.taxTip.tax;
		}
		return tax;
	});

	const[totalTip, setTotalTip] = useState(() => {
		let tip = 0;
		if (props.inputTipAsPercent) {
			tip = (Math.floor((props.totalFoodCost * (props.taxTip.tip / 100)) * 100) / 100);
		}
		else {
			tip = props.taxTip.tip;
		}
		return tip;
	})

	const showPercentage = (type) => {
		let percentage = "";
		if (type === "tax") {
			percentage = " (" + props.taxTip.tax + "% of the total price)";
		}
		else {
			percentage = " (" + props.taxTip.tip + "% of the total price)";
		}
		return percentage;
	}

	const onSplitTaxMethod = () => {
		if (props.splitTaxEvenly) {
			setSplitTaxButton("Split tax evenly");
			setRefresh(0);
		}
		else {
			setSplitTaxButton("Don't split tax evenly");
			setRefresh(1);
		}
		props.setSplitTaxEvenly(!props.splitTaxEvenly);
	}

	const onSplitTipMethod = () => {
		if (props.splitTipEvenly) {
			setSplitTipButton("Split tip evenly");
			setRefresh(2);
		}
		else {
			setSplitTipButton("Don't split tip evenly");
			setRefresh(3);
		}
		props.setSplitTipEvenly(!props.splitTipEvenly);
	}

	return (
		<div className = "App">
			<div>Tax: ${totalTax} {showPercentage("tax")} <button onClick = {onSplitTaxMethod}>{splitTaxButton}</button> </div>
			<div>Tip: ${totalTip} {showPercentage("tip")} <button onClick = {onSplitTipMethod}>{splitTipButton}</button> </div>
			<div>Cost of food: ${props.totalFoodCost}</div>
			<div>Subtotal: ${totalTax + totalTip + props.totalFoodCost}</div>
			<DividedCosts 
				key = {refresh}
				itemEatenBy_All = {props.itemEatenBy_All}
				items = {props.items}
				people = {props.people}
				totalTax = {totalTax}
				totalTip = {totalTip}
				totalFoodCost = {props.totalFoodCost}
				splitTaxEvenly = {props.splitTaxEvenly} 
				splitTipEvenly = {props.splitTipEvenly}
			/>
		</div>
	);
}

export default CalculateCosts;