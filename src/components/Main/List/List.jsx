// import PropTypes from 'prop-types';
import style from './List.module.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAccount, getAccounts } from '../../../store/slice/accountsSlice';
import Card from './Card';
import Loader from '../../../UI/Loader';
import selectSort from '../../../utils/sort';

export const List = () => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.accounts.loading);
  const error = useSelector(state => state.accounts.error);
  const token = useSelector(state => state.token.token);
  const accounts = useSelector(state => state.accounts.accounts);
  // eslint-disable-next-line max-len
  const [selectValue, setSelectValue] = useState('Номер счёта');
  const [selectId, setSelectId] = useState('account');
  useEffect(() => {
    dispatch(getAccounts());
  }, [token]);
  const handleSelectChange = event => {
    setSelectId(event.target.selectedOptions[0].id);
    setSelectValue(event.target.value);
  };
  const handleOpenNewAccount = () => {
    dispatch(createAccount());
  };
  return (
    <div className={style.list_container}>
      <h2 className={style.list_container__title}>
        Здравствуйте, Александр!
      </h2>
      <button
        onClick={handleOpenNewAccount}
        type="button"
        className={`${style.list_container__button} btn`}>
        Открыть новый счет
      </button>
      <div className={style.currencies}>
        <h3 className={style.currencies__title}>Мои счета</h3>
        <div className={style.sort}>
          <span className={style.sort__title}>Сортировка:</span>
          <select
            className={style.sort__select}
            value={selectValue}
            onChange={handleSelectChange}
          >
            <option id="account">Номер счёта</option>
            <option id="balance">Баланс</option>
            <option id="date">Дата открытия</option>
            <option id="last">Дата последней транзакции</option>
          </select>
        </div>
        <ul className={style.currencies__list}>
          {error && <p> Ошибка вылезла {error}</p>}
          {
            loading || !accounts ?
              <Loader /> :
              selectSort(accounts, selectId).map(account => (
                <Card key={account.account} accountData={account} />
              ))
          }
        </ul>
      </div>
    </div>
  );
};

// List.propTypes = {
//
// };
