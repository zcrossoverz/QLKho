import { timeNow } from '../utils/getTime';
import React, { useEffect, useState } from 'react'


export default function HeaderDashboard(props) {

    const [time, setTime] = useState(timeNow());
  let tick = () => {
    setTime(timeNow());
  }
  useEffect(() => {
    const interval = setInterval(() => {
      tick();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
          <h1 className='text-3xl font-semibold text-white leading-loose'>{props.title}</h1>
          <div className='text-gray-200'>{time}</div>
    </div>
  )
}
