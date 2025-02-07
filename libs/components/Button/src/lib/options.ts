export const options = {
  styles: {
    defaultStyle: { borderRadius: '5px' },
    variants: {
      default: { backgroundColor: 'blue', color: 'white' },
      secondary: { backgroundColor: 'gray', color: 'black' },
      danger: { backgroundColor: 'red', color: 'white' },
    },
  },
  attributes: {
    size: 'medium',
    options: [{ value: '0', label: 'Default Option' }],
  },
};
