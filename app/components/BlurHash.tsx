import { useEffect, useState } from 'react'
import { Avatar, Heading, TextField, Text, Flex, Link, TextArea, Box } from '@radix-ui/themes'
import { FontNotoSansMono } from '@/app/internal/fonts'
import { encode, loadImage } from '@/app/internal/blurhash'
import { styled } from '@stitches/react'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import { Blurhash } from 'react-blurhash'
import { isBlurhashValid } from 'blurhash'

export default () => {
  const [imageURL, setImageURL] = useState<string>()
  const [imageWidth, setImageWidth] = useState<number>()
  const [imageHeight, setImageHeight] = useState<number>()
  const [componentX, setComponentX] = useState('5')
  const [componentY, setComponentY] = useState('5')
  const [blurhash, setBlurhash] = useState('')
  useEffect(() => {
    if (imageURL === undefined) return
    const x = Number(componentX)
    const y = Number(componentY)
    if (x >= 1 && x <= 9 && y >= 1 && y <= 9) {
      encode(imageURL, x, y).then(setBlurhash)
      return
    }
    setBlurhash('Component size must be between 1 and 9.')
  }, [imageURL, componentX, componentY])
  return (
    <Flex direction='column' m='3' gap='5' align='center' style={{ width: '80vw' }}>
      <Heading style={{ ...FontNotoSansMono }}>BlurHash</Heading>
      <Flex gap='3' align='center' justify='center' width='100%'>
        <Link onClick={() => {
          const input = document.createElement('input')
          input.type = 'file'
          input.accept = 'image/*'
          input.onchange = () => {
            const file = input.files?.[0]
            if (!file) return
            if (imageURL !== undefined) URL.revokeObjectURL(imageURL)
            const newImageURL = URL.createObjectURL(file)
            setImageURL(newImageURL)
            loadImage(newImageURL).then(image => {
              setImageWidth(image.width)
              setImageHeight(image.height)
            })
          }
          input.click()
        }}>
          <LinkAvatar radius='none' src={imageURL} fallback='Select Image' style={{
            ...FontNotoSansMono,
            width: 150,
            height: imageWidth && imageHeight ? (
              150 * imageHeight / imageWidth
            ) : 150,
            padding: 5,
          }} />
        </Link>
        <Box>
          <ArrowRightIcon />
        </Box>
        <TextArea size='3' value={blurhash} placeholder={
          'Select an image to generate the blurhash or input a blurhash here to preview.'
        } onChange={e => {
          setImageURL(undefined)
          setBlurhash(e.target.value)
        }} style={{
          width: '100%',
        }} />
        <Box>
          <ArrowRightIcon />
        </Box>
        <Avatar radius='none' size='9' fallback={
          isBlurhashValid(blurhash).result ? (
            <Blurhash width='100%' height='100%' resolutionX={32} resolutionY={32} hash={
              blurhash
            } />
          ) : 'Blurhash Preview'
        } style={{
          ...FontNotoSansMono,
        }} />
      </Flex>
      <Flex gap='3'>
        <Text style={{ whiteSpace: 'nowrap' }}>Component Size:</Text>
        <TextField.Root>
          <TextField.Input value={componentX} style={{
            ...FontNotoSansMono,
          }} onChange={
            e => setComponentX(e.target.value)
          } />
        </TextField.Root>
        <Text>x</Text>
        <TextField.Root>
          <TextField.Input value={componentY} style={{
            ...FontNotoSansMono,
          }} onChange={
            e => setComponentY(e.target.value)
          } />
        </TextField.Root>
      </Flex>
    </Flex >
  )
}

const LinkAvatar = styled(Avatar, {
  backgroundColor: 'var(--accent-a3)',
  '&:hover': {
    backgroundColor: 'var(--accent-a4)',
  },
  '&:active': {
    backgroundColor: 'var(--accent-a5)',
  },
})
