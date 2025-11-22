

export function FilterBox({lands, selectedLands,setSelectedLands, favoriteFilter, setFavoriteFilter }){

    const filterButtonClick = (e) => {
        if(!selectedLands.includes(e)) {
            setSelectedLands(prevList => [...prevList, e])
        } else {
            setSelectedLands(prevList => prevList.filter(item => item !== e))
        }
    }

    return (
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
                        if(selectedLands.length===lands.length){
                            setSelectedLands([])
                            } else {
                            setSelectedLands(lands)
                            }
                        }
                    } 
                    >{
                        selectedLands.length===lands.length ? "🗑️": "ALL"
                    }
                    </button>
                    <button 
                    key="MickeyCache2"
                    className="landsFilters__button favoritebtn"
                    onClick={()=>{
                        setFavoriteFilter(!favoriteFilter)
                    } }
                    >{
                        favoriteFilter ? "💛": "🩶"
                    }
                    </button>
                    

            </div>
    )




}