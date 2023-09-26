import style from './Login.module.scss';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getTokenDataAsync } from '../../../store/slice/tokenSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Error from '../../Error';

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tokenInState = useSelector(state => state.token.token);
  const authError = useSelector(state => state.token.error);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [alert, setAlert] = useState(false);

  const onSubmit = (data) => {
    // Здесь будем диспатчить токен
    dispatch(getTokenDataAsync(data));
  };

  useEffect(() => {
    if (tokenInState) navigate('/');
  }, [tokenInState]);

  // Далее следует попытка обработать ошибку при херовой авторизации,
  // получилось что получилось
  useEffect(() => {
    if (authError === 'No such user' || authError === 'Invalid password') {
      setAlert(true);
    } else {
      setAlert(false);
    }
  }, [authError]);

  return (
    <div className={style.login_container}>
      <div className={style.wrapper}>
        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
          <legend className={style['form-title']}>Вход в аккаунт
          </legend>
          <div className={style['input-wrapper']}>
            <label className={style.form__label}>Логин
              <span className={style.error}>
                {errors.login && errors.login.message}
              </span>
            </label>
            <input className={style.form__input}
              {...register('login', {
                required: 'Заполните это поле',
                pattern: {
                  value: /^[^\s()-][A-Za-z]{6,}$/i,
                  message: 'Некорректный логин',
                },
              })}
            />
          </div>

          <div className={style['input-wrapper']}>
            <label className={style.form__label}>
              Пароль
              <span className={style.error}>
                {errors.password && errors.password.message}
              </span>
            </label>
            <input className={style.form__input}
              {...register('password', {
                required: 'Заполните это поле',
                pattern: {
                  value: /^[^\s()-][A-Za-z]{5,}$/i,
                  message: 'Некорректный пароль',
                },
              })}
              type="password"
            />
          </div>
          <button
            className={`${style.button} btn`}
            type="submit">Войти
          </button>
        </form>
      </div>
      {alert && <Error />}
    </div>
  );
};
