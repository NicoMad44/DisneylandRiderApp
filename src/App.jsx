import { useEffect, useState } from "react";
import { Attraction } from "./components/Attraction/Attraction";
import { Header } from "./components/Header/Header";
import { excludedAttractions } from "./data/excludedAttractions";

import { lands } from "./data/lands";




function App() {
  
  const [selectedLands, setSelectedLands] = useState([])

  // We get the data from the API
  const [disneylandData, setDisneylandData] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/parks/4/queue_times.json'); // 28 pour studio
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDisneylandData(data.lands);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
    fetchData();
  }, []);

  if (!disneylandData) {
    return <p>Chargement...</p>;
  }

  const disneylandRides = []
  const excludedId = []

  excludedAttractions.forEach((excludAtt)=>{excludedId.push(excludAtt.id)});

  selectedLands.map( (land) => 
    land.rides.map((ride) => {      
      ride.land = land.name;
      if(!excludedId.includes(ride.id)){
        disneylandRides.push(ride)
      }
    })
  );

  // on trie par temps d'attente
  const disneylandRidesTimeDecending = [...disneylandRides].sort((a, b) => b.wait_time - a.wait_time );
  
  // Attractions
  const attractionsElementsListToDisplay = disneylandRidesTimeDecending.map((ride) =>  
    <Attraction key={ride.id}
      id={ride.id}
      name={ride.name}
      parc={ride.parc}
      land={ride.land}
      QTime={ride.wait_time}
      openStatus={ride.is_open}
      />
  )

  return (
   <div className="app">
      <Header lands={disneylandData} selectedLands={selectedLands} setSelectedLands={setSelectedLands}/>
      <main className="mainContainer">
          {attractionsElementsListToDisplay}    
      </main>
   </div>
  )
}

export default App
