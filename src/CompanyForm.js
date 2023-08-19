import React, { Component } from "react";
import Select from "react-select";
import "./CompanyForm.css";
const services = [
  { value: 'Web devlopment', label: 'Web devlopment' },
  { value: 'App devlopment', label: 'App devlopment' },
  { value: 'Android devlopment', label: 'Android devlopment' },
  { value: ''}
];

class CompanyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyName: "",
      companyType: "",
      gstNumber: "",
      panNumber: "",
      selectedServices: [],
      otherService: "",
      errors: {},
    };

    this.companyTypes = ["Partnership", "Private", "Public"];
    this.otherServices = ["Digital Marketing", "Sales"];
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleCompanyTypeChange = (selectedOption) => {
    this.setState({ companyType: selectedOption.value });
  };

  handleServiceChange = (selectedOptions) => {
    const selectedServices = selectedOptions.map((option) => option.value);
    this.setState({ selectedServices });
  };

  handleOtherServiceChange = (event) => {
    this.setState({ otherService: event.target.value });
  };

  validateForm = () => {
    const { companyName, companyType, gstNumber, panNumber, selectedServices, otherService } = this.state;
    const errors = {};

    if (!companyName) {
      errors.companyName = "*Company Name is required.";
    } else if (!/[a-zA-Z]/.test(companyName)) {
      errors.companyName = "*Company Name should be in words.";
    }

    if (!companyType) {
      errors.companyType = "*Company Type is required.";
    }

    if (!gstNumber) {
      errors.gstNumber = "*GST Number is required.";
    }

    if (!panNumber) {
      errors.panNumber = "*PAN Number is required.";
    }

    if (selectedServices.length === 0 && !otherService) {
      errors.services = "*Please select at least one service or specify 'Other Services'.";
    }

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const isValid = this.validateForm();

    if (isValid) {
      const {
        companyName,
        companyType,
        gstNumber,
        panNumber,
        selectedServices,
        otherService,
      } = this.state;
      const formData = {
        companyName,
        companyType,
        gstNumber,
        panNumber,
        selectedServices: otherService
          ? [...selectedServices, otherService]
          : selectedServices,
      };

      this.props.onFormSubmit(formData);
    }
  };

  render() {
    const {
      companyName,
      companyType,
      gstNumber,
      panNumber,
      selectedServices,
      otherService,
      errors,
    } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit} className="companyForm">
          <h1 className="header">Company Form</h1>
          <div className="formContainer">
            <label>Company Name:</label>
            <input
              type="text"
              name="companyName"
              value={companyName}
              onChange={this.handleInputChange}
              className="companyname"
            />
            {errors.companyName && <span>{errors.companyName}</span>}
            <br />

            <label>Company Type:</label>
            <Select
              value={{ value: companyType, label: companyType }}
              onChange={this.handleCompanyTypeChange}
              options={this.companyTypes.map((type) => ({
                value: type,
                label: type,
              }))}
              className="companytype"
            />
            {errors.companyType && <span>{errors.companyType}</span>}
            <br />

            <label>GST Number:</label>
            <input
              type="text"
              name="gstNumber"
              value={gstNumber}
              onChange={this.handleInputChange}

              className="gstnumber"
            />
            {errors.gstNumber && <span>{errors.gstNumber}</span>}
            <br />

            <label>PAN Number:</label>
            <input
              type="text"
              name="panNumber"
              value={panNumber}
              onChange={this.handleInputChange}
              className="pannumber"
            /> 
            {errors.panNumber && <span>{errors.panNumber}</span>}
            <br />
            <label className="company-services">Company Services:</label>
            <Select
              options={services}
              value={selectedServices.map((service) => ({
                value: service,
                label: service,
              }))}
              isMulti
              onChange={this.handleServiceChange}
              className="Companyservices"
            />
            <br />

            <label>Other Services:</label>
            <select
              name="otherService"
              value={otherService}
              onChange={this.handleOtherServiceChange}
            >
              <option value=""></option>
              {this.otherServices.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
            {errors.services && <span>{errors.services}</span>}
            <br />

            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default CompanyForm;
