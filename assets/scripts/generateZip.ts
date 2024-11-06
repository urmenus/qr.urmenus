import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import type { Label } from 'konva/lib/shapes/Label'

const getArrayForTables = (max: number): string[] => {
  return Array.from({ length: max }, (_, index) => (index + 1).toString().padStart(2, '0'))
}

// Function to create a zip file
export const createZip = async (card: Label, max: number) => {
  const zip = new JSZip()
  const cardFolder = zip.folder('cards')

  getArrayForTables(max).forEach(async (table) => {
    if (!cardFolder) return
    // @ts-ignore
    card.children[5].children[1].textArr[0].text = table
    // const dataURL = card.toDataURL({ pixelRatio: 3 })
    const imgBlob = (await card.toBlob({ pixelRatio: 3 })) as Promise<Blob>
    // const imgData = await fetch(dataURL)
    // const imgBlob = await imgData.blob()
    // cardFolder.file(`${table}.png`, imgBlob)
    zip.file(`${table}.png`, imgBlob, { dir: true })
    // zip.forEach((path, file) => {
    //   console.log('path: ', path)
    //   console.log('file: ', file)
    //   console.log('````````````````````````````')
    // })
  })

  console.log(zip)

  // Generate the zip file
  try {
    const zipContent = await zip.generateAsync({ type: 'blob' })

    // Use FileSaver.js to save the zip file
    saveAs(zipContent, 'menus_generated_cards.zip')
  } catch (error) {
    console.error('Error generating ZIP file:', error)
  }
}
