import style from './Footer.module.scss';
import Logo from '../Logo';
import Layout from '../Layout';

export const Footer = () => (
  <footer className={style.footer}>
    <Layout>
      <div className={style.footer_container}>
        <Logo/>
        <span className={style.copy}>© C-Money, 2022</span>
      </div>
    </Layout>
  </footer>
);
