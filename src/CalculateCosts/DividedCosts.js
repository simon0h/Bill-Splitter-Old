import React, { useState } from "react";

const DividedCosts = (props) => {

	const fillPeople = () => {
		var invoice = {}
		for (var k in props.people) {
			invoice[props.people[k]["id"]] = [props.people[k]["name"], 0];
		}
		for (var i in props.itemEatenBy_All) {
			let itemID = props.itemEatenBy_All[i]["itemID"];
			let people = props.itemEatenBy_All[i]["peopleID"];
			let numPeople = people.length;
			let indvPrice = 0;
			for (var ii in props.items) {
				if (props.items[ii]["id"] === itemID) {
					indvPrice = props.items[ii]["price"] / numPeople;
				}
			}
			for (var iii in people) {
				invoice[people[iii]][1] += indvPrice;
			}
		}
		var invoiceArray = [];
		for (var j in invoice) {
			var owes = invoice[j][1];
			if (props.splitTaxEvenly) {
				owes += (props.totalTax / props.people.length);
			}
			else {
				owes += (props.totalTax * (invoice[j][1] / props.totalFoodCost));
			}
			if (props.splitTipEvenly) {
				owes += (props.totalTip / props.people.length);
			}
			else {
				owes += (props.totalTip * (invoice[j][1] / props.totalFoodCost));
			}
			invoiceArray.push({"id": invoice[j], "name": invoice[j][0], "owes": owes.toFixed(2)});
		}
		return invoiceArray;
	}

	const[thisPersonOwes, setThisPersonOwes] = useState(() => {
		const initialState = fillPeople();
		return initialState;
	});

	return (
		<div className = "App">
			{thisPersonOwes && thisPersonOwes.map((person) => (
				<li key = {person.id}>
	  				<div>{person.name} owes ${person.owes}</div>
  				</li>)
	      	)}
		</div>
	);
}

export default DividedCosts

// const Parent = (props) => {
// 	const onSplitTaxMethod = () => {
// 		if (props.splitTaxEvenly) {
// 			setSplitTaxButton("Split tax evenly");	
// 		}
// 		else {
// 			setSplitTaxButton("Don't split tax evenly");
// 		}
// 		props.setSplitTaxEvenly(!props.splitTaxEvenly);
// 	}

// 	return (
// 		<div className = "App">
// 			<div>Tax: ${totalTax} {showPercentage("tax")} <button onClick = {onSplitTaxMethod}>{splitTaxButton}</button> </div>
// 			<Child 
// 				totalTax = {totalTax}
// 				totalTip = {totalTip}
// 			/>
// 		</div>
// 	);
// }