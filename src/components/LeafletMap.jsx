import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'

class LeafletMap extends React.Component {
    
    render(){
        const { meteorites } = this.props
    
        const position = [53.5, -2]

        return (
            <div className="map-container">
            <MapContainer center={position} zoom={6} scrollWheelZoom={false}>
                <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                    {meteorites.map((meteorite, i) => {
                        let lat = parseFloat(meteorite.reclat)
                        let long = parseFloat(meteorite.reclong)
                        let markerPosition = [lat, long]

                        let yearLanded = "Unknown"

                        if(meteorite.year){
                            yearLanded = meteorite.year.slice(0, 4)
                        } 

                        let mass = "Unknown"

                        if(meteorite.mass){
                            mass = Math.round(meteorite.mass * 100) / 100
                        } 
                        
                        let rotate = Math.random() * 360

                        let markerIcon = L.divIcon({
                            iconSize: [20, 20],
                            iconAnchor: [45, 45],
                            className: `meteor-${meteorite.id}`,
                            html: `<img 
                            style="transform: rotate(${rotate}deg);"
                            height="100" 
                            width="100" 
                            src='/static/media/meteor.a98d6299.png'>`
                        })

                        let moreInfoLink = "https://www.google.com/search?q=" + meteorite.name + " meteorite"

                        return (
                            <Marker position={markerPosition} icon={markerIcon}>
                            <Popup>
                                <h3>{meteorite.name}</h3>
                                <p><b>Mass:</b> {mass}</p>
                                <p><b>Year landed:</b> {yearLanded}</p>
                                <p><a href={moreInfoLink} target="_blank">Learn more about this meteorite</a></p>
                            </Popup>
                            </Marker>
                        )
                    })}
            </MapContainer>
            </div>
        )
    }
}

export default LeafletMap