import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import Sidebar from './Components/Sidebar/Sidebar';
import Chat from './Components/Chat/Chat'
import {useStateValue} from './Context/StateProvider'
import Login from './Components/Login/Login'

function App() {

  const [{user} ] = useStateValue(); 
  return (
    <div className="app">
      {!user ? <Login />
        : (
          <div className="app_body">
            <Router>
              <Route path='/' component={Sidebar} />
              <Switch>
                <Route exact path='/rooms/:roomId' component={Chat} />
                {/* <Route  path = '/' component={Chat}/> */}

              </Switch>
            </Router>
          </div>
        )
      }

    </div>
  );
}

export default App;
