import { useReducer } from 'react';
import { CalendarContainer, SIZE, FONTSIZE } from '@libs-components/Calendar';

type CalendarState = {
  size: string;
  current: string;
};

type CalendarAction =
  | { type: 'SET_SIZE'; payload: string }
  | { type: 'SET_CURRENT'; payload: string };

const initialState: CalendarState = {
  size: SIZE.BASE,
  current: new Date().toISOString().split('T')[0],
};

function calendarReducer(
  state: CalendarState,
  action: CalendarAction,
): CalendarState {
  switch (action.type) {
    case 'SET_SIZE':
      return { ...state, size: action.payload };
    case 'SET_CURRENT':
      return { ...state, current: action.payload };
    default:
      return state;
  }
}

export default function Calendar() {
  const [state, dispatch] = useReducer(calendarReducer, initialState);

  return (
    <div className="p-4 flex gap-4 border border-gray-300">
      <div className="flex-none w-[500px]">
        <p className="text-lg font-bold">Calendar</p>
        <div className="flex justify-center items-center p-4">
          <CalendarContainer size={state.size} current={state.current} />
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-4">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <p className="flex-none w-[100px]">Size：</p>
          <select
            className="mt-1 block w-full border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={state.size}
            onChange={(e) => {
              const selectedSize = e.target.value as SIZE;
              if (Object.values(SIZE).includes(selectedSize)) {
                dispatch({ type: 'SET_SIZE', payload: selectedSize });
              }
            }}
          >
            {Object.values(SIZE).map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <p className="flex-none w-[100px]">Current Date：</p>
          <input
            type="date"
            className="mt-1 block w-full border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={state.current}
            onChange={(e) =>
              dispatch({ type: 'SET_CURRENT', payload: e.target.value })
            }
          />
        </label>
      </div>
    </div>
  );
}
