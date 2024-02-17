import { encode as blurhashEncode } from "blurhash"

const resolution = 180
const size = ({ width, height }: { width: number, height: number }) =>
  [resolution, resolution * (height / width)]

export const loadImage = async (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = (...args) => reject(args)
    image.src = src
  })

const getImageData = (image: HTMLImageElement, width: number, height: number) => {
  const canvas = document.createElement("canvas")
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext("2d")
  if (!context) throw new Error("Could not get 2d context")
  context.drawImage(image, 0, 0, width, height)
  return context.getImageData(0, 0, width, height).data
}

export const encode = async (src: string, componentX: number, componentY: number) => {
  const image = await loadImage(src)
  const [width, height] = size(image)
  const data = getImageData(image, width, height)
  return blurhashEncode(
    data,
    width, height,
    componentX, componentY,
  )
}
