import React, { useState } from 'react'
import WeatherComponent from "./Components/WeatherComponent";

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";     
    
//core
import "primereact/resources/primereact.min.css";                                       
        

import 'primeicons/primeicons.css';


function App() {
  
  return <WeatherComponent />;
}

export default App;
