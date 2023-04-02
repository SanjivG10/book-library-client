require('@testing-library/jest-dom/extend-expect')
require('react-dom/test-utils')
require('jest-localstorage-mock');

const mockCreateObjectURL = jest.fn();
global.URL.createObjectURL = mockCreateObjectURL;


const fetch = require("cross-fetch");

global.fetch = fetch;
