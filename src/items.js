import Display from './components/Display';
import ComputePad from './components/ComputePad';
import NumberPad from './components/NumberPad';
import EqualityButton from './components/EqualityButton';

export const items = [
  [
    { index: '1', transfered: false, content: <Display /> },
    { index: '2', transfered: false, content: <ComputePad /> },
    { index: '3', transfered: false, content: <NumberPad /> },
    { index: '4', transfered: false, content: <EqualityButton /> },
  ],
  [],
];
