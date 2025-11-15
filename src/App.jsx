import { useEffect, useState } from "react";
import { Attraction } from "./components/Attraction/Attraction";
import { Header } from "./components/Header/Header";

import { lands } from "./data/lands";




function App() {
  const [disneyData, setDisneyData] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/parks/4/queue_times.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        setDisneyData(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
  
    fetchData();
  }, []);

  if (!disneyData || !disneyData.lands) {
    return <p>Chargement...</p>;
  }

  const fantasilandRides = disneyData.lands[2].rides;

  fantasilandRides.forEach(ride =>  {

    ride.parc = "Disneyland";
    ride.land = "Fantasiland"
    
  });

  const testList = fantasilandRides.filter((ride) => (ride.id === 22 || ride.id === 18))

  const fantasilandRidesTimeAscending = [...fantasilandRides].sort((a, b) => b.wait_time - a.wait_time );
  const fantasilandTimeAscending = fantasilandRidesTimeAscending.map((ride) =>  
    <Attraction key={ride.id}
      id={ride.id}
      name={ride.name}
      parc={ride.parc}
      land={ride.land}
      QTime={ride.wait_time}
      openStatus={ride.is_open}
      />
  )

  const fantasilandRidesTimeDecending = [...testList].sort((a, b) => a.wait_time - b.wait_time );
  const fantasilandTimeDecending = fantasilandRidesTimeDecending.map((ride) =>  
    <p key={ride.id}>{ride.id}-{ride.name} -- {ride.wait_time}  Min</p>
  )

  




  return (
   <div>
    <h1>DisneyLand Paris - Temps d'attente live</h1>
    <Header lands={lands}/>
    <main>
      <div>
        <h2>Fantasiland - Longest to Shortest</h2>
        {fantasilandTimeAscending}    
      </div>
      {/* <div>
        <h2>Fantasiland - Shortest to Longest Q</h2>
        {fantasilandTimeDecending}    
      </div> */}
    </main>
   </div>
  )
}

export default App
