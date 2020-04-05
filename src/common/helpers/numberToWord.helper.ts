const words = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];

export const numberToWord = (n: number) => (n > 0 && n < 11 ? words[n] : '');
