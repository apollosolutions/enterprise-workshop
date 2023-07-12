import Spinner from '../components/Spinner';
import {Error} from './Error';
import { FaShippingFast, FaFileAlt, FaShoppingBasket, FaShoppingCart} from 'react-icons/fa';
import {Heading, Button, Icon, Image, SimpleGrid, Stack, Text, Divider, Stat, StatLabel, Link, StatHelpText, StackItem, Box, Flex, Spacer} from '@chakra-ui/react';
import {gql, useQuery} from '@apollo/client';
import { Link as ReactLink } from 'react-router-dom';

// ----------  Account Summary Query Here -------------






// -----------------------------------

export default function Orders() {
  // -------------- Use Query Code Here --------------
  // useQuery, loading, error handling, and data parsing

  
  // -----------------------------------
  const lastOrder = orders[orders.length - 1];
  return (
    <>
      {data && (
        <Stack direction="column" px="12" spacing="6" mb="12">
          
          <Stack direction="row">
            <Heading as="h5">
            Your Account
            </Heading>
          </Stack>
          <Divider />
        
          <Flex direction="row">
            <Box width="15%">
              <Stack direction="column">
                <Image
                  borderRadius='full'
                  src='https://bit.ly/dan-abramov'
                  alt='Dan Abramov'
                />
                <Heading as="h3" size="md">
                  {firstName} {lastName}
                </Heading>
                <Text fontSize="sm">{email}</Text>
              </Stack>
            </Box>
            

            <Spacer/>

            <Box width="80%">
              {/* Personal Info */}
              <Stack direction="column">
                <StackItem mb={10}>
                  <Heading as="h3" size="md">
                    Personal Information
                  </Heading>
                  <Text fontWeight="regular" mb={5}>
                    Manage your personal information, including phone numbers and email address where you can be contacted
                  </Text>

                  <SimpleGrid columns={2} spacing={10}>
                    <Stat size="sm" className="stat__card">
                      <StatLabel>Full Name</StatLabel>
                      <StatHelpText>{firstName} {lastName}</StatHelpText>
                    </Stat>
                    <Stat className="stat__card">
                      <StatLabel>Address</StatLabel>
                      <StatHelpText>{address}</StatHelpText>
                    </Stat>
                    <Stat className="stat__card">
                      <StatLabel>Email</StatLabel>
                      <StatHelpText>{email}</StatHelpText>
                    </Stat>
                    <Stat className="stat__card">
                      <StatLabel>Language</StatLabel>
                      <StatHelpText>English (US)</StatHelpText>
                    </Stat>
                  </SimpleGrid>
                </StackItem>

                {/* Orders */}
                <StackItem>
                  <Heading as="h3" size="md">
                    Recent Orders
                  </Heading>
                  <Text fontWeight="regular" mb={5}>
                    View your most recent orders including product details
                  </Text>
                  <Box w="100%" className="stat__card">
                    <Flex>
                      <Stack direction="column">
                        <Heading as="h3" size="md">Order Id: #{lastOrder.id}</Heading>
                        <Text>Delivered March 5, 2023</Text>
                      </Stack>
                      <Spacer/>
                      <Stack direction="column">
                        <Button leftIcon={<FaShippingFast />} colorScheme='blue' size="sm" variant='solid'>
                          Track Package
                        </Button>
                        <Button leftIcon={<FaFileAlt />} colorScheme='blue' size="sm" variant='outline'>
                          View Invoice
                        </Button>
                      </Stack>
                    </Flex>

                    <Divider mb={5} pb={5} />

                    {lastOrder.items.map(item => (
                      <Flex key={"order-" + item.id} spacing={10} mb={5}>
                        <Image src={item.parent.images[1]} boxSize='100px' objectFit='cover' />
                        <Spacer />
                        <Link as={ReactLink} size="xl" to={`/product/${item.parent.id}`}>
                          {item.parent.name}
                          <Text as="i">- {item.colorway} - {item.size}</Text>
                        </Link>
                        <Spacer />
                        <Text>${item.price}</Text>
                      </Flex>
                    ))}

                  </Box>
                </StackItem>
                <StackItem>

                {/* Cart Example */}
                </StackItem>
                  <Heading as="h3" size="md">
                    Your Cart
                  </Heading>
                  <Text fontWeight="regular" mb={5}>
                    View checkout cart based on most recent session
                  </Text>

                  <Box w="100%" className="stat__card">
                    <Flex>
                        <Text>{activeCart.items.length} items in cart</Text>
                        <Spacer/>
                        <Heading as="h3" size="md">Total ${activeCart.subtotal}</Heading>
                    </Flex>

                    <Divider mb={5} pb={5} />
                    
                    {activeCart.items.map(item => (
                      <Flex key={"cart-" + item.id} spacing={10} mb={5}>
                        <Image src={item.parent.images[1]} boxSize='100px' objectFit='cover' />
                        <Spacer />
                        <Link as={ReactLink} size="xl" to={`/product/${item.parent.id}`}>
                          {item.parent.name}
                          <Text as="i">- {item.colorway} - {item.size}</Text>
                        </Link>
                        <Spacer />
                        <Text>${item.price}</Text>
                      </Flex>
                    ))}

                    <Divider mb={5} pb={5}/>
                    <Flex justify="flex-end">
                      <Button mr={3} leftIcon={<FaShoppingCart />} size="sm" variant='solid'>
                          Edit Cart
                      </Button>
                      <Button leftIcon={<FaShoppingBasket />} colorScheme='blue' size="sm" variant='solid'>
                          Checkout
                      </Button>
                    </Flex>
                  </Box>
                
              </Stack>
            </Box>
          </Flex>
        </Stack>
      )}
    </>
  );
}
