import { useEffect } from 'react';
import './alert.scss';
import { useAppSelector } from '../../redux/hooks';
import { selectAlarm } from '../../redux/Slices/alarm';

interface AlertType {
  text: string;
}

export default function Alert() {
  const text = useAppSelector(selectAlarm);
  return (
    <div className='alert'>
      <p>{text.text}</p>
    </div>
  );
}
