import React from "react";
import MySavedOrganizations from "../components/MySavedOrganizations";
import MyCreatedOrganizations from "../components/MyCreatedOrganizations";
import { useState } from "react";

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
        <div>
          <button disabled>My Saved Organizations</button>
          <button onClick={handleClick}>My Created Organizations</button>
          <MySavedOrganizations />
        </div>
      ) : (
        <div>
          <button onClick={handleClick}>My Saved Organizations</button>
          <button disabled>My Created Organizations</button>
          <MyCreatedOrganizations />
        </div>
      )}
    </div>
  );
}
