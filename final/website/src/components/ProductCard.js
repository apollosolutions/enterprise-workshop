import Button from './Button.js';
import PropTypes from 'prop-types';
import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  usePrefersReducedMotion
} from '@chakra-ui/react';
import {Link} from 'react-router-dom';

import ReviewRating from './ReviewRating.js';
import {htmlDecode} from '../helpers';

export default function ProductCard({
  id,
  name,
  shortDescription,
  images,
  overallRating = 5
}) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const zoomAnimation = prefersReducedMotion
    ? {}
    : {
        transform: 'scale(1.1)',
        opacity: '100%'
      };

  return (
    <Box role="group" overflow="hidden" as={Link} to={`/product/${id}`}>
      <Box borderRadius="lg" maxHeight="100%" width="100%" overflow="hidden">
        <Image
          transition="0.3s all ease-in-out"
          opacity={'95%'}
          _groupHover={zoomAnimation}
          _groupFocus={zoomAnimation}
          src={images[0]}
          alt={name}
          objectFit="cover"
        />
      </Box>
      <Flex direction="column" p="3" justify="space-between" minH="120px">
        <Heading as="h2" size="md" my="4">
          {htmlDecode(name)}
        </Heading>
        {
          <Flex direction="column" minH="100px" justify="space-between">
            <Text as="i" noOfLines={2}>{`
              ${htmlDecode(shortDescription)}
            `}</Text>
            <Flex direction="row" py="4" justify="space-between">
              <ReviewRating isHalf rating={overallRating} size={20} />
              <Button>See More</Button>
            </Flex>
          </Flex>
        }
      </Flex>
    </Box>
  );
}

ProductCard.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  shortDescription: PropTypes.string,
  images: PropTypes.array,
  overallRating: PropTypes.number
};
