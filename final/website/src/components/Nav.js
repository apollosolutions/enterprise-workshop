import KBTLogo from './logo.png';
import {Box, Button, Flex} from '@chakra-ui/react';
import {Link} from 'react-router-dom';

export default function Nav() {
  return (
    <Flex
      flexDir="row"
      justifyContent="space-between"
      alignItems="center"
      p="4"
    >
      <Box as={Link} to="/">
        <img src={KBTLogo} alt="KBT Inc. logo" />
      </Box>
      <Box as={Link} to="/account">
        <Button>Account</Button>
      </Box>
    </Flex>
  );
}
