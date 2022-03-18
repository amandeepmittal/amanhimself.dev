import { Text } from '@chakra-ui/react';

const TimeToRead = ({ timeToRead }) => {
  return (
    <Text color="gray.500" fontSize="sm">
      {timeToRead}
    </Text>
  );
};

export default TimeToRead;
