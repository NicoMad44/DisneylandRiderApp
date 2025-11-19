import { useState } from "react";

export function Attraction({id, name, parc, land, QTime, openStatus}){
 
    const title = openStatus ? 
            <h3>{name}</h3> 
            :
            <div><h3 className="closed">{id}-{name} - Fermé 😣</h3>  </div>

    const [src, setSrc] = useState(
        `${import.meta.env.BASE_URL}images/${id}_icon.svg`
        );
    
        const handleError = () => {
        setSrc(`${import.meta.env.BASE_URL}images/${id}_icon.png`);
        };


            
    return(

        <div key={id} className="attraction">
            <img className="attractionIcon"
                src={src}
                onError={handleError}
                alt={`"Logo attraction ${name}`} 
                />
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