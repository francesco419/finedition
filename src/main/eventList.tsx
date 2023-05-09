import { ApiChild } from './apiContents';
import { useAppSelector } from '../redux/hooks';
import './apiContents.scss';
import { selectEle } from '../redux/Slices/eleSlice';
import _ from 'lodash';

export default function EventList() {
  const event = useAppSelector(selectEle);
  return (
    <div>
      <h2>MY EVENTS</h2>
      <div className='apiContent'>
        {_.map(event, (data, index) => {
          return <ApiChild api={data} index={index} key={`event_${index}`} />;
        })}
      </div>
    </div>
  );
}
