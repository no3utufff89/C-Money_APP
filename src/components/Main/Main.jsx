// import PropTypes from 'prop-types';
import style from './Main.module.scss';
import Login from './Login';
import Layout from '../Layout';
import { Route, Routes } from 'react-router-dom';
import List from './List';
import Account from './Account';
import Exchange from './Exchange';

export const Main = () => (
  <main className={style.main}>
    <Layout>
      <Routes>
        <Route path='/' element={<List />} />
        <Route path='/account/:id' element={<Account />} />
        <Route path='/exchange' element={<Exchange />} />
        <Route path='/auth' element={<Login />} />
      </Routes>
    </Layout>
  </main>
);

// Main.propTypes = {
//
// };
