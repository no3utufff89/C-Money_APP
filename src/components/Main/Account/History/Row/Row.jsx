import PropTypes from 'prop-types';
import style from './Row.module.scss';
import {
  formatDate,
  roundNumber,
} from '../../../../../utils/secondaryFunctions';
import { useSelector } from 'react-redux';

export const Row = ({ transaction }) => {
  const {
    amount,
    from,
    to,
    date
  } = transaction;
  const account = useSelector(state => state.account.account).account;
  const incomming = to === account;
  return (
    <tr>
      <td className={style.td}>
        {incomming ? from : to}
      </td>
      <td className={style.td_middle}>
        <span className={incomming ? style.incomming : style.outcomming}>
          {incomming ? '+' : '-'}{roundNumber(amount)}
        </span>
      </td>
      <td className={style.td_date}>
        <time dateTime={date}>
          {formatDate(date)}
        </time>
      </td>
    </tr>
  );
};

Row.propTypes = {
  transaction: PropTypes.object
};
