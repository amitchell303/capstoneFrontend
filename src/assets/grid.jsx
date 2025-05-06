import React from "react";
import "../App.css";

export const GridBackground = () => {
  return (
    <div className="grid-background">
      <section className="grid">
        {Array.from({ length: 500 }).map((_, idx) => (
          <span key={idx} className="square"></span>
        ))}
      </section>
    </div>
  );
};
