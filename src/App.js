import style from './App.module.scss';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getTokenFromLS } from './api/token';
import { setTokenToState } from './store/slice/tokenSlice';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tokenInState = useSelector(state => state.token.token);
  useEffect(() => {
    if (tokenInState) return;
    if (getTokenFromLS()) {
      dispatch(setTokenToState(getTokenFromLS()));
    } else {
      navigate('/auth');
    }
  }, [tokenInState]);
  return (
    <div className={style.wrapper}>
      <Header/>
      <Main/>
      <Footer/>
    </div>
  );
}

export default App;
