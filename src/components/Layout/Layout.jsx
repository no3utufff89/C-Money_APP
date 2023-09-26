import PropTypes from 'prop-types';
import style from './Layout.module.scss';

export const Layout = ({ children }) => (
  <div className={style.container}>
    {children}
  </div>
);

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),
};
