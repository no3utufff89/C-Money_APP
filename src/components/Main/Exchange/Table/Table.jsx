// import PropTypes from 'prop-types';
import style from './Table.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserCurrencies } from '../../../../store/slice/userCurrenciesSlice';
import Row from './Row';
import { generateRandomId } from '../../../../utils/secondaryFunctions';

export const Table = () => {
  const token = useSelector(state => state.token.token);
  const dispatch = useDispatch();
  // eslint-disable-next-line max-len
  const userCurrencies = useSelector(state => state.userCurrencies.userCurrencies);
  const loading = useSelector(state => state.userCurrencies.loading);
  useEffect(() => {
    if (token) dispatch(getUserCurrencies());
  }, [token]);
  return (
    <table>
      <thead>
        <tr>
          <th className={style.table__title} colSpan='2'>Мои валюты</th>
        </tr>
      </thead>
      <tbody>
        {loading ?
        <tr>
          <td>
            Загрузка данных...
          </td>
        </tr> :
          // eslint-disable-next-line max-len
          userCurrencies.map(currency => <Row item={currency} key={generateRandomId()} />)
        }
      </tbody>
    </table>
  );
};

// Table.propTypes = {
//
// };
