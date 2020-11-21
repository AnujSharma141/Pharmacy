import {useState} from 'react'
import './App.css'
import Login from './components/login'
import Tab from './components/tab'

function App() {
  const [log, setLog] = useState(true)
  const logIn = ()=>{
    setLog(true)
  }
  const logOut = ()=>{
    setLog(false)
  }
  return (
    <div>
      {log?<Tab sub={logOut} />: <Login sub={logIn} />}
    </div>
  );
}

export default App;
