import PropTypes from 'prop-types';
import style from './Card.module.scss';
import { formatDate, roundNumber } from '../../../../utils/secondaryFunctions';
import { Link } from 'react-router-dom';

export const Card = ({ accountData }) => (
  <li className={style.card}>
    <Link to={`/account/${accountData.account}`}>
      <p className={style.card__id}>
        {accountData.account}
      </p>
      <p className={style.card__balance}>
        {roundNumber(accountData.balance)}
      </p>
      <div className={style.card__info}>
        <div>
          {accountData.date && <>
            <p>Открыт:</p>
            <time dateTime={accountData.date}>
              {formatDate(accountData.date)}
            </time>
          </>}
        </div>
        {accountData.transactions[0] &&
          <div>
            <p>последняя операция</p>
            <time dateTime={accountData.date}>
              {formatDate(accountData.transactions[0].date)}
            </time>
          </div>}
      </div>
    </Link>
  </li>
);

Card.propTypes = {
  accountData: PropTypes.object
};
