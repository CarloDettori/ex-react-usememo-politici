import "bootstrap/dist/css/bootstrap.min.css"
import { useState, useEffect } from "react"


function PoliticiansCard({ id, name, image, position, biography }) {





  return (

    <div key={id}>
      <h1>{name}</h1>
      <img src={image} alt="" />
      <h2>{position}</h2>
      <p>{biography}</p>
    </div>


  )
}

function App() {
  const url = "https://boolean-spec-frontend.vercel.app/freetestapi/politicians/"
  const [politicians, setPoliticians] = useState([])

  async function getdata(url) {
    const data = await fetch(url)
    const usedata = await data.json()
    return usedata
  }

  useEffect(() => {
    getdata(url).then((res) => {
      setPoliticians(res);
      console.log(res)
    })
  }, [])
  console.log(politicians)

  return (
    <main>
      <h1>ciao</h1>
      {politicians.map((politician) => {
        return <PoliticiansCard name={politician.name} image={politician.image} position={politician.position} biography={politician.biography} />
      })}
    </main>
  )
}

export default App
