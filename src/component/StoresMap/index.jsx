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
                Authorization: `Bearer ${"PnRdOKRmHRpmECP-0W77hciytB1Zz_-ErKkRw5wjCVZe6GdAUnugblsI_gzf7gUws9hGHhrWder7PjXBWVlJTuU6KzSj7bgGnlqfnSclasAlo5iaIMZtJznpqXy-Y3Yx"}`,
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
            <div>
              <h2 className='faultyInfo'>
                `Hang tight! We are working on getting you the list of reviews about the store you requested! 
              </h2>
            </div>
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
                        url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtbo9xy5vyyahxBRtdplsnZ43j9VeXiJH1A6LxEbmBlZTMJZ7rvw&amp;s',
                        anchor: new this.props.google.maps.Point(16,23),
                        scaledSize: new this.props.google.maps.Size(20, 20)
                    }} />
                <InfoWindow onClose={this.onInfoWindowClose}></InfoWindow>
                </Map>
            </div>
        )};

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
                            <div>
                              <img key={i} className="ui medium bordered" src={pics} alt="icecream" />
                            </div>
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
                <div>
                    <section>
                      {this.state.storeLocation ? this.renderMap() : this.renderEmptyState()}
                      {!!this.state.errorState && <h1>{this.state.error}</h1>}
                    </section>
                </div>
            )    
        }
    }

        export default withFirebase(withRouter(GoogleApiWrapper({ 
            apiKey: (process.env.REACT_APP_GOOGLE_KEY)
        })(StoreContainer)))
