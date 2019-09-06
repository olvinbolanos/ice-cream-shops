import React, {Component} from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
import {withRouter} from 'react-router-dom'
import {withFirebase} from '../Firebase'
import axios from 'axios'
import '../../App.css'


const style = {
    width: '60%',
    height: '60%'
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
        console.log(storeId)

        axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/${storeId}`, {
            // required authorization format from API
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_YELP_KEY}`,
            }
        })
        .then((res) => {
            this.setState({ storeLocation: res, loading: false })
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
        console.log(storeLocation)
        const StoreContainer = () => {
        return (
            <div id='mapContainer'>
                <Map
                google={this.props.google}
                style={style}
                zoom={5}
                onClick={this.onMapClicked}>
                    <Marker position={{lat: storeLocation.data.coordinates.latitude , lng: storeLocation.data.coordinates.longitude}}
                    icon={{
                        // url:'https://png.pngtree.com/element_pic/00/16/10/205808770672059.jpg',
                        anchor: new this.props.google.maps.Point(16,23),
                        scaledSize: new this.props.google.maps.Size(25, 25)
                    }} />
            <InfoWindow onClose={this.onInfoWindowClose}></InfoWindow>
            </Map>
        </div>
        )
            }
            return (
                <div className="mapContainer">{StoreContainer()}</div>
            )
        }

        render() {
            return (
                <section>
                    {this.state.storeLocation ? this.renderMap() : this.renderEmptyState()}
                    {/* conditional rendering for error state = when the map doesn't want to show up */}
                    {!!this.state.errorState && <h1>{this.state.error}</h1>}
                </section>
            )
        }
    }

        export default withFirebase(withRouter(GoogleApiWrapper({ 
            apiKey: (process.env.REACT_APP_GOOGLE_KEY)
        })(StoreContainer)))
