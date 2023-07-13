import React from "react";
import Form from "./components/form";
import Header from "./components/header";
import {Routes,Route,BrowserRouter as Router} from 'react-router-dom'
import WhatsappForm from "./components/whatsappForm";
// Test

function App() {
  

  return (
    <><Header/>
     
   
    <Routes>
    
    <Route path="whatsapp" element={<WhatsappForm />}/>
    <Route path="/" element={<Form />}/>
    </Routes>
    
   
   
</>
  );
}

export default App;
