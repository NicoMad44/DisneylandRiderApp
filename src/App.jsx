import { useEffect, useState } from "react";
import { Attraction } from "./components/Attraction/Attraction";
import { Header } from "./components/Header/Header";
import { excludedAttractions } from "./data/excludedAttractions";

function App() {
  
  const [selectedLands, setSelectedLands] = useState([])
  const [selectedParc, setSelectedParc] = useState("Disneyland")
  const [favoriteList, setFavoriteList] = useState(JSON.parse(window.localStorage.getItem("favorite")))
  const [favoriteFilter, setFavoriteFilter] = useState(false)
  const [timeFilter, setTimeFilter] = useState(300)



  // We get the data from the API
  const [disneylandData, setDisneylandData] = useState(null);
  const [studioData, setStudioData] = useState(null);

  const disneylandURL = "src/data/offlineDevDisneyAPIfile.json"//'https://rider-proxy.onrender.com/api/parks/4/queue_times.json';
  const studioURL = "src/data/offlineDevStudioAPIfile.json"//'https://rider-proxy.onrender.com/api/parks/28/queue_times.json';

  useEffect(() => {
      fetch(disneylandURL/* getApiUrl('/parks/4/queue_times.json') */)
          .then(
            (response) => response.json()
            .then((response) => setDisneylandData(response.lands))
            .catch((error) => console.log(error))
          )
      fetch(studioURL)
      .then(
        (response) => response.json()
        .then((response) => setStudioData(response.lands))
        .catch((error) => console.log(error))
      )
    }, []
  )

  if (!disneylandData || !studioData) {
    return <p>Chargement...</p>;
  }

  const Rides = []
  const excludedId = []

  excludedAttractions.forEach((excludAtt)=>{excludedId.push(excludAtt.id)});
  
  selectedLands.map( (land) => 
    land.rides.map((ride) => {      
      ride.land = land.name;
      ride.parc = selectedParc;
      if(favoriteFilter){
        if(!excludedId.includes(ride.id) && favoriteList.includes(ride.id) && ride.wait_time<timeFilter){
          Rides.push(ride)
        }
      } else {
        if(!excludedId.includes(ride.id) && ride.wait_time<timeFilter){
          Rides.push(ride)
        }
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
      favoriteList={favoriteList}
      setFavoriteList={setFavoriteList}
      />
  )

  return (
   
   
   
   
   <div className="app">

      {/* <BrowserRouter>
        <Header />
        <main>
          <RouterNM lands={selectedParc==="Disneyland"? disneylandData : studioData}
        selectedLands={selectedLands}
        setSelectedLands={setSelectedLands}
        selectedParc={selectedParc}
        setSelectedParc={setSelectedParc}
        excludedAttractions={excludedAttractions}
        />
        </main>
        <Footer />
      </BrowserRouter> */}

      <Header lands={selectedParc==="Disneyland"? disneylandData : studioData}
        selectedLands={selectedLands}
        setSelectedLands={setSelectedLands}
        selectedParc={selectedParc}
        setSelectedParc={setSelectedParc}
        favoriteFilter={favoriteFilter}
        setFavoriteFilter={setFavoriteFilter}
        timeFilter={timeFilter}
        setTimeFilter={setTimeFilter}
        />
      <main className="mainContainer">
          {attractionsElementsListToDisplay}    
      </main>
      <footer>
      </footer>
   </div>
  )
}

export default App
