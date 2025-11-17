
import { useEffect, useState } from "react"

export function Header({lands, selectedLands, setSelectedLands}){

    const [filterActive, setFilterActive] = useState("")

    const filterButtonClick = (e) => {
        if(!selectedLands.includes(e)) {
            setSelectedLands(prevList => [...prevList, e])
        } else {
            setSelectedLands(prevList => prevList.filter(item => item !== e))
        }
    }

    /* const filterButtonClickAll = ()=>{
        setSelectedLands([]);
        /* lands.forEach((land)=>{setSelectedLands(prevList => [...prevList, land])}) 
    } */

    return (
        <header className="header" >
            <img className="logo" src={"src/assets/images/EuroDisneyLogo.svg"} alt={"Logo Euro Disney"} />
            <div className="landsFilters" >
                {lands.map((land)=>
                <button 
                    key={land.id}
                    className={
                        `landsFilters__button
                            ${land.name.replace(/[\s\\.]/g, '')} ${selectedLands.includes(land)?
                                `${land.name.replace(/[\s\\.]/g, '')}--active`:
                                `${land.name.replace(/[\s\\.]/g, '')}`
                                }`
                            }
                    onClick={()=>filterButtonClick(land)} 
                    >{land.name}</button>
                )}
                  <button 
                    key="MickeyCache"
                    className="landsFilters__button allLandButton"
                    onClick={()=>{
                        console.log(selectedLands.length===lands.length)
                        if(selectedLands.length===lands.length){
                            setSelectedLands([])
                            console.log("vider")
                            } else {
                            setSelectedLands(lands)
                            console.log("remplir")
                            }
                        }
                    } 
                    >{
                        selectedLands.length===lands.length ? "🗑️": "ALL"
                    }
                    </button>

            </div>
        </header>

    )
}