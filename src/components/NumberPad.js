import React from 'react';
import { useDispatch } from 'react-redux';

function NumberPad() {
  const dispatch = useDispatch();

  const buttons = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, '.'];

  const setNum = (num) => {
    dispatch({ type: 'ADD', payload: { operation: 'operator', value: num } });
  };

  return (
    <div className="numberPad">
      {buttons.map((btn, index) => (
        <button
          className={btn === 0 ? 'numberPad-zero' : ''}
          value={btn}
          onClick={(e) => setNum(e.target.value)}>
          {btn}
        </button>
      ))}
    </div>
  );
}

export default NumberPad;
