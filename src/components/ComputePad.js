import React from 'react';
import { useDispatch } from 'react-redux';

function ComputePad() {
  const dispatch = useDispatch();

  const buttons = ['/', '*', "-", "+"];

  const fold = (eValue) => {
    dispatch({ type: 'FOLD', payload: { value: eValue } });
  };

  return (
    <div className="computePad">
      {buttons.map((btn, index) => (
        <button style={{cursor: "pointer"}} key={index} value={btn} onClick={(e) => fold(e.target.value)}>
          {btn}
        </button>
      ))}
    </div>
  );
}

export default ComputePad;
