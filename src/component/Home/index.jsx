import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import { withFirebase } from '../Firebase'
import SearchForm from '../SearchForm';
import ShopList from '../ShopList';
import '../../App.css'

class Home extends Component {
  state = {
    user: {
      username: '',
      email: ''
    }
  }

    onFormSubmit = (searchLocationQuery) => {
      this.setState({
        searchLocationQuery: searchLocationQuery
      })
    }

  render() {
    console.log(this.props.authUser)
    return (
      <div>
        <h1 className="heading_for_user">Your Username: { this.props.authUser.username }</h1>
        <h2 className="heading_for_user">Your email: { this.props.authUser.email }</h2>
        <SearchForm onFormSubmit = {this.onFormSubmit}/>
        <ShopList 
          searchLocationQuery = {this.state.searchLocationQuery}/> 
      </div>
    )
  }
}

export default withFirebase(withRouter(Home))

// this is called react.context