// import PropTypes from 'prop-types';
import style from './Rates.module.scss';
import useWebSocket from 'react-use-websocket';
import { WS_API_URL } from '../../../../api/const';
import { useState } from 'react';
import Raterow from './Raterow';
import { generateRandomId } from '../../../../utils/secondaryFunctions';

export const Rates = () => {
  const [changes, setChanges] = useState([]);
  useWebSocket(`${WS_API_URL}/currency-feed`, {
    onMessage: messageEvent => {
      const message = JSON.parse(messageEvent.data);
      if (message.type !== 'EXCHANGE_RATE_CHANGE' || !message.change) return;
      setChanges(changes => [...changes, message]);
    },
    shouldReconnect: () => true,
  });
  return (
    <div className={style.rates}>
      <h3 className={style.rates__title}>
        Изменение курса в режиме реального времени
      </h3>
      <div>
        {changes.reverse().map(change =>
          <Raterow change={change} key={generateRandomId()}/>)}
      </div>
    </div>
  );
};

// Rates.propTypes = {
//
// };
