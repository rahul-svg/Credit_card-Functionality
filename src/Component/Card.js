import React, { useState, useRef, Fragment } from "react";
import { nanoid } from "nanoid";
import Readrow from "./Readrow";
import data from "./mockdata.json";
import "./card.css";

function Card() {
  const inputref = useRef();

  const [customers, setCustomers] = useState(data);
  const [addFormData, setAddFormData] = useState({
    cr1: "",
    CanvasRenderingContext2D: "",
    cr3: "",
    cr4: "",
    fullName: "",
    cvv: "",
  });

  // Card Number Slider Functions
  const move = (e, prev, curr, next) => {
    const maxlength = inputref.current.getAttribute("maxLength");
    const length = document.getElementById(curr).value.length;

    if (length == maxlength) {
      if (next !== "") {
        document.getElementById(next).focus();
      }
    }

    if (e.key === "Backspace" || e.key === "Delete") {
      if (length <= 0) {
        if (prev !== "") {
          document.getElementById(prev).focus();
        }
      }
    }
  };

  // Add New cardData Functions
  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();
    const newCard = {
      id: nanoid(),
      cr1: addFormData.cr1,
      cr2: addFormData.cr2,
      cr3: addFormData.cr3,
      cr4: addFormData.cr4,
      fullName: addFormData.fullName,
      cvv: addFormData.cvv,
    };

    const newCards = [...customers, newCard];

    setCustomers(newCards);
  };

  // Delete Card Data function

  const handleDeleteClick = (customerId) => {
    const newCustomers = [...customers];

    const index = customers.findIndex((customer) => customer.id === customerId);

    newCustomers.splice(index, 1);

    setCustomers(newCustomers);
  };

  return (
    <div className="container">
      <div className="row">
        <label className="task">Task</label>
        <div className="col">
          <form className="form" onSubmit={handleAddFormSubmit}>
            <div className="cardnum">
              <label>Card Number*</label>

              <input
                type="text"
                name="cr1"
                id="box-1"
                className="box"
                pattern="\d*"
                maxLength={4}
                ref={inputref}
                onKeyUp={(event) => move(event, "", "box-1", "box-2")}
                onChange={handleAddFormChange}
              />
              <input
                type="text"
                name="cr2"
                id="box-2"
                className="box"
                pattern="\d*"
                maxLength={4}
                ref={inputref}
                onKeyUp={(event) => move(event, "box-1", "box-2", "box-3")}
                onChange={handleAddFormChange}
              />
              <input
                type="text"
                name="cr3"
                id="box-3"
                className="box"
                pattern="\d*"
                maxLength={4}
                ref={inputref}
                onKeyUp={(event) => move(event, "box-2", "box-3", "box-4")}
                onChange={handleAddFormChange}
              />
              <input
                type="text"
                name="cr4"
                id="box-4"
                className="box"
                pattern="\d*"
                maxLength={4}
                ref={inputref}
                onKeyUp={(event) => move(event, "box-3", "box-4", "")}
                onChange={handleAddFormChange}
              />
            </div>

            <div>
                <label>Name</label>

                <input
                  type="text"
                  name="fullName"
                  className="namebox"
                  placeholder="Enter your Name"
                  id="cardname"
                  onChange={handleAddFormChange}
                />
              </div>


            <div className="cvo">
              <label>CVV</label>
              <input
                type="text"
                name="cvv"
                className="box"
                placeholder="CVV"
                id="cdigit"
                maxLength={3}
                onChange={handleAddFormChange}
              />
              
            </div>

            
            <div className="submit">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
        <div className="display">
          <form>
            <table class="content-table">
              <thead>
                <tr>
                  <th>Card Number</th>
                  <th>Name</th>
                  <th>CVV</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <Fragment>
                    <Readrow
                      customer={customer}
                      handleDeleteClick={handleDeleteClick}
                    />
                  </Fragment>
                ))}
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Card;
