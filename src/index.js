import React from 'react';
import ReactDom from 'react-dom';
import { createStore } from 'redux';

// Reducer
const counter = (state = 0, action) => {
	switch (action.type) {
		case 'INCREMENT':
			return state + 1;
		case 'DECREMENT':
			return state - 1;
		default:
			return state;
	}
}

// Create the store
const store = createStore(counter);

// Create the React 'Counter' component
// Note the button 'onClick' attributes. They are calling the
// methods that are being passed into this component. Later in the
// render function, we are passing in the actual functions, in
// this case, they are Redux dispatch methods, but they don't have
// to be. Doing this decouples the React functionality from Redux.
// We could in theory replace redux with some other update functionality
const Counter = ({
	value,
	onIncrement,
	onDecrement
}) => (
	<div>
		<h1>{value}</h1>
		<button onClick={onIncrement}>+</button>
		<button onClick={onDecrement}>-</button>
	</div>
);

// Define our render function
const render = () => {
	ReactDom.render(
		<Counter
			value={store.getState()}
			onIncrement={() =>
				store.dispatch({
					type: 'INCREMENT'
				})
			}
			onDecrement={() =>
				store.dispatch({
					type: 'DECREMENT'
				})
			}
		/>,
		document.getElementById('app')
	);
};

// Listen to the store for changes and fire render on change
store.subscribe(render);

// Initial render on page load
render();

