import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import './App.css'
import authService from './appwrite/auth.js'
import { login, logout } from './store/authSlice.js'
import Footer from './components/Footer/Footer.jsx';
import { Outlet } from 'react-router-dom';
import { Header } from './components/index.js';


function App() {
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {

    authService.getuser().then((data) => {
      if (data) {
        dispatch(login({ data }))
      } else {
        dispatch(logout())
      }
    }).finally(() => setloading(false))
  }, []);

  return loading ? (null) : (
      <div className=' w-full block'>
        <Header/>
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
  );
}

export default App
