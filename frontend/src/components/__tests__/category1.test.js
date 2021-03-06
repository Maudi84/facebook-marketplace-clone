import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import {screen, waitFor} from '@testing-library/react';
import Category from '../Category';
import {setupServer} from 'msw/node';
import {rest} from 'msw';
import CategoryContext from '../CategoryContext';

const category = '/v0/listings/category';

const server = setupServer(
  rest.get(category, (req, res, ctx) => {
    return res(
      ctx.json([{names: 'Cars'}]));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const currCat = 'Vehicles';
const dimensions = {width: 500};
const subList = [{names: 'Cars'}];
const catList = [{names: 'Vehicles'}];
const setSub = jest.fn();
const setSearch = jest.fn();
const setCatList = jest.fn();
const setSubList = jest.fn();

test('category render', async () => {
  render(
    <CategoryContext.Provider value={{
      currCat, dimensions, subList, setSub, setSearch, setCatList,
      setSubList, catList,
    }}>
      <Category/>
    </CategoryContext.Provider>,
  );
  await new Promise((r) => setTimeout(r, 2000));
  await waitFor(() => screen.getByText('Cars'));
  fireEvent.click(screen.getByText('Cars'));
});

test('Handles Server Error', async () => {
  server.use(
    rest.get(category, (req, res, ctx) => {
      return res(ctx.status(404));
    }),
  );
  render(
    <CategoryContext.Provider value={{
      currCat, dimensions, subList, catList, setSub,
      setSearch, setCatList, setSubList,
    }}>
      <Category/>
    </CategoryContext.Provider>,
  );
  await new Promise((r) => setTimeout(r, 2000));
});
