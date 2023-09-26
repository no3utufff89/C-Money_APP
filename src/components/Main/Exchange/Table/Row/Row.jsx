import PropTypes from 'prop-types';
import style from './Row.module.scss';
import { roundNumber } from '../../../../../utils/secondaryFunctions';

export const Row = ({ item }) => (
  <tr>
    <td className={style.td_code}>{item.code}</td>
    <td className={style.td_amount}>{roundNumber(item.amount)}</td>
  </tr>
);

Row.propTypes = {
  item: PropTypes.object,
};
