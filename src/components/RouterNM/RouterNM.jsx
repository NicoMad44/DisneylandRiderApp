import { Routes, Route } from 'react-router-dom'

import { Home } from '../../pages/Home/Index'

export function RouterNM({lands , selectedLands , setSelectedLands , selectedParc , setSelectedParc , excludedAttractions}){
    return (
        <Routes>
          <Route path="/" element={<Home  
            lands={selectedParc==="Disneyland"? disneylandData : studioData}
            selectedLands={selectedLands}
            setSelectedLands={setSelectedLands}
            selectedParc={selectedParc}
            setSelectedParc={setSelectedParc}
            excludedAttractions={excludedAttractions}
            />} />
        </Routes>
    )

}