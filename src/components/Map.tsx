import React, { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import { Location } from 'pages/MapPage'
import styled from 'styled-components'
import { FadeText, Overlay } from './common'

mapboxgl.accessToken =
  'pk.eyJ1IjoiamFsaXJhaW5pbyIsImEiOiJja3p4MmZoZ3EwaXJmMm9udTBkNGM2NzliIn0.s0qLcUpZIuwyGddm-S6N4A'

const Container = styled.div`
  position: relative;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  .marker {
    background-image: url('/media/pin.svg');
    background-size: cover;
    width: 48px;
    height: 48px;
    position: absolute;
    top: 0;
    left: 0;
  }
  .mapboxgl-control-container {
    a {
      text-decoration: none;
      color: initial;
      font-size: 12px;
    }
  }
`

const MapContainer = styled.div`
  height: 100%;
  width: 100%;
`

type MapProps = {
  location: Location
  loading: boolean
}

const Map = ({ location, loading }: MapProps) => {
  const lat = parseFloat(location.latitude)
  const long = parseFloat(location.longitude)
  const [mapLoaded, setMapLoaded] = useState<boolean>(false)

  const container = useRef<HTMLDivElement | null>(null)
  const map = useRef<mapboxgl.Map | null>()
  const marker = useRef<HTMLDivElement | null>()

  const addMapMarker = () => {
    if (!map.current) return

    if (marker.current) marker.current.remove()
    const node = document.createElement('div')
    node.className = 'marker'
    marker.current = node

    new mapboxgl.Marker(marker.current).setLngLat([long, lat]).addTo(map.current)
  }

  useEffect(() => {
    if (map.current || !container.current) return

    map.current = new mapboxgl.Map({
      container: container.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v11',
      center: [long, lat]
    })
    map.current.on('load', () => setMapLoaded(true))
  }, [container])

  useEffect(() => {
    addMapMarker()
  }, [long, lat])

  return (
    <Container>
      {mapLoaded && (
        <>
          <Overlay vertical="right" style={{ width: '30%'}}>
            {!loading && (
              <FadeText>
                Latitude: {lat} | Longitude : {long}
              </FadeText>
            )}
          </Overlay>
          <Overlay vertical="left">
            <FadeText>ISS On The Map</FadeText>
          </Overlay>
        </>
      )}
      <MapContainer ref={container} />
    </Container>
  )
}

export default Map
export { Map }
