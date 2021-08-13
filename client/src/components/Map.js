import React, { Component } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
// import "./index.css";
mapboxgl.accessToken = 'pk.eyJ1IjoiZXBzaWxvbjIwMjAiLCJhIjoiY2toaHMzczBqMGdnczJycDZjOHQ5aTk1eSJ9.zDfHYaadf5CMyenI0kFHbw';

const tilesetID = 'epsilon2020.18s65zri'

class MapClass extends Component {

    constructor(props) {
        super(props) ;
        this.state = { 
            lng: 9.492188 ,
            lat: 48.690426 ,
            zoom: 5, 
            zipData: [], 
        }; 
    }


    addLayer = () => { 

        this.map.addSource('postleitzahlen', {
            type: 'vector',
            url: 'mapbox://epsilon2020.18s65zri'
        });
        
        this.map.addLayer({
                'id': 'tiles',
                'type': 'line',
                'source': 'postleitzahlen',
                'source-layer': 'postleitzahlen',
                'layout': {
                    'line-cap': 'round',
                    'line-join': 'round'
                },
                'paint': {
                    'line-opacity': 1,
                    'line-color': '#F75E04',
                    'line-width': 2
                }
            },
            'waterway-label'
        );
       
        /*
        this.map.addLayer({
                'id': 'tiles',
                'type': 'line',
                'source': {
                    'type': 'vector',
                    'tiles': [
                        `https://api.mapbox.com/v4/${tilesetID}/8/{x}/{y}.mvt`
                    ]
                },
                'source-layer': 'postleitzahlen',
                'layout': {
                    'line-cap': 'round',
                    'line-join': 'round'
                },
                'paint': {
                    'line-opacity': 0.1,
                    'line-color': '#F75E04',
                    'line-width': 2
                }
            },
            'waterway-label'
        );
        */
        
    }

    
    componentDidMount() {

        this.map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/light-v10', 
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom,
        });

        this.map.on('load', () => {

            const geocoder = new MapboxGeocoder({
                accessToken: 'pk.eyJ1IjoiZXBzaWxvbjIwMjAiLCJhIjoiY2toaHMzczBqMGdnczJycDZjOHQ5aTk1eSJ9.zDfHYaadf5CMyenI0kFHbw',
                mapboxgl: mapboxgl
                
            });

            this.map.addControl( geocoder , 'bottom-right');
            this.map.addControl(new mapboxgl.NavigationControl(), 'top-right');
            this.map.addControl(new mapboxgl.FullscreenControl(), 'top-right');

            this.addLayer()

        })
    }

    componentWillUnmount() {
        this.map.remove();
      }
    

    updateFilter = () => {
        let zipArray = [];
        for (let i = 0; i < 1000; i++) {
            zipArray.push((Math.floor(Math.random() * 90000) + 10000).toString());
            // console.log('+++ random zip created', (Math.floor(Math.random() * 90000) + 10000).toString())

        }

        this.map.setFilter('tiles', ['in', 'postcode', ...zipArray]);

        
    };

    render() { 

        return ( 

            <>
                <div>
                    <div 
                        style={{width: '100%', height: '100vh',}} 
                        ref={el =>  this.mapContainer = el}  
                    > 
                      <button 
                        style={{position: "absolute", bottom: 15, left: 15, zIndex: 5, backgroundColor: "black", color: "white", padding: 10}} 
                        onClick={() => this.updateFilter()}
                       >
                            Filter
                        </button>                                
                    </div> 
                </div>
            </>

         );
    }
}

export default MapClass;