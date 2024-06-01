import { useState } from 'react'
import EntradaInput from './components/EntradaInput/EntradaInput'
import Profile from './components/Profile/Profile'
import useStore from './store/use-store'
import './App.css'

function App() {
 const data = useStore((set)=>set.data)
  const repos  = useStore((set)=>set.repos)
  console.log(data,repos , "datra yu reas");
  return (
    <>
      <EntradaInput></EntradaInput>
      <Profile></Profile>
    </>
  )
}

export default App
