import { fireEvent, render, screen, queryByAttribute, waitFor } from '@testing-library/react'
import { act } from 'react';
import '@testing-library/jest-dom'
import Game from "../Components/Game";
import Board from "../Components/Board";

test.skip('board has proper dimensions', async () => {
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

  const { container } = render(
    <Game
      board={{ width: board.width, height: board.height }}
      playerCoordinates={[{ x: startingPosition.x, y: startingPosition.y }]}
    />
  );

  //when    
  await act(async () => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'w', code: 'KeyW' }));
  });

  //then

  await waitFor(() => expect(screen.getByTitle(`x${startingPosition.x}y${startingPosition.y}`)).not.toHaveClass('player'), { timeout: 10000 })
  await waitFor(() => expect(screen.getByTitle(`x${startingPosition.x}y${(startingPosition.y - 1)}`)).toHaveClass('player'), { timeout: 10000 })
})

// test('player moves up on w click', async () => {
//   const getById = queryByAttribute.bind(null, 'id');
//   const {container} = render(<Game board={{width: 10, height: 10}}/>);
//   const field1 = container.getElementsByClassName('player')[0].id;
//   await act(async () => {
//     window.dispatchEvent(new KeyboardEvent('keydown', {key: 'w', code: 'keyW'}));
//   })
//   const field2 = container.getElementsByClassName('player')[0].id;
//   console.log(field1, field2);
//   expect(getById(container, field1)).not.toHaveClass('player');
//   expect(getById(container, field2)).toHaveClass('square player');
// })