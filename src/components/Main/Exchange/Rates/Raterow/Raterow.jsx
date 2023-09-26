import PropTypes from 'prop-types';
import style from './Raterow.module.scss';
import { Rateicon } from './RateIcon/RateIcon';

export const Raterow = ({ change }) => (
  <div className={style.tr}>
    <span className={style.td__first}>
      {change.from}/{change.to}
    </span>
    <span className={style.td__second}></span>
    <span className={style.td__third}>
      {change.rate}
      <Rateicon up={change.change === 1}/>
    </span>
  </div>
);

Raterow.propTypes = {
  change: PropTypes.object
};
