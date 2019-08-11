'use strict';

import Store from './store';
import sudoku from './sudoku';
import Lang from './language';

export {
  Store,
  sudoku,
  Lang,
};

export function isNumber(number) {
  return typeof(number) == 'number';
}
