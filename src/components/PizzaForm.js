import React from "react";

function PizzaForm({ pizza, onChangeForm, onEditPizza }) {
  function handleInputChange(event) {
    onChangeForm(event.target.name, event.target.value);
  }

  function handleRadioChange(event) {
    onChangeForm(event.target.name, event.target.value === "Vegetarian");
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(pizza);
    fetch(`http://localhost:3001/pizzas/${pizza.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pizza),
    })
      .then(r => r.json())
      .then(onEditPizza);
  }

  if (!pizza) return null;

  const { topping, size, vegetarian } = pizza;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="col-5">
          <input
            className="form-control"
            type="text"
            name="topping"
            placeholder="Pizza Topping"
            value={topping}
            onChange={handleInputChange}
          />
        </div>
        <div className="col">
          <select 
            onChange={handleInputChange}
            value={size} 
            className="form-control" 
            name="size"
          >
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="vegetarian"
              value="Vegetarian"
              checked={vegetarian}
              onChange={handleRadioChange}
            />
            <label className="form-check-label">Vegetarian</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="vegetarian"
              value="Not Vegetarian"
              checked={!vegetarian}
              onChange={handleRadioChange}
            />
            <label className="form-check-label">Not Vegetarian</label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default PizzaForm;
