import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FadeIn } from 'components/common'
import Map from 'components/Map'
import styled from 'styled-components'

const API_URL = 'http://api.open-notify.org/iss-now.json'
const SUCCESS_STATUS = 'success'

export type Location = {
  latitude: string
  longitude: string
}

type APIResponse = {
  message: string
  timestamp: string
  iss_position: Location
}

const Center = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
`

const MapPage = () => {
  const [activeCoordinates, setActiveCoordinates] = useState<Location | null>()
  const [fetchActive, setFetchActive] = useState<boolean>(false)
  const [splashVisible, setSplashVisible] = useState<boolean>(true)

  useEffect(() => {
    const refreshCoordinates = async () => {
      setFetchActive(true)
      const {
        data: { message, iss_position }
      } = await axios.get<APIResponse>(API_URL as string)
      setFetchActive(false)
      if (message !== SUCCESS_STATUS) {
        return
      }
      setActiveCoordinates(iss_position)
    }
    refreshCoordinates()
    setInterval(refreshCoordinates, 5000)
  }, [])

  useEffect(() => {
    setTimeout(() => setSplashVisible(false), 3000)
  })

  return (
    <FadeIn>
      <Center>
        <h1>
          International Space Station, <i>tracked</i>.
        </h1>
      </Center>
      {!splashVisible && activeCoordinates && (
        <Map location={activeCoordinates} loading={fetchActive} />
      )}
    </FadeIn>
  )
}

export default MapPage
