import {Box, Image} from '@chakra-ui/react';
import {useState} from 'react';
import {CSSTransition} from 'react-transition-group';
import {LogoProps} from '../utils/Interface';

function Logo({...props}: LogoProps) {
  const [prop, setProp] = useState(props);

  return (
    <CSSTransition
      in={props.logo === prop.logo}
      timeout={500}
      onExited={() => {
        setProp(props);
      }}
      classNames="logo"
    >
      <Box className="logo">
        <Image
          src={prop.logo}
          id="logo-img"
          title={prop.title}
          alt={'Logo ' + prop.title}
        />
      </Box>
    </CSSTransition>
  );
}

export default Logo;
