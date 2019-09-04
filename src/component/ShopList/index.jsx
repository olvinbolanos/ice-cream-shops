import React, {Component} from 'react'
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';


class ShopList extends Component {

    constructor(props) {
      super(props);
    //   props is the link with the result sending back from its child a.k.a the result we returned in SearchForm
      this.state = {
        // leverage the state to store the information return
        results: [],
        errorState: null,
        loading: false
      }
    }

    componentDidMount() {
        this.getShopFromApi('California')
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.searchLocationQuery !== prevProps.searchLocationQuery) {
            this.setState({
                results: [],  
            }, () => this.getShopFromApi(this.props.searchLocationQuery))
        }
    }

    getShopFromApi = (locationSearched) => {
        //UI feedback to tell the user when we are retrieving infromation from the API 
        // this.setState({ loading: true })
        console.log(locationSearched, '<--this is what is coming in')

        //using a proxy server cors-anywhere to get rid of the CROS probblem 
        //passing the location variable, which equals to the user's input (see below). Instead of grabbbing the entire API, it will only retrieve the restaurants that are closed to the lcoation information we entered. This makes the lodading wayyyyyyy faster.
        axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?location=${locationSearched}`, {
            // required authorization format from API 
            headers: {
                //to get the API from the .env file use process.env.{variable name}
                Authorization: `Bearer ${process.env.REACT_APP_YELP_KEY}`,
            },
            // option params passed to API call to retrieve only breakfast and lunch spots 
            params: {
                categories: 'icecream',
                sort_by: 'rating'
            }
            })
            
            .then((res) => {
                console.log(res.data.businesses)
                //change the state of App to reflect on the result we are given from the API
                //at the same time, setting the loading state to false 
                this.setState({ results: res.data.businesses, loading: false })
            })
            .catch((err) => {
                //fire the errorState message if there is no information return from the API
                this.setState({ errorState: `Sorry we coudln't find information related to the location you search, do you want to try something else?`, loading: false })
            })
    }

    renderEmptyState() {
        return (
            <h2 className='faultyInfo'>
                `Hang tight! We are working on getting you the list of the ice cream stores in your neighborhood!
            </h2>
        )
    }

    renderShopsInfo() {
        const ShopList = this.state.results.map((result, i) => {
            return (
              <div className="shopsInfo" key={i}>
                  <h2 className="heading">{result.name}</h2>
                  <img className="ui medium bordered image" src={result.image_url} alt="" />
                  <p>Rating for this Ice cream shop: <i>{result.rating}</i></p>
                  <p>{result.location.display_address[0]}, {result.location.display_address[1]}</p>
                  <p>{result.phone}</p>
                  <a href={result.url} className="iceCreamInfo">More Information on Yelp about {result.name}</a>
              </div>
              
            )
            
        })

        return (
            <div className="ShopList">{ShopList}</div>
            
        )
    }

    render() {
        return (
            <section>
                {this.state.results.length ? this.renderShopsInfo() : this.renderEmptyState()}

                {/*conditional rendering for error state - when this.state.errorState is not true*/}
                {!!this.state.errorState &&
                    <h1>{this.state.error}</h1>
                }   
            </section>
        )}
}

export default ShopList