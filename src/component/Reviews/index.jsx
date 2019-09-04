import React, {Component} from 'react'
import axios from 'axios';


class Reviews extends Component {
    constructor(props) {
        super(props)
        this.state = {
            reviews: [],
            errorState: null,
            loading: false
        }
    }

    handleReviewSubmit = (e) => {
      e.preventDefault()

      this.props.onButtonPress(this.state.reviews)
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.reviewScript !== prevProps.reviewScript) {
            this.setState({
                reviews: [],
            }, () => this.getReviewsFromApi(this.props.reviewScript))
        }
    }

    getReviewsFromApi = (reviewId) => {
        console.log(reviewId, '<----this is in reviewsFromApi')

        axios.get(`${'https://cors-anywhere.herokuapp.com'}https://api.yelp.com/v3/businesses/`)
    }





    
}

export default Reviews;