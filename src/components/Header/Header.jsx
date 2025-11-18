
import { useEffect, useState } from "react"
import { FilterBox } from "../FilterBox/FilterBox"

export function Header({lands, selectedLands, setSelectedLands, selectedParc, setSelectedParc}){

    return (
        <header className="header" >
            <nav className="parcNavigation">
                <img className="logo" src={"src/assets/images/Parc_Disneyland_Paris_logo.png"}
                    alt={"Logo Euro Disney"}
                    onClick={()=>{
                        setSelectedParc("Disneyland")
                        setSelectedLands([]);
                        }
                    } />
                <img className="logo" src={"src/assets/images/500px-Parc_Walt_Disney_Studios_logo_2.png"}
                alt={"Logo Studio"}
                onClick={()=>{
                    setSelectedParc("Studio")
                    setSelectedLands([]);
                    }
                } />
            </nav>
            <FilterBox lands={lands}
                selectedLands={selectedLands}
                setSelectedLands={setSelectedLands}  />

        </header>

    )
}