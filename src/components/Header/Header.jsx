import style from './Header.module.scss';
import Logo from '../Logo';
import Layout from '../Layout';
import Navigation from './Navigation';
import { useSelector } from 'react-redux';

export const Header = () => {
  const tokenInState = useSelector(state => state.token.token);
  return (
    <header className={style.header}>
      <Layout>
        <div className={style.header_container}>
          <Logo/>
          {tokenInState && <Navigation/>}
        </div>
      </Layout>
    </header>
  );
};
