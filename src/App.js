import {useState} from 'react'
import './style/App.css'
import Login from './pages/login'
import Tab from './components/tab'

function App() {
  const [log, setLog] = useState(false)
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
