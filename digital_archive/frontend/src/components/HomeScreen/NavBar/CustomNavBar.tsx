import { Menu } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import { Navbar } from "react-bootstrap";

interface NavBarProps {
  show: boolean;
  onShow: (value: boolean) => void;
}

const CustomNavBar: React.FC<NavBarProps> = ({ show, onShow }) => {
  return (
    <Navbar
      className="rounded w-100 bg-darker"
      data-bs-theme="dark"
      style={{ minHeight: "8vh" }}
    >
      <Navbar.Brand>
        {!show && (
          <div className="px-3">
            <IconButton onClick={() => onShow(true)}>
              <Menu />
            </IconButton>
          </div>
        )}
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavBar;
