import React, { Component } from "react";
import CompanyForm from "./CompanyForm";
import CompanyTable from "./CompanyTable";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: [],
      showForm: true,
    };
  }

  handleFormSubmit = (data) => {
    this.setState((prevState) => ({
      formData: [...prevState.formData, data],
      showForm: false,
    }));
  };

  handleBackToForm = () => {
    this.setState({ showForm: true });
  };

  render() {
    const { formData, showForm } = this.state;

    return (
      <div>
        {showForm ? (
          <CompanyForm onFormSubmit={this.handleFormSubmit} />
        ) : (
          <div>
            <CompanyTable companyData={formData} onBackToForm={this.handleBackToForm} />
          </div>
        )}
      </div>
    );
  }
}

export default App;