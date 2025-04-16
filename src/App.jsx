import "bootstrap/dist/css/bootstrap.min.css"
import { useState, useEffect, memo } from "react"


const PoliticiansCard = memo(({ id, name, image, position, biography }) => {
  //console.log("render " + id)
  return (
    <div>
      <h1>{name}</h1>
      <img src={image} alt="" />
      <h2>{position}</h2>
      <p>{biography}</p>
    </div>
  )
})

const SelectorOption = memo(({ value }) => {
  //console.log("render " + id)
  return <option value={value}>{value}</option>
})

function App() {
  const url = "https://boolean-spec-frontend.vercel.app/freetestapi/politicians/"
  const [politicians, setPoliticians] = useState([])
  const [filteredPoliticians, setFilteredPoliticians] = useState([]);
  const [positions, setPositions] = useState([]);
  const [userInput, setUserInput] = useState('');


  async function getdata(url) {
    const data = await fetch(url)
    const usedata = await data.json()
    return usedata
  }

  function onCahnge(event) {
    const input = event.target.value;
    setUserInput(input);

    if (input === '') {
      setFilteredPoliticians(politicians);
    } else {
      const filtered = politicians.filter((politician) => {
        return (
          politician.name.toLowerCase().includes(input.toLowerCase()) ||
          politician.biography.toLowerCase().includes(input.toLowerCase())
        );
      });
      setFilteredPoliticians(filtered);
    }
  }

  useEffect(() => {
    getdata(url).then((res) => {
      setPoliticians(res);
      setFilteredPoliticians(res);
      const positionsDatas = res.map((re) => re.position)
      const uniquePositions = [...new Set(positionsDatas)];
      setPositions(uniquePositions)
    })
  }, [])
  //console.log(politicians)

  return (
    <main>
      <h1>POLITICI</h1>
      <input type="text" onChange={onCahnge} value={userInput} />
      <select name="positions" id="positions">
        {positions.map((position, index) => {
          return <SelectorOption key={index + 1} value={position} />
        })}
      </select>
      {filteredPoliticians.map((politician) => {
        return <PoliticiansCard key={politician.id} id={politician.id} name={politician.name} image={politician.image} position={politician.position} biography={politician.biography} />
      })}
    </main>
  )
}

export default App
