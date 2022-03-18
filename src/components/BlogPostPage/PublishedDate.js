import { Text, useMediaQuery, useColorModeValue } from '@chakra-ui/react';
import dayjs from 'dayjs';

const PublishedDate = ({ date }) => {
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const textMode = useColorModeValue('#555', 'white');
  return (
    <>
      {isMobile ? (
        <Text color={textMode} fontSize="sm">
          {dayjs(date).format('MMM D, YYYY')}
        </Text>
      ) : (
        <Text color={textMode} fontSize="sm">
          Published on {dayjs(date).format('MMM D, YYYY')}
        </Text>
      )}
    </>
  );
};

export default PublishedDate;
