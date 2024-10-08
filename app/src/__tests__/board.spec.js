import { fireEvent, render, screen, queryByAttribute, waitFor } from '@testing-library/react'
import { act } from 'react';
import '@testing-library/jest-dom'
import Game from "../Components/Game";
import Board from "../Components/Board";

test('board has proper dimensions', async () => {
  //GIVEN
  const width = 10;
  const height = 10;
  // WHEN
  render(<Board width={width} height={height} playerCoordinates={[{ x: 3, y: 5 }]} point={{ x: 8, y: 2 }} />);
  // THEN
  const fields = await screen.findAllByTestId('square');
  const rows = await screen.findAllByTestId('row');
  expect(fields.length).toBe(100);
  expect(rows.length).toBe(height);
});


test('1) player moves up on w click', async () => {
  //given
  const board = { width: 10, height: 10 }
  const startingPosition = { x: 5, y: 5 }

  //when
  render(<Game board={board} playerCoordinates={[startingPosition]} />);
  fireEvent.keyDown(document, { key: 'w', code: 'keyW' });

  //then
  await waitFor(() => {
    expect(screen.getByTitle(`x${startingPosition.x}y${startingPosition.y}`)).not.toHaveClass('bg-yellow');
  });

  await waitFor(() => {
    expect(screen.getByTitle(`x${startingPosition.x}y${startingPosition.y - 1}`)).toHaveClass('bg-yellow');
  });

//then

await waitFor(() => expect(screen.getByTitle(`x${startingPosition.x}y${startingPosition.y}`)).not.toHaveClass('bg-yellow'))
await waitFor(() => expect(screen.getByTitle(`x${startingPosition.x}y${(startingPosition.y - 1)}`)).toHaveClass('bg-yellow'))
})

test('1) player moves down on s click', async () => {
  //given
  const board = { width: 10, height: 10 }
  const startingPosition = { x: 5, y: 5 }

  const { container } = render(
    <Game
      board={{ width: board.width, height: board.height }}
      playerCoordinates={[{ x: startingPosition.x, y: startingPosition.y }]}
    />
  );

  //when    
  fireEvent.keyDown(document, { key: 's', code: 'keyS' });

  //then

  await waitFor(() => expect(screen.getByTitle(`x${startingPosition.x}y${startingPosition.y}`)).not.toHaveClass('bg-yellow'))
  await waitFor(() => expect(screen.getByTitle(`x${startingPosition.x}y${(startingPosition.y + 1)}`)).toHaveClass('bg-yellow'))
})

test('1) player moves rught on d click', async () => {
  //given
  const board = { width: 10, height: 10 }
  const startingPosition = { x: 5, y: 5 }

  const { container } = render(
    <Game
      board={{ width: board.width, height: board.height }}
      playerCoordinates={[{ x: startingPosition.x, y: startingPosition.y }]}
    />
  );

  //when    
  fireEvent.keyDown(document, { key: 'd', code: 'keyD' });

  //then

  await waitFor(() => expect(screen.getByTitle(`x${startingPosition.x}y${startingPosition.y}`)).not.toHaveClass('bg-yellow'))
  await waitFor(() => expect(screen.getByTitle(`x${startingPosition.x + 1}y${(startingPosition.y)}`)).toHaveClass('bg-yellow'))
})

test('1) player moves left on a click', async () => {
  //given
  const board = { width: 10, height: 10 }
  const startingPosition = { x: 5, y: 5 }

  const { container } = render(
    <Game
      board={{ width: board.width, height: board.height }}
      playerCoordinates={[{ x: startingPosition.x, y: startingPosition.y }]}
    />
  );

  //when    
  fireEvent.keyDown(document, { key: 'a', code: 'keyA' });

  //then

  await waitFor(() => expect(screen.getByTitle(`x${startingPosition.x}y${startingPosition.y}`)).not.toHaveClass('bg-yellow'))
  await waitFor(() => expect(screen.getByTitle(`x${startingPosition.x - 1}y${(startingPosition.y)}`)).toHaveClass('bg-yellow'))
})

test("player cant go beyond the board's upper edge", async () => {
  const width = 10;
  const height = 10;
  render(<Board width={width} height={height} playerCoordinates={[{x: 5, y: 0}]} point={{x: 2, y: 2}} />)
  fireEvent.keyDown(document, { key: 'w', code: 'keyW' });
  await waitFor(() => expect(screen.getByTitle(`x${5}y${0}`)).toHaveClass('bg-yellow'));
})

test("player cant go beyond the board's bottom edge", async () => {
  const width = 10;
  const height = 10;
  render(<Board width={width} height={height} playerCoordinates={[{x: 5, y: 9}]} point={{x: 2, y: 2}} />)
  fireEvent.keyDown(document, { key: 's', code: 'keyS' });
  await waitFor(() => expect(screen.getByTitle(`x${5}y${9}`)).toHaveClass('bg-yellow'));
})

test("player cant go beyond the board's right edge", async () => {
  const width = 10;
  const height = 10;
  render(<Board width={width} height={height} playerCoordinates={[{x: 9, y: 5}]} point={{x: 2, y: 2}} />)
  fireEvent.keyDown(document, { key: 'd', code: 'keyD' });
  await waitFor(() => expect(screen.getByTitle(`x${9}y${5}`)).toHaveClass('bg-yellow'));
})

test("player cant go beyond the board's left edge", async () => {
  const width = 10;
  const height = 10;
  render(<Board width={width} height={height} playerCoordinates={[{x: 0, y: 5}]} point={{x: 2, y: 2}} />)
  fireEvent.keyDown(document, { key: 'a', code: 'keyA' });
  await waitFor(() => expect(screen.getByTitle(`x${0}y${5}`)).toHaveClass('bg-yellow'));
})

test("player can go back to his previous position without the game ending when its length is 1", async () => {
  const width = 10;
  const height = 10;
  const startingPosition = { x: 5, y: 5 }
  render(<Board width={width} height={height} playerCoordinates={[{x: startingPosition.x, y: startingPosition.y}]} point={{x: 2, y: 2}} />)
  fireEvent.keyDown(document, { key: 'w', code: 'keyW' });
  fireEvent.keyDown(document, { key: 's', code: 'keyS' });
  await waitFor(() => expect(screen.getByTitle(`x${startingPosition.x}y${startingPosition.y - 1}`)).not.toHaveClass('bg-yellow'))
  await waitFor(() => expect(screen.getByTitle(`x${startingPosition.x}y${(startingPosition.y)}`)).toHaveClass('bg-yellow'))
  
})