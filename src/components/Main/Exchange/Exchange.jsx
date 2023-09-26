// import PropTypes from 'prop-types';
import style from './Exchange.module.scss';
import Rates from './Rates';
import Table from './Table';
import Form from './Form';
import { useSelector } from 'react-redux';

export const Exchange = () => {
  const userCurrencies = useSelector(state =>
    state.userCurrencies.userCurrencies);
  const balance = userCurrencies.find(cur => cur.code === 'RUB')?.amount || 0;
  return (
    <div className={style.exchange}>
      <h2 className={style.exchange__title}>Обмен валюты</h2>
      <span className={style.exchange__text}>
        Счет:
      </span>
      <span className={style.exchange__text_white}>
        24051911200915061003240821
      </span>
      <br/>
      <span className={style.exchange__text}>
        Баланс:
      </span>
      <span className={`${style.exchange__text_white}`}>
        {balance} ₽
      </span>

      <div className={style.exchange__wrapper}>
        <Rates/>
        <div className={style.exchange__right_wrapper}>
          <Form />
          <Table />
        </div>
      </div>
    </div>
  );
};

// Exchange.propTypes = {
//
// };
