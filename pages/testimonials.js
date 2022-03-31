import {
  VStack,
  Heading,
  Text,
  UnorderedList,
  ListItem,
  Link,
  Divider
} from '@chakra-ui/react';
import Image from 'next/image';

import { DocumentHead } from '../src/components';

const TestimonialsPage = () => {
  return (
    <>
      <DocumentHead
        pageTitle="Love this blog has received on internet"
        postPath="/testimonials"
      />
      <VStack spacing={3} alignItems="flex-start" w="full" as="section" pt={28}>
        <Heading size="lg" as="h2">
          What other developers say about this blog 💜
        </Heading>
        <Text lineHeight="175%" as="h2" fontSize="lg">
          I&apos;ve been writing for a while now. Sometimes, my blog catches
          other developer eyes 🤩
        </Text>
        <VStack pt={10} justifyContent="center">
          <Link
            href="https://twitter.com/Baconbrix/status/1206662673502478336?ref_src=twsrc%5Etfw"
            pb={10}
          >
            <Image
              src="/testimonials/15.png"
              alt="Evan Bacon's tweet"
              width={1174 / 2}
              height={350 / 2}
            />
          </Link>
          <Link
            href="https://twitter.com/FavreLeandro/status/1222864109701648385?ref_src=twsrc%5Etfw"
            pb={10}
          >
            <Image
              src="/testimonials/4.png"
              alt="testimonial"
              width={1180 / 2}
              height={470 / 2}
            />
          </Link>
          <Link
            href="https://twitter.com/whizzzoe/status/1179090483395514368?ref_src=twsrc%5Etfw"
            pb={10}
          >
            <Image
              src="/testimonials/6.png"
              alt="testimonial"
              width={1164 / 2}
              height={330 / 2}
            />
          </Link>
          <Link
            href="https://twitter.com/QuimperEmanuel/status/1235551452266999808?ref_src=twsrc%5Etfw"
            pb={10}
          >
            <Image
              src="/testimonials/2.png"
              alt="testimonial"
              width={1172 / 2}
              height={280 / 2}
            />
          </Link>
          <Link
            href="https://twitter.com/Jscrambler/status/1206580386517663744?ref_src=twsrc%5Etfw"
            pb={10}
          >
            <Image
              src="/testimonials/16.png"
              alt="testimonial"
              width={1190 / 2}
              height={426 / 2}
            />
          </Link>
          <Link
            href="https://twitter.com/TarasNovak/status/1230901024199671811?ref_src=twsrc%5Etfw"
            pb={10}
          >
            <Image
              src="/testimonials/13.png"
              alt="testimonial"
              width={1176 / 2}
              height={436 / 2}
            />
          </Link>
          <Link
            href="https://twitter.com/spences10/status/1222780520637116417?ref_src=twsrc%5Etfw"
            pb={10}
          >
            <Image
              src="/testimonials/9.png"
              alt="testimonial"
              width={1174 / 2}
              height={498 / 2}
            />
          </Link>
          <Link
            href="https://twitter.com/dev__adi/status/1240363591812796416?ref_src=twsrc%5Etfw"
            pb={10}
          >
            <Image
              src="/testimonials/10.png"
              alt="testimonial"
              width={1162 / 2}
              height={354 / 2}
            />
          </Link>
          <Link
            href="https://twitter.com/artyorsh/status/1168107966056284161?ref_src=twsrc%5Etfw"
            pb={10}
          >
            <Image
              src="/testimonials/8.png"
              alt="testimonial"
              width={1180 / 2}
              height={422 / 2}
            />
          </Link>
          <Link
            href="https://twitter.com/Nutlope/status/1338373822584598529"
            pb={10}
          >
            <Image
              src="/testimonials/17.png"
              alt="testimonial"
              width={1182 / 2}
              height={424 / 2}
            />
          </Link>
        </VStack>
      </VStack>
    </>
  );
};

export default TestimonialsPage;
