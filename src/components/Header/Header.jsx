
export function Header({lands, selectedLands, setSelectedLands}){

    const filterButtonClick = (e) => {
        console.log(e.target.key)
    }


    return (
        <div className="header" >
            <img className="logo" src={"src/assets/images/EuroDisneyLogo.svg"} alt={"Logo Euro Disney"} />
            <div className="landsFilters" >
                {lands.map((land)=>
                <button 
                    key={land.id}
                    className={`landsFilters--button ${land.name.replace(/[\s\\.]/g, '')}`}
                    onClick={filterButtonClick} 
                    >{land.name}</button>
                )}
            </div>
        </div>

    )
}