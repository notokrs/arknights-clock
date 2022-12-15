import {Box, Image, Link, Text} from '@chakra-ui/react';

function Info() {
  return (
    <Box id="info" mb={3}>
      <Box className="info-child" id="github-info">
        <Image
          src="./assets/img/icon/github.png"
          alt="github logo"
          boxSize="45px"
        />
        <Box ml={3}>
          <Text className="body" fontWeight={600}>
            Github
          </Text>
          <Link href="https://github.com/notokrs" className="body" isExternal>
            https://github.com/notokrs
          </Link>
        </Box>
      </Box>
      <Box className="info-child" id="fb-info" mb={2}>
        <Image
          src="./assets/img/icon/fb.png"
          alt="github logo"
          boxSize="45px"
        />
        <Box ml={3}>
          <Text className="body" fontWeight={600}>
            Facebook
          </Text>
          <Link
            href="https://facebook.com/rusnoto098"
            className="body"
            isExternal
          >
            https://facebook.com/rusnoto098
          </Link>
        </Box>
      </Box>
      <Box>
        <Text className="title" fontSize="22px">
          Thanks To
        </Text>
        <hr></hr>
        <Box className="info-child" mt={2} display="block">
          <Link
            href="https://facebook.com/ufalsalman0"
            className="body"
            fontWeight={600}
            mb={1}
            isExternal
          >
            Ufal Salman
          </Link>
          <Text className="body" fontSize="12px">
            Thanks for translating lore to Bahasa Indonesia.
          </Text>
        </Box>
        <Box className="info-child" mt={2} display="block">
          <Link
            href="https://aceship.github.io/AN-EN-Tags/index.html"
            className="body"
            fontWeight={600}
            mb={1}
            isExternal
          >
            Arknights Toolbox
          </Link>
          <Text className="body" fontSize="12px">
            Thanks for providing in game arts.
          </Text>
        </Box>
        <Box className="info-child" mt={2} display="block">
          <Link
            href="https://arknights.fandom.com/"
            className="body"
            fontWeight={600}
            mb={1}
            isExternal
          >
            Arknights Wiki
          </Link>
          <Text className="body" fontSize="12px">
            Thanks for providing arknights lore.
          </Text>
        </Box>
        <Text className="body" fontSize="12px" mt={2} color="gray.500">
          All arts credit to artist and Hypergriph.
        </Text>
      </Box>
    </Box>
  );
}

export default Info;
