import React, {Component} from 'react'
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes'

class ShopList extends Component {

    constructor(props) {
      super(props);
      this.state = {
        results: [],
        errorState: null,
        loading: false
      }
    }

    componentDidMount() {
        this.getShopFromApi('Pomona, California')
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.searchLocationQuery !== prevProps.searchLocationQuery) {
            this.setState({
                results: [],  
            }, () => this.getShopFromApi(this.props.searchLocationQuery))
        }
    }

    getShopFromApi = (locationSearched) => {
        axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?location=${locationSearched}`, {
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_YELP_KEY}`,
            }, 
            params: {
                categories: 'icecream',
                sort_by: 'rating',
                radius: 10000,
                latitude: 45.362155597121941
            }
            })
            
            .then((res) => {
                console.log(res.data.businesses)
                this.setState({ results: res.data.businesses, loading: false })
            })
            .catch((err) => {
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
                  <img className="ui medium bordered image" src={result.image_url} alt="images of icecream" />
                  <p>Rating for this Ice cream shop: <i>{result.rating}</i></p>
                  <p>Would you like to see some reviews from three customers? 
                      <Link to={`${ROUTES.REVIEWS}/${result.id}`}>Reviews</Link>
                  </p>
                  <p>{result.location.display_address[0]}, {result.location.display_address[1]}</p>
                  <p>Would you like to find the location of this icecream store?
                      <Link to={`${ROUTES.MAP}/${result.id}`}>Location On Map</Link>
                  </p>
                  <p>{result.phone}</p>
                  <a href={result.url} className="iceCreamInfo" target="_blank">More Information on Yelp about {result.name}</a>
                  
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

                {!!this.state.errorState &&
                    <h1>{this.state.error}</h1>
                }   
            </section>
        )}
  }

export default ShopList