import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {withFirebase} from '../Firebase'
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

     componentDidUpdate(prevProps, prevState) {
        if(this.props.reviewScript !== prevProps.reviewScript) {
            this.setState({
                reviews: [],
            }, () => this.getReviewsFromApi(this.props.reviewScript))
        }
    }

    componentDidMount() {
        this.getReviewsFromApi()
        console.log('component mounted!1')
    }

    getReviewsFromApi = () => {
        const reviewId = this.props.match.params.id
        console.log(reviewId)

        axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/${reviewId}/reviews`, {
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_YELP_KEY}`,
            }
        })
        .then((res) => {
            console.log(res.data.reviews)
            this.setState({ reviews: res.data.reviews, loading: false })
        })
        .catch((err) => {
            this.setState({ errorState: `Sorry, we couldn't find the information related to the location you requested, do you want to try some other icecream store?`, loading: false})
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
            return (
                <div className="shopsInfo">
                <div className="reviewsInfo heading" key={i}>
                    <img className="ui medium bordered image" src={review.user.image_url} alt={review.user.name} />
                    <h1 className="username">{review.user.name}</h1>
                    <p className="reviewText">{review.text}</p>
                    <h2 className="timeCapsule">Posted this review on: {review.time_created} </h2>
                </div>
                </div>
            )
        })

        return (
            <div className="ShopList"><p>{ReviewsList}</p></div>   
        )
    }

    render() {
        return (
            <section>
                {this.state.reviews.length ? this.renderReviews() : this.renderEmptyState()}

                {!!this.state.errorState && <h1>{this.state.error}</h1>}
            </section>
        )
    }
}

export default withFirebase(withRouter(Reviews))
                