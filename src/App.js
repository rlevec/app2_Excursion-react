import React, { useState, useEffect } from 'react'
import Tours from './Tours'
import Loading from './Loading'

const url = "http://localhost:5000/users"

const App = () => {
  const [loading, setLoading] = useState(true)
  const [tours, setTours] = useState([])

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id)
    setTours(newTours)
  }

  const fetchTours = async() => {
    try {
      const response = await fetch(url)
      const newTours = await response.json()
      setLoading(false)
      setTours(newTours)
    }
    catch(error) {
      setLoading(true)
    }
  }

  useEffect(() => {
    fetchTours()
  },[])

  if(loading) {
    return (
      <main>
        <section>
          <Loading />
        </section>
      </main>
    )
  }

  if(tours.length === 0){
    return (
      <section>
        <div className='title'>
          <h2>no tours to show</h2>
          <div className='underline'></div>
          <button className='btn' onClick={() => fetchTours()}>refresh</button>
        </div>
      </section>
    )
  }

  return (
    <main>
      <Tours 
        tours={tours}
        removeTour={removeTour}
      />
    </main>
  )
}

export default App