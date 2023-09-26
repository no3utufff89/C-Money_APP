// import PropTypes from 'prop-types';
import style from './Form.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCurrencies } from '../../../../store/slice/allCurrenciesSlice';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { asyncExchange } from '../../../../store/slice/userCurrenciesSlice';
import { generateRandomId } from '../../../../utils/secondaryFunctions';

export const Form = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.token.token);
  const err = useSelector(state => state.userCurrencies.error);

  // Возможные валюты
  const allCurrencies = useSelector(state => state.currencies.allCurrencies);

  // Мои валюы
  // eslint-disable-next-line max-len
  const userCurrencies = useSelector(state => state.userCurrencies.userCurrencies);

  useEffect(() => {
    if (token) {
      dispatch(getAllCurrencies());
    }
  }, [token]);
  // Контроль формы
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const from = watch('from');
  const to = watch('to');
  let disabled;
  if (to === from) {
    disabled = true;
  } else {
    disabled = false;
  }
  useEffect(() => {
    const defaultValues = {};
    defaultValues.from =
      [...userCurrencies]
        .filter(currency => currency.amount)[0]?.code || '';
    defaultValues.to =
      [...allCurrencies]
        .sort()[0] || '';
    reset({ ...defaultValues });
  }, [userCurrencies, allCurrencies]);
  // Отправка формы
  const onSubmit = data => {
    dispatch(asyncExchange(data));
    reset();
  };
  let errorMessage;
  if (err === 'Overdraft prevented') {
    errorMessage = 'Недопустимая сумма';
  }
  return (
    <div className={style.wrapper}>
      <h3 className={style.form__title}>Обмен валюты</h3>
      {err && <p>{errorMessage}</p>}
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.form__inputs_wrapper}>
          <div className={style.form__input_wrapper}>
            <label className={style.form__label}>Откуда</label>
            <select
              className={style.form__input}
              {...register('from')}
              value={from}
            >
              {/* eslint-disable-next-line max-len */}
              {[...userCurrencies].filter(currency => currency.amount).map(currency =>
                <option className={style.form__option} value={currency.code}
                  key={generateRandomId()}>{currency.code}</option>
              )}
            </select>
          </div>
          <div className={style.form__input_wrapper}>
            <label className={style.form__label}>Куда</label>
            <select
              className={style.form__input}
              {...register('to')}
              value={to}
            >
              {/* eslint-disable-next-line max-len */}
              {[...allCurrencies].sort().map(currency =>
                <option className={style.form__option} value={currency}
                  key={generateRandomId()}>{currency}</option>,
              )}
            </select>
          </div>
          <div className={style.form__input_wrapper}>
            <span>
              {errors.amount && errors.amount.message}
            </span>
            <label className={style.form__label}>Сумма</label>
            <input
              className={style.form__input}
              {...register('amount', {
                required: 'Заполните это поле',
                pattern: {
                  value: /^([0-9]*[.])?[0-9]+$/,
                  message: 'Некорректная сумма'
                }
              })}
              type='number'
            >
            </input>
          </div>
        </div>
        {/* eslint-disable-next-line max-len */}
        <button
          disabled={disabled}
          className={`btn btn_colored ${style.form__btn}`}
        >Обменять</button>
      </form>
    </div>
  );
};

// Form.propTypes = {
//
// };
