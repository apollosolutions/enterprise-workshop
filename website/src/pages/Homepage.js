import ProductCard from '../components/ProductCard';
import {Error} from './Error';

import Spinner from '../components/Spinner';
import {Heading, SimpleGrid, Stack, Text, VStack} from '@chakra-ui/react';
// --- CODE TO IMPORT ---------------------------------
// gql and useQuery from @apollo/client GOES HERE!

// ----------------------------------------------------


// --- Create a GET_FEATURED_PRODUCTS query -----------


// ----------------------------------------------------


export default function HomePage() {
  // --- PARSE error, loading, and data here! Hint: useQuery ------


  // --------------------------------------------------------------

  return (
    <Stack direction="column" spacing="12">
      <VStack direction="column" spacing="2" py="10">
        <Heading size="2xl">Welcome to KBT Threads</Heading>
        <Text fontSize="2xl"> A thread for every occasion! </Text>
      </VStack>
      <Stack direction="column" spacing="4">
        <Heading as="h2" size="lg">
          Products
        </Heading>
        {loading ? (
          <Spinner />
        ) : (
          <SimpleGrid columns={[1, null, 2]} spacing={4}>
            {data?.getFeaturedProducts.map(product => (
              <ProductCard key={product.id} {...product} />
            ))}
          </SimpleGrid>
        )}
      </Stack>
    </Stack>
  );
}
