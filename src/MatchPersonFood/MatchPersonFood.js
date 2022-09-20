import React, { useState } from "react";
import ChooseWhoAte from "./ChooseWhoAte";

const MatchPersonFood = (props) => {
	return (
		<ul className = "AllItems">
	    	{props.items && props.items.map((item) => (
				<li key = {item.id}>
	  				<div>{item.name}</div>
	  				<div>{item.price}</div>
	  				<ChooseWhoAte people = {props.people}/>
  				</li>)
	      	)}
	    </ul>
    );
}

export default MatchPersonFood;