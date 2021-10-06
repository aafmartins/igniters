import React from "react";
import MySavedOrganizations from "../components/MySavedOrganizations";
import MyCreatedOrganizations from "../components/MyCreatedOrganizations";
import { useState } from "react";
import '../styles/MyOrganizationsButtons.css'

export default function MyOrganizationsPage() {
  const [savedClicked, setSavedClicked] = useState(true);
  const [createdClicked, setCreatedClicked] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setSavedClicked(!savedClicked);
    setCreatedClicked(!createdClicked);
  };

  return (
    <div>
      {savedClicked ? (
        <div >
          <div className="changeBetweenMyOrgsContainer">
            <button className="button-52 changeBetweenMyOrgsButtons" disabled>My Saved Organizations</button>
          <button className="button-52 changeBetweenMyOrgsButtons" onClick={handleClick}>My Created Organizations</button>
          </div>
          <MySavedOrganizations />
        </div>
      ) : (
        <div >
     <div className="changeBetweenMyOrgsContainer">
            <button className="button-52 changeBetweenMyOrgsButtons" onClick={handleClick}>My Saved Organizations</button>
          <button className="button-52 changeBetweenMyOrgsButtons" disabled>My Created Organizations</button>
     </div>
          <MyCreatedOrganizations />
        </div>
      )}
    </div>
  );
}
