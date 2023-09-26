import style from './Account.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCurrentAccount } from '../../../store/slice/accountSlice';
import { Link, useParams } from 'react-router-dom';
import History from './History';
import Dynamic from './Dynamic';
import Transfer from './Transfer';
import Loader from '../../../UI/Loader';

export const Account = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const accountData = useSelector(state => state.account.account);
  const loading = useSelector(state => state.account.loading);
  const token = useSelector(state => state.token.token);
  const {
    account,
    transactions,
    balance,
  } = accountData || {};

  useEffect(() => {
    if (token) dispatch(getCurrentAccount(id));
  }, [token]);

  return (
    <div className={style.account__container}>
      <div className={style.account__header}>
        <h2 className={style.account__title}>
          {loading || !account ?
            'Счёт' :
            'Счёт №' + account
          }
        </h2>
        <p>
          {loading || !account ?
            'Баланс' :
            'Баланс: ' + balance + ' ₽'
          }
        </p>
        <Link className={`btn btn_colored`} to='/'>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="13" viewBox="0 0 16 13" fill="none">
            {/* eslint-disable-next-line max-len */}
            <path d="M3.83 5.5L7.41 1.91L6 0.5L0 6.5L6 12.5L7.41 11.09L3.83 7.5L16 7.5V5.5L3.83 5.5Z" fill="white"/>
          </svg>
          Вернуться
        </Link>
      </div>
      {loading || !account ? <Loader/> :
        <>
          {
            transactions.length > 0 && <Dynamic transactions={transactions}/>
          }
          {
            transactions.length ?
              <History transactions={transactions}/> :
              <p>Переводы отсутствуют</p>
          }
        </>
      }
      <Transfer account={account}/>
    </div>
  );
};
