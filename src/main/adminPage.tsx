import './adminPage.scss';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { ApiContents } from './apiContents';
import EventList from './eventList';
import Alert from '../component/any/alert';
import { useAppSelector } from '../redux/hooks';
import { selectAlarm } from '../redux/Slices/alarm';

export default function AdminPage() {
  const [count, setCount] = useState<number>(1);
  const [menu, setMenu] = useState<boolean>(true);
  const [alert, setAlert] = useState<boolean>(true);
  const alarm = useAppSelector(selectAlarm);

  const getMenu = (bool: boolean) => {
    setMenu((memu) => bool);
  };

  const getAlert = () => {
    if (!alert) {
      setAlert((alert) => true);
      setTimeout(() => {
        setAlert((alert) => false);
      }, 3);
    }
  };

  return (
    <div className='admin'>
      <div className='admin__container'>
        <div className='admin__menu'>
          <div className='admin__menu__title'>
            <p>MENU</p>
          </div>
          <hr />
          <div className='admin__menu__button'>
            <button onClick={() => getMenu(true)}>EVENT SETTING</button>
            <button onClick={() => getMenu(false)}>MY EVENT</button>
          </div>
        </div>
        {menu ? (
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <h2>EVENTS</h2>
              <div className='info'>
                !
                <div className='info__popup'>
                  <ul>
                    <li>
                      <p> :: 클릭시 상세정보</p>
                    </li>
                    <li>
                      <p> 좌측 ○ 이벤트 추가/삭제 토글버튼 </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <ApiContents count={count} alarm={getAlert} />
            <div className='admin__con'>
              <button
                className='admin__con__pageButton'
                onClick={() => {
                  if (count > 0) {
                    setCount((count) => count - 1);
                  }
                }}
              >
                prev
              </button>
              <button
                className='admin__con__pageButton'
                onClick={() => setCount((count) => count + 1)}
              >
                next
              </button>
            </div>
          </div>
        ) : (
          <EventList />
        )}
      </div>
      {alarm.alarm && <Alert />}
    </div>
  );
}
