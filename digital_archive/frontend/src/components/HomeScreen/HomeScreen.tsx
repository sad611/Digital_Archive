/* eslint-disable react/jsx-no-undef */
import { useState } from "react";
import SideBar from "./SideBar/SideBar";
import HomeScreenContent from "./HomeScreenContent/HomeScreenContent";
const HomeScreen: React.FC = () => {
  const [show, setShow] = useState(true);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <SideBar
        show={show}
        onHide={() => setShow(true)}
        onToggle={() => setShow(!show)}
      />

      <div
        style={{
          marginLeft: show ? "200px" : "0",
          transition: "margin-left 0.3s ease-in-out",
        }}
      >
        <HomeScreenContent show={show} onShow={() => setShow(true)} /> 
      </div>
    </div>
  );
};

export default HomeScreen;
