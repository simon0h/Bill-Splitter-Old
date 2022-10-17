import React, { useState } from "react";

const DividedCosts = (props) => {

	const[showMoreDetail, setShowMoreDetail] = useState(false);

	const fillPeople = () => {
		var invoice = {}
		for (var k in props.people) {
			invoice[props.people[k]["id"]] = [props.people[k]["name"], 0];
		}
		for (var i in props.itemEatenBy_All) {
			let itemID = props.itemEatenBy_All[i]["itemID"];
			let peopleArr = props.itemEatenBy_All[i]["peopleID"];
			let numPeople = peopleArr.length;
			let indvPrice = 0;
			for (var ii in props.items) {
				if (props.items[ii]["id"] === itemID) {
					indvPrice = props.items[ii]["price"] / numPeople;
				}
			}
			for (var iii in peopleArr) {
				invoice[peopleArr[iii]][1] += indvPrice;
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
	
	const getDetail = () => {
		let invoice = {};
		let itemObj = {};
		for (var i in props.people) {
			invoice[props.people[i]["id"]] = [props.people[i]["name"]];
		}
		for (var k in props.items) {
			itemObj[props.items[k]["id"]] = props.items[k]["name"];
		}
		for (var j in props.itemEatenBy_All) {
			let itemID = props.itemEatenBy_All[j]["itemID"];
			let peopleArr = props.itemEatenBy_All[j]["peopleID"];
			for (var ii in peopleArr) {
				invoice[peopleArr[ii]].push(itemObj[itemID]);
			}
		}
		var invoiceArray = [];
		for (var l in invoice) {
			invoiceArray.push({"id": l, "name": invoice[l][0], "items": invoice[l].slice(1, invoice[l].length)});
		}
		return (invoiceArray);
	}

	const[thisPersonOwesDetail, setThisPersonOwesDetail] = useState(() => {
		const initialState = getDetail();
		return initialState;
	});

	const showMore = () => {
		setShowMoreDetail(!showMoreDetail);
	}

	if (!showMoreDetail) {
		return (
			<div className = "App">
				{thisPersonOwes && thisPersonOwes.map((person) => (
					<li key = {person.id}>
		  				<div>{person.name} owes ${person.owes}</div>
	  				</li>)
		      	)}
		      	<button onClick = {showMore}>Show detail</button>
			</div>
		);
	}
	else {
		return (
			<div className = "App">
				{thisPersonOwes && thisPersonOwes.map((person) => (
					<li key = {person.id}>
		  				<div>{person.name} owes ${person.owes}</div>
	  				</li>)
		      	)}
				{thisPersonOwesDetail && thisPersonOwesDetail.map((person) => (
					<div key = {person.id}>
		  				<div>{person.name} ate:</div>
		  				<div> {person.items && person.items.map((item) => (
								<li key = {person.id + person.name + item}>
					  				<div>{item}</div>
				  				</li>)
					      	)}
		  				</div>
	  				</div>)
		      	)}
		      	<button onClick = {showMore}>Hide detail</button>
			</div>
		);
	}
}

export default DividedCosts
