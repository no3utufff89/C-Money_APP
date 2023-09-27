import PropTypes from 'prop-types';
import style from './History.module.scss';
import Row from './Row';
import { generateRandomId } from '../../../../utils/secondaryFunctions';

export const History = ({ transactions }) => (
  <div className={style.history}>
    <h3 className={style.history__title}>История переводов</h3>
    <div className={style.history__table_container}>
      <table className={style.table}>
        <thead className={style.table__thead}>
          <tr>
            <th className={style.th}>Счет</th>
            <th className={style.th}>Сумма</th>
            <th className={style.th}>Дата</th>
          </tr>
        </thead>
        <tbody className={style.table__tbody}>
          {
            [...transactions].reverse().map((transaction) => (
              <Row key={generateRandomId()} transaction={transaction}/>
            ))
          }
        </tbody>
      </table>
    </div>
  </div>
);

History.propTypes = {
  transactions: PropTypes.array,
};
