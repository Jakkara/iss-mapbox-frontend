import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FadeIn, Header1 } from 'components/common'
import Map from 'components/Map'

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

const MapPage = () => {
  const [activeCoordinates, setActiveCoordinates] = useState<Location | null>()
  const [fetchActive, setFetchActive] = useState<boolean>(false)

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
    setInterval(refreshCoordinates, 10000)
  }, [])

  return (
    <FadeIn>
      <Header1>
        International Space Station, <i>tracked</i>.
      </Header1>
      {activeCoordinates && (
        <FadeIn>
          <Map location={activeCoordinates} loading={fetchActive}/>
        </FadeIn>
      )}
    </FadeIn>
  )
}

export default MapPage
