import Spinner from '../components/Spinner';
import { FaShoppingCart, FaCheck } from 'react-icons/fa';
import {Error} from './Error';
import {
  Flex,
  Heading,
  Image,
  Stack,
  StackDivider,
  Text,
  SimpleGrid,
  Button,
  Select,
  Tag,
  Divider,
  TagLabel,
  TagLeftIcon,
  useToast
} from '@chakra-ui/react';
import {gql, useQuery} from '@apollo/client';
import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

import {htmlDecode, htmlParser} from '../helpers';

export const GET_PRODUCT_DETAILS = gql`
  query GetProductDetails($productId: ID!) {
    product(id: $productId) {
      id
      name
      description
      price
      images
      ... @defer {
        variants {
          colorway
          size
          inStock
          id
        }
      }
    }
  }
`;

export default function Product() {
  const toast = useToast()

  const [currentImage, setImage] = useState("");
  const [selectedColor, setColor] = useState("");
  const [selectedSize, setSize] = useState("");
  const [cartLoading, setCartLoading] = useState(false);

  const [sizeOptions, setSizeOptions] = useState([]);
  const [inStockSizes, setInStockSizes] = useState([]);
  const [colorOptions, setColorOptions] = useState([]);

  const setVariantOptions = (product) => {
    if (product) {
      const colorOptions = product.variants
        .map(variant => variant.colorway)
        .filter((color, index, colors) => colors.indexOf(color) === index);

      setColorOptions(colorOptions);
    
      // For Sorting
      const sizeOrder = ["xs", "s", "m", "l", "xl", "xxl"];
      const sortBySize = (a, b) => sizeOrder.indexOf(a) - sizeOrder.indexOf(b);

      const allSizes = product.variants
        .filter(variant => variant.colorway === selectedColor)

      const inStockSizeOfColor = allSizes
        .filter(variant => (variant.inStock))
        .map(variant => variant.size);

      setSizeOptions(allSizes.map(variant => variant.size).sort(sortBySize));
      setInStockSizes(inStockSizeOfColor)
    }
  }

  useEffect(() => {
    setVariantOptions(data.product, selectedColor);
  }, [selectedColor]);

  const updatePage = (data) => {
    if (!currentImage) {
      setImage(data.product.images[0]);
    }

    if (data.product.variants) {
      setColor(data.product.variants[0].colorway);
      setSize(data.product.variants[0].size);
    }
  }

  // --------- Code Here for Workshop ----------------------
  const {id} = useParams();

  const response = useQuery(GET_PRODUCT_DETAILS, {
    variables: {productId: id},
    onCompleted: (data) => {
      updatePage(data);
    }
  });


  const {loading, error, data = {}} = response;
  if (loading) return <Spinner />;
  if (error) return <Error error={error.message} />;
  const {name, description, images} = data?.product || {};
  // ------------------------------------------------------
  
  return (
    <>
      {data && (
        <SimpleGrid columns={2} px="12" spacing="6" mb="12">
          <Stack direction="column" spacing="6">
            <Image
              src={currentImage}
              alt={name}
              className="product__image"
              objectFit="cover"
              borderRadius="12"
            />
            <Stack direction="row" alignContent={"center"}>
            { 
              images?.map(imageUri => {
                const activeImage = (imageUri === currentImage);
                return (
                  <Image 
                    key={imageUri}
                    className={`product__thumbnail ${activeImage ? "product__thumbnail--active" : null}`}
                    src={imageUri}
                    onClick={() => setImage(imageUri)}
                  />
                )
              })
            }
            </Stack>
          </Stack>

          <Stack direction="column" spacing="2">
            <Heading as="h1" size="lg">
              {htmlDecode(name)}
            </Heading>
            <Flex direction="column" justify="space-between">
              <Heading as="h2" py="4" size="md" mb="2">
                About this product
              </Heading>
              <Text fontWeight="regular" mr="1">
                {htmlParser(description)}
              </Text>
              <Divider mt={4} mb={4} />
            </Flex>

            <Text><b>Color:</b> {selectedColor}</Text>
                <Stack direction="row">
                  <ul>
                    {(colorOptions.length > 1) ? 
                      colorOptions.map(color => (
                        <Tag 
                          key={"tag-" + color}
                          className='product__variant_tag'
                          onClick={() => setColor(color)}
                          variant='subtle'
                          ml={2}>
                          { color === selectedColor ? <TagLeftIcon boxSize='12px' as={FaCheck} /> : null }
                          <TagLabel>{color}</TagLabel>
                        </Tag>
                     )) :
                     <Text>...</Text>
                    }
                  </ul>
                </Stack>
            

            <Text><b>Size:</b> {selectedSize.toUpperCase()}</Text>
            {
              data.product?.variants ? 
              (
                <Stack direction="row">
                  <ul>
                    {
                      (sizeOptions.length > 1) ?
                        sizeOptions.map(size => (
                            <Tag
                              key={"tag-" + size}
                              className={
                                (inStockSizes.indexOf(size) > -1) ? 'product__variant_tag' : 'product__variant_tag--out'
                              }
                              onClick={() => setSize(size)} 
                              variant={size === selectedSize ? 'solid' : 'outline'}
                              ml={2}>
                                {size.toUpperCase()}
                            </Tag>
                        )) :
                        <Text>...</Text>
                    }
                  </ul>
                </Stack>
              ) : 
              <Text as="p" className="product__loading">...</Text>
            }

            <Flex direction="row">
            <Stack flex="1" direction="column">
              <Text as="b">Quantity:</Text>
              <Stack
                direction="column"
                spacing="4"
                divider={<StackDivider borderColor="gray.200" />}
              >
                  <Select variant='outline' placeholder='1'>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                    <option value='6'>6</option>
                    <option value='7'>7</option>
                    <option value='8'>8</option>
                    <option value='9'>9</option>
                    <option value='10'>9</option>
                  </Select>
                <Button
                  isLoading={(cartLoading === true) ? true : false}
                  onClick={() => {
                    setCartLoading(true);
                    setTimeout(() => {
                      toast({
                        title: 'Added to Cart',
                        description: `${data.product.name} - ${selectedColor} - ${selectedSize}`,
                        status: 'success',
                        duration: 4500,
                        isClosable: true,
                      })
                      setCartLoading(false);
                    }, 800)

                  }}
                  colorScheme='blue'
                  leftIcon={<FaShoppingCart />}>
                  Add to Cart
                </Button>
              </Stack>
            </Stack>
          </Flex>
          </Stack>
        </SimpleGrid>
      )}
    </>
  );
}
