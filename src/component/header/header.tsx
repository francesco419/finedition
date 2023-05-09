import './header.scss';
import { ReactComponent as Bag } from '../../assets/svg/bag.svg';
import { ReactComponent as Person } from '../../assets/svg/person.svg';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const nav = useNavigate();
  return (
    <div className='header'>
      <div className='header__container'>
        <div className='header__left'>
          <div
            className='header__title'
            onClick={() => nav(`${process.env.PUBLIC_URL}`)}
          >
            <h1>finedition</h1>
          </div>
          <MenuNav />
        </div>
        <div className='header__right'>
          <input type='text' className='header__right-search' />
          <button
            onClick={() => {
              nav('/admin');
            }}
          >
            <Bag />
          </button>
          <button
            onClick={() => {
              nav('/admin');
            }}
          >
            <Person />
          </button>
        </div>
      </div>
    </div>
  );
}

function MenuNav() {
  return (
    <div className='menu'>
      <MenuChild text='Magazine' />
      <MenuChild text='Shop' />
      <MenuChild text='Map' />
      <MenuChild text='News' />
      <MenuChild text='Event' />
    </div>
  );
}

interface textProp {
  text: string;
}

function MenuChild({ text }: textProp) {
  return (
    <button className='menu-child'>
      <p>{text}</p>
    </button>
  );
}
