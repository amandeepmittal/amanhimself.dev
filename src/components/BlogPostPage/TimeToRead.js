import { Text, useColorModeValue } from '@chakra-ui/react';

const TimeToRead = ({ timeToRead }) => {
  const textMode = useColorModeValue('#555', 'white');

  return (
    <Text color={textMode} fontSize="sm">
      {timeToRead}
    </Text>
  );
};

export default TimeToRead;
