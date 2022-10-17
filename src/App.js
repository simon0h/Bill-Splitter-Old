import React, { useState } from "react";
import AddTaxTip from "./AddTaxTip/AddTaxTip"
import AddItem from "./AddItem/AddItem";
import AllItems from "./AddItem/AllItems";
import AddPerson from "./AddPerson/AddPerson";
import AllPeople from "./AddPerson/AllPeople";
import MatchPersonFood from "./MatchPersonFood/MatchPersonFood"
import CalculateCosts from "./CalculateCosts/CalculateCosts"
import './App.css';

const App = () => {
	const[screen, setScreen] = useState(0);

	const[inputTipAsPercent, setInputTipAsPercent] = useState(true);
	const[inputTaxAsPercent, setInputTaxAsPercent] = useState(true);
	const[taxTip, setTaxTip] = useState({tax: 0, tip: 0});

	const[totalFoodCost, setTotalCost] = useState(0);

	const[items, setItems] = useState(""); // Change to a dict
	const[people, setPerson] = useState(""); // Change to a dict

	const[numItems, setNumItems] = useState(0);
	const[numPeople, setNumPeople] = useState(0);

	const[itemID, setItemID] = useState(1);
	const[personID, setPersonID] = useState(1);

	const[itemEatenBy_All, setItemEatenBy_All] = useState("");

	const[splitTipEvenly, setSplitTipEvenly] = useState(true);
	const[splitTaxEvenly, setSplitTaxEvenly] = useState(true);

	const addNewItem = (newItem) => {
		setTotalCost(totalFoodCost + newItem.price);
		setNumItems(numItems + 1);
		if (numItems > 20) {
			setNumItems(20);
			window.alert("Number of people cannot exceed 20");
		}
		else {
			setItems((prevItems) => {
				return [newItem, ...prevItems];
			});
			setItemEatenBy_All(itemEatenBy_All => [...itemEatenBy_All, {itemID: newItem.id, peopleID: []}]);
		}
	}

	const editItem = (id, newName, newPrice) => {
		editNamePrice(id, newName, newPrice); // Optimization: if statement to check which one changed
	}

	const editNamePrice = (id, newName, newPrice) => {
		const newList = items.map((item) => {
	      if (item.id === id) {
	        const updatedItem = {
	          ...item,
	          name: newName,
	          price: newPrice,
	        };
	        return updatedItem;
	      }
	      return item;
	    });
	    setItems(newList);
	}

	const removeItem = (id, price) => {
		setTotalCost(totalFoodCost - price);
		setNumItems(numItems - 1);
		const newList = items.filter((item) => item.id !== id);
    	setItems(newList);
	}

	const addNewPerson = (newPerson) => {
		setNumPeople(numPeople + 1);
		if (numPeople > 50) {
			setNumPeople(50);
			window.alert("Number of items cannot exceed 50");
		}
		else {
			setPerson((prevPeople) => {
				return [newPerson, ...prevPeople];
			});
		}
	}

	const editPerson = (id, newName) => {
		editPersonName(id, newName); // Optimization: if statement to check which one changed
	}

	const editPersonName = (id, newName) => {
		const newList = people.map((person) => {
	      if (person.id === id) {
	        const updatedPeople = {
	          ...person,
	          name: newName,
	        };

	        return updatedPeople;
	      }

	      return person;
	    });
	    setPerson(newList);
	}

	const removePerson = (id) => {
		setNumPeople(numPeople - 1);
		const newList = people.filter((person) => person.id !== id);
    	setPerson(newList);
	}

	const matchItemEatenBy_All = (itemID, thisItemEatenBy) => {
		const newItemEatenBy_All = itemEatenBy_All.map((obj) => {
			if (obj.itemID === itemID) {
				return {itemID: itemID, peopleID: thisItemEatenBy};
			}
			else {
				return obj;
			}
		});
		setItemEatenBy_All(newItemEatenBy_All);
	}

	const prevScreen = () => {
		setScreen(screen - 1);
	}

	const nextScreen = () => {
		setScreen(screen + 1);
	}

	if (screen === 1) {
		return (
	    	<div className="App">
	    		<div className = "p1">1. Enter items  2. Enter people  3. Pick who ate what</div>
    			<AddPerson onAddPerson = {addNewPerson} personID = {personID} setPersonID = {setPersonID}/>
    			<AllPeople people = {people} editPerson = {editPerson} removePerson = {removePerson}/>
	    		<button type = "submit" onClick = {prevScreen}>Back</button>
	    		<button type = "submit" onClick = {nextScreen}>Next</button>
	    	</div>
	  	);
	}

	else if (screen === 2) {
		return (
	    	<div className="App">
	    		<div className = "p1">1. Enter items  2. Enter people  3. Pick who ate what</div>
    			<MatchPersonFood items = {items} people = {people} itemEatenBy_All = {itemEatenBy_All} matchItemEatenBy_All = {matchItemEatenBy_All}/>
	    		<button type = "submit" onClick = {prevScreen}>Back</button>
	    		<button type = "submit" onClick = {nextScreen}>Next</button>
	    	</div>
	  	);
	}

	else if (screen === 3) {
		return (
	    	<div className="App">
	    		<div className = "p1">1. Enter items  2. Enter people  3. Pick who ate what</div>
    			<CalculateCosts 
    				items = {items} 
					people = {people} 
					itemEatenBy_All = {itemEatenBy_All} 
					taxTip = {taxTip} 
					inputTaxAsPercent = {inputTaxAsPercent} 
					inputTipAsPercent = {inputTipAsPercent} 
					totalFoodCost = {totalFoodCost}
					splitTaxEvenly = {splitTaxEvenly}
					splitTipEvenly = {splitTipEvenly}
					setSplitTaxEvenly = {setSplitTaxEvenly}
					setSplitTipEvenly = {setSplitTipEvenly}
    			/>
	    		<button type = "submit" onClick = {prevScreen}>Back</button>
	    	</div>
	  	);
	}

	return (
    	<div className="App">
    		<div className = "p1">1. Enter items  2. Enter people  3. Pick who ate what</div>
    		<AddTaxTip taxTip = {taxTip} inputTaxAsPercent = {inputTaxAsPercent} inputTipAsPercent = {inputTipAsPercent} setInputTaxAsPercent = {setInputTaxAsPercent} setInputTipAsPercent = {setInputTipAsPercent} setTaxTip = {setTaxTip}/>
    		<AddItem onAddItem = {addNewItem} itemID = {itemID} setItemID = {setItemID}/> {/*Suggest new items based on what was entered, e.g suggest ramen if that was already types*/}
    		<AllItems items = {items} editItem = {editItem} removeItem = {removeItem}/>
    		<button type = "submit" onClick = {nextScreen}>Next</button>
    	</div>
  	);
}

export default App;
