import React, {Component} from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'

const style = {
    width: '40%',
    height: '40%'
}

class StoreContainer extends Component {

    render() {
        const {stores} = this.props
        return (
            <div id='mapContainer'>
                <Map
                google={this.props.google}
                style={style}
                zoom={5}
                onClick={this.onMapClicked}>
                    {
                        (stores || []).map((s, i) => {
                            return (
                                <Marker key={i} position={{lat: s.coordinates.latitude , lng: s.coordinates.longitude}}
                                icon={{
                                    url:'https://png.pngtree.com/element_our/png/20181205/ice-cream-strawberry-sorvete-de-morango-png_256746.jpg',
                                    anchor: new this.props.google.maps.Point(16,23),
                                    scaledSize: new this.props.google.maps.Size(25, 25)
                                }} />
                            )
                        })
                    }
                    <InfoWindow onClose={this.onInfoWindowClose}></InfoWindow>
                    </Map>
                </div>
                )
            }
        }

        export default GoogleApiWrapper({ 
            apiKey: (process.env.REACT_APP_GOOGLE_KEY)
        })(MapContainer)
