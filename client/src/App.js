import './App.css';
import { Route, Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import PrivateRoutes from './components/tools/PrivateRoutes'
import Home from './components/Home';
import { createGlobalStyle } from 'styled-components';


function App() {


  const ResponsiveStyle = createGlobalStyle`

  #contain {
    width: 95%;
    margin: auto
  }


  @media only screen 
and (min-device-width : 768px) 
and (max-device-width : 1224px) {
    #contain {
      width: 80%;
      border: 1px solid black;
      border-radius: 15px;
      margin: 0;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 6%;
    }

    h2 {
      margin-top: 0%;
      margin-bottom: 10%;
    }
    

  }
  @media only screen 
and (min-device-width : 1224px)  {
  #contain {
    width: 40%;
    border: 1px solid black;
    border-radius: 15px;
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  #profile-page, #home, #form-pages {
    margin: 5%;
    margin-left: 8%;
    margin-right: 8%;
  }

  h2 {
    margin-top: 0%;
    margin-bottom: 10%
  }

  .navbar {
    width: 40%;
    margin: auto;
    padding-right: 0% !important;
  }
}
  `


  return (
    <div className="App">
      <ResponsiveStyle />
      <Navbar />
      <section id='contain'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />

          <Route element={<PrivateRoutes type="1" />}>
            <Route path='/profile' element={<Profile />} />
          </Route>
        </Routes>
      </section>
    </div>
  );
}

export default App;
