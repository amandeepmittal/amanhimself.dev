import { Text, useMediaQuery } from '@chakra-ui/react';
import dayjs from 'dayjs';

const PublishedDate = ({ date }) => {
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  return (
    <>
      {isMobile ? (
        <Text color="gray.500" fontSize="sm">
          {dayjs(date).format('MMM D, YYYY')}
        </Text>
      ) : (
        <Text color="gray.500" fontSize="sm">
          Published on {dayjs(date).format('MMM D, YYYY')}
        </Text>
      )}
    </>
  );
};

export default PublishedDate;
