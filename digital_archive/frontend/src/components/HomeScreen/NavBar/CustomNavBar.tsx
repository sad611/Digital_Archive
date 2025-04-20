import { Logout, Menu } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Cookies from "js-cookie";
import React from "react";
import { Button, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface NavBarProps {
  show: boolean;
  onShow: (value: boolean) => void;
}

const CustomNavBar: React.FC<NavBarProps> = ({ show, onShow }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/login");
  };

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
      <Navbar.Collapse className="justify-content-end mx-4">
        <Navbar.Text>
          <Button
            variant="outline-danger"
            size="sm"
            className="d-flex align-items-center gap-2 px-3 rounded-pill shadow-sm"
            onClick={handleLogout}
          >
            <Logout />
            Logout
          </Button>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavBar;
