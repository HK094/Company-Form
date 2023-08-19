import React from "react";
import "./CompanyTable.css";
const CompanyTable = ({ companyData, onBackToForm }) => {
  return (
    <div>
      <h2>Company Data Table</h2>
      <table>
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Company Type</th>
            <th>GST Number</th>
            <th>PAN Number</th>
            <th>Selected Services</th>
          </tr>
        </thead>
        <tbody>
          {companyData.map((data, index) => (
            <tr key={index}>
              <td>{data.companyName}</td>
              <td>{data.companyType}</td>
              <td>{data.gstNumber}</td>
              <td>{data.panNumber}</td>
              <td>{data.selectedServices.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={onBackToForm}>Back to Form</button>
    </div>
  );
};

export default CompanyTable;
