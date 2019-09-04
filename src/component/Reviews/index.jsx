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

        axios.get(`${'https://cors-anywhere.herokuapp.com'}https://api.yelp.com/v3/businesses/${reviewId}/reviews`, {
            // required authorization format from API
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_YELP_KEY}`,
            }
        })
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    renderEmptyState() {
        return (
            <h2 className='faultyInfo'>
               `Hang tight! We are working on getting you the list of reviews about the store you requested! 
            </h2>
        )
    }

    renderReviews() {
        const ReviewsList = this.state.reviews.map((review, i) => {
            // return (
            //     <div className="reviewsInfo" key={i}>
            //         <h2>className</h2>
            //     </div>
            // )
        })
    }





    
}

export default Reviews;