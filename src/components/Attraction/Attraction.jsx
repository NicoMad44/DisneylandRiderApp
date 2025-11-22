import { useState, useEffect } from "react";

export function Attraction({id, name, parc, land, QTime, openStatus, favoriteList, setFavoriteList}){
 

    const [src, setSrc] = useState(
        `${import.meta.env.BASE_URL}images/${id}_icon.svg`
        );
    
    const [isFavorite, setIsFavorite] = useState( favoriteList.includes(id)? true : false)


    const handleClick = () => {
        if(!isFavorite && !favoriteList.includes(id)){
           setFavoriteList(prevList => [...prevList, id]);
        } else if (isFavorite && favoriteList.includes(id)){
            setFavoriteList(prevFavoriteList => prevFavoriteList.filter(att => att !== id));
        }
        setIsFavorite(!isFavorite);
    }

    useEffect(()=>{
        window.localStorage.removeItem("favorite");
        window.localStorage.setItem("favorite", JSON.stringify(favoriteList));
    },[favoriteList])

    const handleError = () => {
    setSrc(`${import.meta.env.BASE_URL}images/${id}_icon.png`);
    };

    const title = openStatus ? 
    <h3>{name}</h3> 
    :
    <div><h3 className="closed">{name} - Fermé 😣</h3>  </div>
            
    return(

        <div key={id} className="attraction">
            <img className="attractionIcon"
                src={src}
                onError={handleError}
                alt={`"Logo attraction ${name}`} 
                />
            <div className="attractionInfo">
                {title} 
            </div>
            <div className="location">
                    <p className="location__info">{parc}</p>
                    <p className={`location__info--${land}`}>{land}</p>
            </div>
            <div className="favorite"
                onClick={handleClick}
            >
                {isFavorite? "💛" : "🩶"}
            </div>
            <div className="attractionKpi">
                {QTime} min
            </div>
            

        </div>
    )
   












}