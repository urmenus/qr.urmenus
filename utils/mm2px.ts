export default (value: number | string): number => {
  // Regular expression to match valid number formats, including integers and decimals
  const regex = /^-?\d*\.?\d+$/

  // Check if the input is a string
  if (typeof value === 'string') {
    // Validate the string with regex
    if (!regex.test(value)) {
      throw new Error('Invalid input: Please provide a valid number or string representation of a number.')
    }
    // Convert to number
    value = parseFloat(value)
  }

  // Check if the value is NaN after conversion
  if (isNaN(value as number)) {
    throw new Error('Invalid input: Please provide a valid number.')
  }

  // Convert mm to px
  return (value as number) * 3.7795275591
}
