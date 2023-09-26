import PropTypes from 'prop-types';
import style from './Transfer.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { generateRandomId } from '../../../../utils/secondaryFunctions';
import { accountTransfer } from '../../../../store/slice/accountSlice';
import { useForm } from 'react-hook-form';

export const Transfer = ({ account }) => {
  const allAccounts = useSelector(state => state.accounts.accounts);
  const filtredAccList = allAccounts.filter(acc => acc.account !== account);
  const transferError = useSelector(state => state.account.error);
  const addAttr = { 'list': 'filtred-list' };
  const dispatch = useDispatch();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    dispatch(accountTransfer(data));
    reset();
  };

  return (
    <div className={style.transfer}>
      <h3 className={style.transfer__title}>Перевод</h3>
      <form className={style.transfer__form} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.transfer__inputWrapper}>
          <span className={style.error}>
            {errors.to && errors.to.message}
          </span>
          <label className={style.transfer__label}>Счет</label>
          <input
            {...register('to', {
              required: 'Заполните это поле',
              pattern: {
                value: /^\d+$/,
                message: 'Неверный номер счета'
              }
            })}
            type="text"
            {...addAttr}
            className={style.transfer__input}/>
          <datalist id={Object.values(addAttr)}>
            {filtredAccList.map(elem => (
              <option key={generateRandomId()} value={elem.account}>
               Баланс: {elem.balance} ₽.
              </option>
            ))}
          </datalist>
        </div>
        <div className={style.transfer__inputWrapper}>
          <span className={style.error}>
            {errors.amount && errors.amount.message}
          </span>
          <label className={style.transfer__label}>Сумма</label>
          <input
            {...register('amount', {
              required: 'Заполните это поле',
              pattern: {
                value: /^[1-9]/,
                message: 'Некорректная сумма'
              }
            })}
            type="text"
            className={style.transfer__input}/>
        </div>
        <button
          type='submit'
          className={`${style.transfer__btn} btn btn_colored`}>
          Перевести</button>
      </form>
      {transferError && <p>Ошибка перевода: {transferError}</p>}
    </div>
  );
};

Transfer.propTypes = {
  account: PropTypes.string
};
