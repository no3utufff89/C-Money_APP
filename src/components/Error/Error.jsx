import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import style from './Error.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { clearError } from '../../store/slice/tokenSlice';
import { useRef } from 'react';
import { Transfer } from '../Main/Account/Transfer/Transfer';

export const Error = ({ error }) => {
  const overlayRef = useRef(null);
  const authError = useSelector(state => state.token.error);
  const dispatch = useDispatch();
  const confirmError = () => {
    dispatch(clearError());
  };
  let errorMessage;
  if (authError === 'No such user') {
    errorMessage = 'Нет такого пользователя';
  } else {
    errorMessage = 'Неверный пароль';
  }
  return ReactDOM.createPortal(
    <div className={style.overlay} ref={overlayRef}>
      <div className={style.error}>
        <p className={style.error__title}>Ошибочка</p>
        <ul className={style.error__list}>
          <li className={style.error__item}>
            {errorMessage}
          </li>
        </ul>
        <p className={style.error__item}>
          Попробуйте <br/> Логин: developer <br/> Пароль: methed
        </p>
        <button
          className={`${style.button} btn`}
          onClick={confirmError}>Понятно</button>
      </div>
    </div>,
    document.getElementById('modal-root'),
  );
};

Transfer.propTypes = {
  error: PropTypes.object
};
