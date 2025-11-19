export function Attraction({id, name, parc, land, QTime, openStatus}){
 
    const title = openStatus ? 
            <h3>{name}</h3> 
            :
            <div><h3 className="closed">{id}-{name} - Fermé 😣</h3>  </div>


    return(

        <div key={id} className="attraction">
            <img className="attractionIcon" src={import.meta.env.BASE_URL + `images/${id}_icon.svg`} alt={`"Logo attraction ${name}`} />
            <div className="attractionInfo">
                {title} {id}
                
                <div className="location">
                    <p>{parc}</p>
                    <p>{land}</p>
                </div>
            </div>
            <div className="attractionKpi">
                {QTime} min
            </div>
            

        </div>
    )
   












}