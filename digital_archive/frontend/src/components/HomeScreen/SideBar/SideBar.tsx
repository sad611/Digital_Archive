import { Menu } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import { Offcanvas } from "react-bootstrap";
import styles from "./SideBar.module.css";

interface SideBarProps {
  show: boolean;
  onHide: () => void;
  onToggle: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ show, onHide, onToggle }) => {
  return (
    <> 
      <Offcanvas bg="dark" data-bs-theme="dark"
        show={show}
        onHide={onHide}
        backdrop={false}
        scroll={true}
        placement="start"
        className="bg-darker"

        style={{
          width: "200px",
          borderRadius: "10px",
        }}
      >
        <Offcanvas.Header>
          <Offcanvas.Title>Side Menu</Offcanvas.Title>
          {show && (
            <div className="ms-auto">
              <IconButton
                className={styles.navToggleButton}
                onClick={onToggle}
              >
                <Menu />
              </IconButton>
            </div>
          )}
        </Offcanvas.Header>
        <Offcanvas.Body>
          <p>Navigation Links</p>
          <p>Settings</p>
          <p>Other Options</p>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
export default SideBar;
