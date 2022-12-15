import {Box, Heading, Text} from '@chakra-ui/react';
import {DescLocProps} from '../../utils/Interface';

function DescriptionLoc({...props}: DescLocProps) {
  return (
    <Box className="desc">
      <Heading id="place-name-title">{props.title}</Heading>
      <Text id="place-desc">{props.desc}</Text>
    </Box>
  );
}

export default DescriptionLoc;
