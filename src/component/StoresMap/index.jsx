import React, {Component} from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
import {withRouter} from 'react-router-dom'
import {withFirebase} from '../Firebase'
import axios from 'axios'
import '../../App.css'


const style = {
    width: '50%',
    height: '50%'
}

class StoreContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            storeLocation: null,
            errorState: null,
            loading: false
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.storeScript !== prevProps.storeScript) {
            this.setState({
                storeLocation: [],
            }, () => this.getCoordinatesFromApi(this.props.storeScript))
        }
    }

    componentDidMount() {
        this.getCoordinatesFromApi()
    }

    getCoordinatesFromApi = () => {
        const storeId = this.props.match.params.id

        axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/${storeId}`, {
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_YELP_KEY}`,
            }
        })
        .then((res) => {
            this.setState({ storeLocation: res.data, loading: false })
        })
        .catch((err) => {
            this.setState({ errorState: `Sorry, we couldn't find the location you requested, do you want to try some other icecream store?`, loading: false})
        })
    }

    renderEmptyState() {
        return (
            <h2 className='faultyInfo'>
               `Hang tight! We are working on getting you the list of reviews about the store you requested! 
            </h2>
        )
    }

    renderMap() {
        const {storeLocation} = this.state
        const StoreContainer = () => {
        return (
            <div id='mapContainer'>
                <Map
                google={this.props.google}
                style={style}
                zoom={5}
                onClick={this.onMapClicked}>
                    <Marker position={{lat: storeLocation.coordinates.latitude , lng: storeLocation.coordinates.longitude}}
                    icon={{
                        url:'https://png.pngtree.com/element_pic/00/16/10/205808770672059.jpg',
                        anchor: new this.props.google.maps.Point(16,23),
                        scaledSize: new this.props.google.maps.Size(25, 25)
                    }} />
            <InfoWindow onClose={this.onInfoWindowClose}></InfoWindow>
            </Map>
        </div>
        )
            }
            return (
                
                    <div className="flexPics">
                    <section id="mapIntro">
                    <div className="slogan">
                    <div className="icon">
                        <i className="icon-beaker icon-10x"></i>
                    </div>
                  <div className="mapContainer ">
                    <div className="backOfMap">
                    {StoreContainer()}
                    </div>
                  </div>

                  <div className="ui segments">
                    <div className="ui segment">
                        <p>Name Of Store: {storeLocation.name}</p>
                    </div>
                    <div className="ui purple segment">
                        <p>
                            Store Address:
                            {storeLocation.location.address1}, {storeLocation.location.city}, {storeLocation.location.state}, {storeLocation.location.zip_code}
                        </p>
                    </div>
                    <div className="ui red segment">
                        <p>Phone number: {storeLocation.phone}</p>
                    </div>
                    <div className="ui blue segment">
                        <p>Rating: {storeLocation.rating}</p>
                    </div>
                    </div>
                    
                    
                    
                    <div className="flexPics">
                    {
                        storeLocation.photos.map((pics, i) => {
                          return(
                            <img key={i} className="ui medium bordered image" src={pics} alt="images of icecream" />
                          )
                        })
                    } 
                    </div>
                </div>
                </section>
            </div>
            
            )
        }

        render() {
            return (
                <section>
                    {this.state.storeLocation ? this.renderMap() : this.renderEmptyState()}
                    {!!this.state.errorState && <h1>{this.state.error}</h1>}
                </section>
            )
        }
    }

        export default withFirebase(withRouter(GoogleApiWrapper({ 
            apiKey: (process.env.REACT_APP_GOOGLE_KEY)
        })(StoreContainer)))
