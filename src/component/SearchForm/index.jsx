import React, {Component} from 'react';
import 'semantic-ui-css/semantic.min.css';
import '../../App.css'

class SearchForm extends Component {
    constructor() {
        super();
        this.state = {
            searchLocationQuery: ""
        }
    }

    handleSearchChange = (e) => {
        this.setState({
            searchLocationQuery: e.target.value
        })
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
    
        this.props.onFormSubmit(this.state.searchLocationQuery)
    }

    render(){
        return (
            <div className = "searchForm">
                {/*add an event listener of form submit so the state only get set when the form is submitted*/}
                <form onSubmit={(e) => this.handleFormSubmit(e)}>
                    <label 
                    htmlFor = 'location'
                    arialabel = 'enter address, neighbourhood, city, province or postal code'
                    className = 'searchForm__label'
                    >I am looking for icecream spots nearby: </label>
                    
                    
                    <div className="ui icon input">
                    <i className="search icon"></i>
                    <input type="text" 
                    id="location" 
                    placeholder="Type here..." 
                    value = {this.state.searchLocationQuery} 
                    onChange = {this.handleSearchChange}
                    />
                    </div>
                    <button className="ui primary button" type = 'submit'>Submit</button>
                </form>
                
            </div>
        );
    }
}

export default SearchForm