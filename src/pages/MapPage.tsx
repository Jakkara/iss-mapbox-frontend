import React, { useEffect, useState } from 'react'
import axios from 'axios'

const API_URL = 'http://api.open-notify.org/iss-now.json'
const SUCCESS_STATUS = 'success'

type Location = {
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

  useEffect(() => {
    const refreshCoordinates = async () => {
      const {
        data: { message, iss_position }
      } = await axios.get<APIResponse>(API_URL as string)
      if (message !== SUCCESS_STATUS) {
        return
      }
      setActiveCoordinates(iss_position)
    }
    refreshCoordinates()
    setInterval(refreshCoordinates, 15000)
  }, [])

  return <div>{JSON.stringify(activeCoordinates)}</div>
}

export default MapPage