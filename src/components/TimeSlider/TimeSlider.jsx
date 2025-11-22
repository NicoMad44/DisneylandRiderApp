import Slider from '@mui/material/Slider';
import { useEffect } from 'react';


export function TimeSlider({timeFilter, setTimeFilter}){

    const handleChange = (event, newValue) => {
        setTimeFilter(newValue);
      };
useEffect(()=>{
console.log(timeFilter)
},[timeFilter])
    

    return (
        <Slider value={timeFilter} onChange={handleChange} aria-labelledby="slider"
        valueLabelDisplay="auto"
        valueLabelFormat={val => `< ${val} mins`}
        min={5}
        max={75}
        step={10}
         />
    );


}