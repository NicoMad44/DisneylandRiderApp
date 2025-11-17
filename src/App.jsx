import { useEffect, useState } from "react";
import { Attraction } from "./components/Attraction/Attraction";
import { Header } from "./components/Header/Header";

import { lands } from "./data/lands";




function App() {
  
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

  console.log(disneylandData)

  const disneylandRides = []

  disneylandData.map( (land) => 
    land.rides.map((ride) => {      
      ride.land = land.name;
      disneylandRides.push(ride)
    })
  );

  console.log(disneylandRides)

/*   // We ammend the data to add some info
  const fantasilandRides = disneylandData[2].rides;
  fantasilandRides.forEach(ride =>  {
    ride.parc = "Disneyland";
    ride.land = "Fantaisiland"
  }); */

  const [selectedLands, setSelectedLands] = useState([])

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
   <div>

    <Header lands={disneylandData} selectedLands={selectedLands} setSelectedLands={selectedLands}/>
    <main className="mainContainer">
        {attractionsElementsListToDisplay}    
    </main>
   </div>
  )
}

export default App
