
export function Header({lands}){
    return (
        <div className="landsFilters" >
            {lands.map((land)=>
            <button key={land.id} className={`landsFilters--button ${land.name.replace(/\s/g, '')}`} >{land.name}</button>
            )}
        </div>

    )
}