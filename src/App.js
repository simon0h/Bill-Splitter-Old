import React, { useState } from "react";
import AllItems from "./AddItem/AllItems";
import AddItem from "./AddItem/AddItem";
import AllPeople from "./AddPerson/AllPeople";
import AddPerson from "./AddPerson/AddPerson";
import MatchPersonFood from "./MatchPersonFood/MatchPersonFood"
import './App.css';

const App = () => {
	const[screen, setScreen] = useState(0);

	const[items, setItems] = useState("");
	const[people, setPerson] = useState("");

	const [itemID, setItemID] = useState(1);
	const [personID, setPersonID] = useState(1);

	const addNewItem = (newItem) => {
		setItems((prevItems) => {
			return [newItem, ...prevItems];
		});
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

	const removeItem = (id) => {
		const newList = items.filter((item) => item.id !== id);
    	setItems(newList);
	}

	const addNewPerson = (newPerson) => {
		setPerson((prevPeople) => {
			return [newPerson, ...prevPeople];
		});
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
		const newList = people.filter((person) => person.id !== id);
    	setPerson(newList);
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
    			<MatchPersonFood items = {items} people = {people}/>
	    		<button type = "submit" onClick = {prevScreen}>Back</button>
	    		<button type = "submit" onClick = {nextScreen}>Next</button>
	    	</div>
	  	);
	}

	return (
    	<div className="App">
    		<div className = "p1">1. Enter items  2. Enter people  3. Pick who ate what</div>
    		<AddItem onAddItem = {addNewItem} itemID = {itemID} setItemID = {setItemID}/>
    		<AllItems items = {items} editItem = {editItem} removeItem = {removeItem}/>
    		<button type = "submit" onClick = {nextScreen}>Next</button>
    	</div>
  	);
}

export default App;
