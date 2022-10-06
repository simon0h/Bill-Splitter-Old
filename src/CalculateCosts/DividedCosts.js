import React, { useState } from "react";

const DividedCosts = (props) => {

	const [thisPersonOwesArray, setThisPersonOwesArray] = useState();

	const fillPeople = () => {
		// const invoice = props.people.map((obj) => {
		// 	return {personID: obj.id, name: obj.name, owes: 0};
		// });
		var invoice = {}
		for (var k in props.people) {
			invoice[props.people[k]["id"]] = [props.people[k]["name"], 0];
		}
		for (var i in props.itemEatenBy_All) {
			let itemID = props.itemEatenBy_All[i]["itemID"];
			let people = props.itemEatenBy_All[i]["peopleID"];
			let numPeople = people.length;
			let indvPrice = 0;
			for (var j in props.items) {
				if (props.items[j]["id"] === itemID) {
					indvPrice = props.items[j]["price"] / numPeople;
				}
			}
			for (var j in people) {
				invoice[people[j]][1] += indvPrice;
			}
		}
		var invoiceArray = [];
		for (var i in invoice) {
			invoiceArray.push({"id": invoice[i], "name": invoice[i][0], "owes": invoice[i][1]});
		}
		setThisPersonOwesArray(invoiceArray);
		return(invoice);
	}

	const[thisPersonOwes, setThisPersonOwes] = useState(() => {
		const initialState = fillPeople();
		return initialState;
	});

	return (
		<div className = "App">
			{thisPersonOwesArray && thisPersonOwesArray.map((person) => (
				<li key = {person.id}>
	  				<div>{person.name} owes ${person.owes}</div>
  				</li>)
	      	)}
		</div>
	);
}

export default DividedCosts