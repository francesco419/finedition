import './main.scss';
import _ from 'lodash';

interface ItemType {
  type: string;
  name: string;
  from: string;
  price: string;
}

export default function Main() {
  const color: string[] = [
    '#e4ef73',
    '#ff1178',
    '#fff205',
    '#fe0000',
    '#7cff01',
    '#9800ff'
  ];

  function ItemComp() {
    //{ type, name, from, price }: ItemType
    return (
      <div className='item'>
        <div className='item__img'></div>
        <div className='item__desc'>
          <p className='item__desc_cul'>cultural</p>
          <div>
            <p className='item__desc_name'>Backjae Keyring</p>
            <p className='item__desc_from'>finedition</p>
          </div>
          <p className='item__desc_price'>￦23,000</p>
        </div>
      </div>
    );
  }
  return (
    <div className='main'>
      <div className='main__section'>
        <div className='main__card'>
          {_.map(color, (data) => {
            return (
              <div
                className='main__card__indi'
                style={{ backgroundColor: data }}
              >
                <p className='main__card__text'>Text</p>
                <p className='main__card__text'>Text</p>
              </div>
            );
          })}
        </div>
        <div className='main__item'>
          <div className='main__item__discover'>
            <div className='main__item__discover__dis'>
              <p>Discover, Gunsan</p>
            </div>
            <div className='main__item__discover__week'>
              <p>{`Word Buzz \n of this week`}</p>
            </div>
          </div>
          <div className='main__item__selling'>
            <p>Top Selling Items</p>
            <hr />
            <div className='main__item__selling_first'>
              <ItemComp />
              <ItemComp />
              <ItemComp />
            </div>
            <hr />
            <div className='main__item__selling_first'>
              <ItemComp />
              <ItemComp />
              <ItemComp />
            </div>
            <hr />
            <div className='main__item__selling_first'>
              <ItemComp />
              <ItemComp />
              <ItemComp />
            </div>
          </div>
        </div>
        <div className='main__footer'>footer</div>
      </div>
    </div>
  );
}
