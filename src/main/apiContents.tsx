import axios from 'axios';
import { useState, useEffect } from 'react';
import './apiContents.scss';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  selectEle,
  addAPI,
  delAPI,
  selectTitle
} from '../redux/Slices/eleSlice';
import {
  addAlarm,
  delAlarm,
  falseAlarm,
  selectAlarm
} from '../redux/Slices/alarm';
import _ from 'lodash';

const API_KEY =
  'AcCQuNMQrLMVGQI0bi30kQkltmspTu%2F%2FkTxTrZGFBeZtzDOQIAG1eVPhamZ0pPsanOsa8%2F7kZdOuUHBJbuzeug%3D%3D'; //process.env.REACT_APP_API_KEY;

interface APIPARAM {
  count: number;
  alarm: () => void;
}

export interface APITYPE {
  addr1: string;
  addr2: string;
  booktour: string;
  cat1: string;
  cat2: string;
  cat3: string;
  contentid: string;
  contenttypeid: string;
  createdtime: string;
  eventstartdate: string;
  eventenddate: string;
  firstimage: string;
  firstimage2: string;
  cpyrhtDivCd: string;
  mapx: string;
  mapy: string;
  mlevel: string;
  modifiedtime: string;
  areacode: string;
  sigungucode: string;
  tel: string;
  title: string;
}

export function ApiContents({ count, alarm }: APIPARAM) {
  const [info, setInfo] = useState<APITYPE[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getAPI();
  }, []);

  useEffect(() => {
    getAPI();
  }, [count]);

  const getAPI = async () => {
    try {
      const res = await axios.get(
        `https://apis.data.go.kr/B551011/KorService1/searchFestival1?serviceKey=${API_KEY}&numOfRows=20&pageNo=${count}&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=A&eventStartDate=20170901`
      );
      setInfo(res.data.response.body.items.item);
      setLoading((loading) => true);
    } catch {
      console.log('failed');
    }
  };

  if (loading) {
    return (
      <div className='apiContent'>
        {info.map((data, index) => {
          return <ApiChild api={data} index={index} key={`event_${index}`} />;
        })}
      </div>
    );
  } else {
    return <div className='apiContent'></div>;
  }
}

interface APIPROP {
  api: APITYPE;
  index: number;
}

interface SORTPROP {
  api: APITYPE;
  arr: APITYPE[];
}

export function ApiChild({ api, index }: APIPROP) {
  const [append, setAppend] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const title = useAppSelector(selectTitle);
  const alarm = useAppSelector(selectAlarm);

  useEffect(() => {
    if (_.includes(title, api.title)) {
      const doc = document.getElementById(
        `check_${index}`
      ) as HTMLInputElement | null;
      if (doc !== null) {
        doc.checked = true;
      }
    }
  }, []);

  const add = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      dispatch(addAPI(api));
      if (!alarm.alarm) {
        dispatch(addAlarm());
        setTimeout(() => {
          dispatch(falseAlarm());
        }, 2000);
      }
      return;
    }
    if (!e.target.checked) {
      dispatch(delAPI(api));
      if (!alarm.alarm) {
        dispatch(delAlarm());
        setTimeout(() => {
          dispatch(falseAlarm());
        }, 2000);
      }
      return;
    }
  };

  return (
    <>
      <div className='apiChild'>
        <div className='apiChild__click'>
          <input
            type='checkbox'
            hidden
            checked={_.includes(title, api.title)}
            id={`check_${index}`}
            onChange={(e) => add(e)}
          />
          <label className='apiChild__label' htmlFor={`check_${index}`}></label>
        </div>
        <div className='apiChild__short'>
          <div>
            <p>제목 : &nbsp;</p>
            <p>{api.title}</p>
          </div>
          <div>
            <p>위치 : &nbsp;</p>
            <p>{api.addr1}</p>
          </div>
          <div>
            <p>기간 : &nbsp;{api.eventstartdate} ~</p>

            <p>&nbsp;{api.eventenddate}</p>
          </div>
        </div>
        <button
          className='apiChild__button'
          onClick={() => setAppend((append) => !append)}
        >
          ::
        </button>
      </div>
      {append && (
        <div className='apiChild-append'>
          <ApiLine name='제목' value={api.title} />
          <ApiLine name='위치' value={api.addr1} />
          <ApiLine name='연락처' value={api.tel} />
          <ApiLine name='시작일' value={api.eventstartdate} />
          <ApiLine name='종료일' value={api.title} />
          <ApiLine name='X' value={api.mapx} />
          <ApiLine name='Y' value={api.mapy} />
        </div>
      )}
    </>
  );
}

interface Line {
  name: string;
  value: string;
}

function ApiLine({ name, value }: Line) {
  return (
    <div>
      <p className='apiLine'>{name} : &nbsp;</p>
      <p>{value}</p>
    </div>
  );
}
