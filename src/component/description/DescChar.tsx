import {Box, Heading, Text} from '@chakra-ui/react';
import {DescCharProps} from '../../utils/Interface';

function DescriptionChar({...props}: DescCharProps) {
  let heading: JSX.Element;

  if (props.realName) {
    heading = (
      <Heading id="char-name-title" lineHeight="2rem">
        {props.name} <span id="real-name">({props.realName})</span>
      </Heading>
    );
  } else {
    heading = (
      <Heading id="char-name-title" lineHeight="4rem">
        {props.name}
      </Heading>
    );
  }

  return (
    <Box className="desc">
      {heading}
      <Text id="place-desc">{props.desc}</Text>
    </Box>
  );
}

export default DescriptionChar;
