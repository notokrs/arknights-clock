import {Heading, Box} from '@chakra-ui/react';
import {useEffect, useState} from 'react';
import {TimeProps} from '../utils/Interface';

function Time({...props}: TimeProps) {
  const [time, setTime] = useState(new Date());

  const timeOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const clock =
    String(time.getHours()).padStart(2, '0') +
    ':' +
    String(time.getMinutes()).padStart(2, '0');

  const second = String(time.getSeconds()).padStart(2, '0');

  const date = time.toLocaleDateString(props.dateLang, timeOptions);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box className="clock">
      <Heading id="time">
        {clock}
        <span id="second">{second}</span>
      </Heading>
      <p id="date">{date}</p>
    </Box>
  );
}

export default Time;
