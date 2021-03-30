import React from 'react'

import LeafletMap from './LeafletMap'


class MeteoriteList extends React.Component {
    state = {
        meteorites: [],
        isLoading: true,
    }

    componentDidMount(){
        fetch("https://data.nasa.gov/resource/gh4g-9sfh.json?$limit=50000&$where=within_box(geolocation, 61.070946, -14.289782, 50.156683, 1.420273)")
        // fetch("https://data.nasa.gov/resource/gh4g-9sfh.json?$limit=50000")
        .then(response => response.json())
        .then(meteorites => {
            this.setState({
                meteorites, 
                isLoading: false,
            })
        })
    }
    
    render(){
        const { isLoading } = this.state

        if(isLoading) return (<p>Meteorites loading</p>)
        
        return (
            <div>
                <LeafletMap meteorites={this.state.meteorites}/>
            </div>
        )
    }
    
}

export default MeteoriteList