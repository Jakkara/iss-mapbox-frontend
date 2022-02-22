import React, { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import { Location } from 'pages/MapPage'
import styled from 'styled-components'
import { FadeText } from './common'

mapboxgl.accessToken =
  'pk.eyJ1IjoiamFsaXJhaW5pbyIsImEiOiJja3p4MmZoZ3EwaXJmMm9udTBkNGM2NzliIn0.s0qLcUpZIuwyGddm-S6N4A'

type MapProps = {
  location: Location
  loading: boolean
}
const Container = styled.div`
  position: relative;
`

const MapContainer = styled.div`
  height: 400px;
`
const Overlay = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  max-width: 80%;
  background-color: rgba(59, 67, 172, 0.8);
  color: #fff;
  padding: 6px 9px;
  border-radius: 12px;
`

const Map = ({ location, loading }: MapProps) => {
  const lat = parseFloat(location.latitude)
  const long = parseFloat(location.longitude)

  const container = useRef<HTMLDivElement | null>(null)
  const map = useRef<mapboxgl.Map | null>(null)

  useEffect(() => {
    if (map.current || !container.current) return

    map.current = new mapboxgl.Map({
      container: container.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v11',
      center: [long, lat]
    })
  }, [container])

  return (
    <Container>
      <Overlay>
        {!loading && (
          <FadeText>
            Latitude: {lat} | Longitude : {long}
          </FadeText>
        )}
      </Overlay>
      <MapContainer ref={container} />
    </Container>
  )
}

export default Map
export { Map }
