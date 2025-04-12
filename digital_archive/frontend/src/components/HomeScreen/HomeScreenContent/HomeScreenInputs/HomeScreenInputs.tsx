import React, { useState } from "react";
import {
  InputGroup,
  SplitButton,
  Dropdown,
  FormControl,
} from "react-bootstrap";

const HomeScreenInputs: React.FC = () => {
  const [selectedTitle, setSelectedTitle] = useState("Action");

  const dropdownOptions = [
    "Action 1",
    "Another action",
    "Something else",
    "---", // divider
    "Separated link",
  ];


  return (
    <InputGroup className="mb-3 " style={{maxWidth: "300px"}}>
      <InputGroup.Text
        className="bg-darker text-white border-1 rounded"
        id="basic-addon1"
      >
        @
      </InputGroup.Text>
      <SplitButton
        variant="outline-secondary"
        title={selectedTitle}
        id="segmented-button-dropdown-1"
      >
        {dropdownOptions.map((option, index) =>
          option === "---" ? (
            <Dropdown.Divider key={index} />
          ) : (
            <Dropdown.Item
              key={index}
              eventKey={option}
              onClick={() => setSelectedTitle(option)}
            >
              {option}
            </Dropdown.Item>
          )
        )}
      </SplitButton>
      <FormControl
        className="bg-darker text-white"
        placeholder="Username"
        aria-label="Username"
        aria-describedby="basic-addon1"
      />
    </InputGroup>
  );
};

export default HomeScreenInputs;
