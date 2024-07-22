import { useState,useEffect } from 'react'
 
import './App.css'

import io from 'socket.io-client'
 

const socket=io.connect("http://localhost:3333")
 
function App() {
  const [message, setMessage] = useState(" ")
  const [chat ,setChat]=useState([])

const sendChat=(e)=>{
  e.preventDefault()
  socket.emit("chat",{message})
  setMessage('')
}
useEffect(()=>{
  socket.on("chat",(payloda)=>{
  setChat([...chat,payloda])
  })
} )

  return (
    <>
     
    <h1>Chatty App</h1>  
    {
      chat.map((data,index)=>{
return (
  <p>{data.message}</p>
)
      })
    }
    <form onSubmit={sendChat}> 
      <input type="text" name="chat"
      value={message}
      onChange={(e)=>{
        setMessage(e.target.value)
      }}
      ></input>
      <button type="submit">send </button>
    </form>
    </>
  )
}

export default App
