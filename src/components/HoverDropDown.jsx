import React from "react";

const HoverDropdown = () => {
  const styles = {
    dropdown: {
      position: "relative",
      display: "inline-block",
      cursor: "pointer",
    },
    trigger: {
      color: "blue",
      textDecoration: "underline",
    },
    dropdownContent: {
      display: "none",
      position: "absolute",
      backgroundColor: "#fff",
      minWidth: "160px",
      boxShadow: "0px 8px 16px rgba(0,0,0,0.2)",
      zIndex: 1,
      borderRadius: "4px",
      marginTop: "8px",
    },
    link: {
      color: "#000",
      padding: "10px 14px",
      textDecoration: "none",
      display: "block",
    },
  };

  return (
    <div
      style={styles.dropdown}
      onMouseEnter={(e) => {
        e.currentTarget.querySelector(".dropdown-content").style.display = "block";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.querySelector(".dropdown-content").style.display = "none";
      }}
    >
      <span style={styles.trigger}>Go to Page</span>
      <div className="dropdown-content" style={styles.dropdownContent}>
        <a href="/option1" style={styles.link}>Option 1</a>
        <a href="/option2" style={styles.link}>Option 2</a>
        <a href="/option3" style={styles.link}>Option 3</a>
      </div>
    </div>
  );
};

export default HoverDropdown;
