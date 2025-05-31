import React from "react";

export default function MaintSumm() {
  return (
    <div className="glassmorphism-container">
      <main className="summary-container">
        <section className="summ-div1">
          <div className="summ-header-group">
            <h1>Engine</h1>
            <span class="material-symbols-outlined">download</span>
          </div>
          <div className="summ-heading-divider"></div>
        </section>
        <section className="summ-div2">
          <div className="summ-divider"></div>
          <div className="summ-group">
            <div className="summ-group-item">
              <small>Date</small>
              <p>XX/XX/XX</p>
            </div>
            <div className="summ-group-item">
              <small>Mileage</small>
              <p>XXXXXX</p>
            </div>
          </div>
        </section>
        <section className="summ-div3">
          <div className="summ-divider"></div>
          <div className="summ-group">
            <div className="summ-group-item">
              <small>Cost</small>
              <p>$XXX.XX</p>
            </div>
            <div className="summ-group-item">
              <small>Serviced By</small>
              <p>XXXX XXXX</p>
            </div>
          </div>
        </section>
        <section className="summ-div4">
          <label>Summary</label>
          <div className="summ-details">
            <p>
              {" "}
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
