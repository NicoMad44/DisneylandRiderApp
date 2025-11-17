
import { useEffect } from "react"

export function Header({lands, selectedLands, setSelectedLands}){


    const filterButtonClick = (e) => {
        if(!selectedLands.includes(e)) {
            setSelectedLands(prevList => [...prevList, e])
        } else {
            setSelectedLands(prevList => prevList.filter(item => item !== e))
        }
    }

    useEffect(() => {
        console.log(selectedLands);
      }, [selectedLands]);


    return (
        <header className="header" >
            <img className="logo" src={"src/assets/images/EuroDisneyLogo.svg"} alt={"Logo Euro Disney"} />
            <div className="landsFilters" >
                {lands.map((land)=>
                <button 
                    key={land.id}
                    className={`landsFilters--button ${land.name.replace(/[\s\\.]/g, '')}`}
                    onClick={()=>filterButtonClick(land)} 
                    >{land.name}</button>
                )}
            </div>
        </header>

    )
}