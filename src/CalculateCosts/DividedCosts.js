import React, { useState } from "react";

const DividedCosts = (props) => {

	const[showMoreDetail, setShowMoreDetail] = useState(false);

	const fillPeople = () => {
		let invoice = {}
		for (let i in props.people) {
			invoice[props.people[i]["id"]] = [props.people[i]["name"], 0];
		}
		for (let i in props.itemEatenBy_All) {
			let itemID = props.itemEatenBy_All[i]["itemID"];
			let peopleArr = props.itemEatenBy_All[i]["peopleID"];
			let numPeople = peopleArr.length;
			let indvPrice = 0;
			for (let ii in props.items) {
				if (props.items[ii]["id"] === itemID) {
					indvPrice = props.items[ii]["price"] / numPeople;
				}
			}
			for (let ii in peopleArr) {
				invoice[peopleArr[ii]][1] += indvPrice;
			}
		}
		let invoiceArray = [];
		for (let i in invoice) {
			let owes = invoice[i][1];
			if (props.splitTaxEvenly) {
				owes += (props.totalTax / props.people.length);
			}
			else {
				owes += (props.totalTax * (invoice[i][1] / props.totalFoodCost));
			}
			if (props.splitTipEvenly) {
				owes += (props.totalTip / props.people.length);
			}
			else {
				owes += (props.totalTip * (invoice[i][1] / props.totalFoodCost));
			}
			invoiceArray.push({"id": invoice[i], "name": invoice[i][0], "owes": owes.toFixed(2)});
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
		for (let i in props.people) {
			invoice[props.people[i]["id"]] = [props.people[i]["name"]];
		}
		for (let i in props.items) {
			itemObj[props.items[i]["id"]] = props.items[i]["name"];
		}
		for (let i in props.itemEatenBy_All) {
			let itemID = props.itemEatenBy_All[i]["itemID"];
			let peopleArr = props.itemEatenBy_All[i]["peopleID"];
			for (let ii in peopleArr) {
				invoice[peopleArr[ii]].push(itemObj[itemID]);
			}
		}
		let invoiceArray = [];
		for (let i in invoice) {
			invoiceArray.push({"id": i, "name": invoice[i][0], "items": invoice[i].slice(1, invoice[i].length)});
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
