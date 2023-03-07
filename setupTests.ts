import '@testing-library/jest-dom/extend-expect';
import 'core-js';

global.URL.createObjectURL = jest.fn();
global.URL.revokeObjectURL = jest.fn();
global.window === global;

global.scrollTo = jest.fn();
