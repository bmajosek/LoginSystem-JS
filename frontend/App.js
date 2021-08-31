import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import './App.css';


function App() {
  const [username, setusername] = useState("")
  const [haslo, sethaslo] = useState("")
  const [confirmpassword, setconfirmpassword] = useState("")
  const [uzytkownik, setuzytkownik] = useState("")
  const [hasuo, sethasuo] = useState("")
  const [czyon, setczyon] = useState(false);
  const [wiadoma,setwiadoma] = useState("")
  const [wiadoma2, setwiadoma2] = useState("")
  useEffect(()=>{
    Axios.get('http://localhost:3004/otrzymaj').then((response)=>{
      console.log(response)
      setwiadoma(response.data)
    })
  },[])
  useEffect(()=>{
    Axios.get('http://localhost:3004/otrzymaj2').then((response)=>{
      console.log(response)
      setwiadoma2(response.data)
    })
  },[])
  const dodajkonto = () => {
    Axios.post('http://localhost:3004/rejestracja', {
      username: username,
      haslo: haslo,
      confirmpassword: confirmpassword
    })
    window.location.reload();
    // console.log(username+haslo+confirmpassword)
  }
  const zaloguj = () => {
    Axios.post('http://localhost:3004/login', {
      uzytkownik: uzytkownik,
      hasuo: hasuo,
    })
    console.log(wiadoma)

    // console.log(uzytkownik+hasuo)
  }


  return (
    
    <div className="App">
        <div className="login" style={{ display: czyon ? "block" : "none" }}>
          <h1>Rejestracja</h1>
          <label>Email</label>
          <input type="email" onChange={
            (event) => {
              setusername(event.target.value)
            }
          } className="form__hidden" id="imejl" />
          <label>Hasło</label>
          <input type="password" onChange={
            (event) => {
              sethaslo(event.target.value)
            }
          } className="form__hidden" />
          <label>Potwierdź Hasło</label>
          <input type="password" onChange={
            (event) => {
              setconfirmpassword(event.target.value)
            }
          } className="pswrd" />
          <button onClick={dodajkonto}>Zarejestruj się</button>

          <button onClick={() => {
            setczyon(!czyon)
          }}>Zaloguj</button>
        <div style={{display : wiadoma2 ? "block" : "none"}}>{wiadoma2}</div>
        
      
        </div>
      
        <div className="login" style={{ display: !czyon ? "block": "none"}}>
          <h1>Login</h1>
          <label>Email</label>
          <input type="email" onChange={
            (event) => {
              setuzytkownik(event.target.value)
            }
          } className="form__hidden" id="imejl2" />
          <label>Hasło</label>
          <input type="password" onChange={
            (event) => {
              sethasuo(event.target.value)
            }
          } className="pswrd" />

          <button onClick={zaloguj}>LOGIN</button>

          <button onClick={() => {
            setczyon(!czyon)
          }}>Stwórz konto</button>
          <div style={{display : wiadoma ? "block" : "none"}}>{wiadoma}</div>
        </div>
      
    </div>
    
  );

}

export default App;
