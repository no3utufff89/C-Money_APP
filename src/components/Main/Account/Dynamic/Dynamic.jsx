import PropTypes from 'prop-types';
import style from './Dynamic.module.scss';
import { useState } from 'react';
import { generateRandomId } from '../../../../utils/secondaryFunctions';
import { LineChart } from '../../../charts/Linechart/Linechart';

export const Dynamic = ({ transactions }) => {
  const years = [
    ...new Set(transactions.map(tr => new Date(tr.date).getFullYear()))];
  const lastYearInSet = years.at(-1);
  const [year, setYear] = useState(lastYearInSet);

  const changeYear = (e) => {
    setYear(+e.target.value);
  };
  return (
    <div className={style.dynamic}>
      <div className={style.dynamic__header}>
        <h3 className={style.dynamic__title}>Динамика</h3>
        <span className={style.year}>{year}</span>
        <select
          className={style.select}
          value={year}
          onChange={changeYear}
        >
          {
            years.map(year =>
              <option
                key={generateRandomId()}>
                {year}
              </option>)
          }
        </select>
      </div>
      <LineChart year={year} transactions={transactions}/>
    </div>
  );
};

Dynamic.propTypes = {
  transactions: PropTypes.array,
};
