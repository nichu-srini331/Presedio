import React, { useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import './Profile.css'; // Ensure to import the CSS file
import { useNavigate } from 'react-router-dom';

const ProfileDropdown = () => {
  const [dropdownActive, setDropdownActive] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setDropdownActive(true);
  };

  const handleMouseLeave = () => {
    setDropdownActive(false);
  };

  const logout = () => {
    navigate("/login");

  }

  return (
    <div className="profile-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <CgProfile className="profile" />
      <div className={`dropdown-menu ${dropdownActive ? 'active' : ''}`}>
        <div className="dropdown-menu-item">My Property</div>
        <div className="dropdown-menu-item">Enquired Property</div>
        <div className="dropdown-menu-item">Liked Property</div>
        <div className="dropdown-menu-item"><button onClick={logout}>Logout</button></div>
      </div>
    </div>
  );
};

export default ProfileDropdown;
