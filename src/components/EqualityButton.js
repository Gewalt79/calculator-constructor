import React from 'react';
import { useDispatch } from 'react-redux';

function EqualityButton() {
  const dispatch = useDispatch();

  const equal = () => {
    dispatch({ type: 'EQUAL' });
  };
  return (
    <div className="equalityButton">
      <button style={{ cursor: 'pointer' }} onClick={() => equal()}>
        =
      </button>
    </div>
  );
}

export default EqualityButton;
