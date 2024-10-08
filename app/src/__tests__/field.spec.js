import { render, screen, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom'
import Field from '../Components/Field';


test('div with class square has also class player', () => {
  render(<Field x={0} y={0} hasPlayer={true} hasPoint={false} />);
  const divElement = screen.getByTestId('square');
  expect(divElement).toHaveClass('bg-yellow');
});

test('div with class square has also class point', () => {
  render(<Field x={0} y={0} hasPlayer={false} hasPoint={true} />);
  const divElement = screen.getByTestId('square');
  expect(divElement).toHaveClass('bg-green');
})

test('div with class square has class player and point', () => {
  render(<Field x={0} y={0} hasPlayer={true} hasPoint={true} />);
  const divElement = screen.getByTestId('square');
  expect(divElement).toHaveClass('bg-green');
  expect(divElement).toHaveClass('bg-yellow');
})

test("div with class square doesn't have class player or point", () => {
  render(<Field x={0} y={0} hasPlayer={false} hasPoint={false} />);
  const divElement = screen.getByTestId('square');
  expect(divElement).not.toHaveClass('bg-green');
  expect(divElement).not.toHaveClass('bg-yellow');
})
