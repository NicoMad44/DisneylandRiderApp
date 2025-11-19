import { useEffect, useState } from "react";
import { Attraction } from "./components/Attraction/Attraction";
import { Header } from "./components/Header/Header";
import { excludedAttractions } from "./data/excludedAttractions";

import { lands } from "./data/lands";




function App() {
  
  const [selectedLands, setSelectedLands] = useState([])
  const [selectedParc, setSelectedParc] = useState("Disneyland")


  // We get the data from the API
  const [disneylandData, setDisneylandData] = useState(null);
  const [studioData, setStudioData] = useState(null);

  const getApiUrl = (path) => {
    if (import.meta.env.DEV) {
      // En dev : on profite du proxy
      return `/api${path}`;
    } else {
      // En prod : requête directe vers l’API distante
      return `https://queue-times.com${path}`;
    }
  };

  useEffect(() => {
      fetch('http://localhost:4000/api/parks/4/queue_times.json'/* getApiUrl('/parks/4/queue_times.json') */)
          .then(
            (response) => response.json()
            .then((response) => setDisneylandData(response.lands))
            .catch((error) => console.log(error))
          )
      fetch('http://localhost:4000/api/parks/4/queue_times.json')
      .then(
        (response) => response.json()
        .then((response) => setStudioData(response.lands))
        .catch((error) => console.log(error))
      )
    }, []
  )

/*   useEffect(() => {
    const fetchData = async () => {
      try {
        const responseD = await fetch('/api/parks/4/queue_times.json');
        const responseS = await fetch('/api/parks/28/queue_times.json'); // 28 pour studio
        if (!responseD.ok) {
          throw new Error("Network response was not ok for DisneylandData");
        }
        if (!responseS.ok) {
          throw new Error("Network response was not ok for StudioData");
        }
        const dataD = await responseD.json();
        setDisneylandData(dataD.lands);
        const dataS = await responseS.json();
        setStudioData(dataS.lands);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
    fetchData();
  }, []); */

  if (!disneylandData || !studioData) {
    return <p>Chargement...</p>;
  }


  const Rides = []
  const excludedId = []

  excludedAttractions.forEach((excludAtt)=>{excludedId.push(excludAtt.id)});

  selectedLands.map( (land) => 
    land.rides.map((ride) => {      
      ride.land = land.name;
      if(!excludedId.includes(ride.id)){
        Rides.push(ride)
      }
    })
  );

  // on trie par temps d'attente
  const RidesTimeDecending = [...Rides].sort((a, b) => b.wait_time - a.wait_time );
  
  // Attractions
  const attractionsElementsListToDisplay = RidesTimeDecending.map((ride) =>  
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
      <Header lands={selectedParc==="Disneyland"? disneylandData : studioData}
        selectedLands={selectedLands}
        setSelectedLands={setSelectedLands}
        selectedParc={selectedParc}
        setSelectedParc={setSelectedParc}
        />
      <main className="mainContainer">
          {attractionsElementsListToDisplay}    
      </main>
   </div>
  )
}

export default App
