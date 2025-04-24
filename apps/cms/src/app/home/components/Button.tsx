import { useReducer } from 'react';
import { Button as CoreButton, SIZE, VARIANT } from '@libs-components/Button';

type ButtonState = {
  size: SIZE;
  variant: VARIANT;
  text: string;
};

type ButtonAction =
  | { type: 'SET_SIZE'; payload: SIZE }
  | { type: 'SET_VARIANT'; payload: VARIANT }
  | { type: 'SET_TEXT'; payload: string };

const initialState: ButtonState = {
  size: SIZE.MEDIUM,
  variant: VARIANT.PRIMARY,
  text: 'Click me',
};

function buttonReducer(state: ButtonState, action: ButtonAction): ButtonState {
  switch (action.type) {
    case 'SET_SIZE':
      return { ...state, size: action.payload };
    case 'SET_VARIANT':
      return { ...state, variant: action.payload };
    case 'SET_TEXT':
      return { ...state, text: action.payload };
    default:
      return state;
  }
}

export default function Button() {
  const [state, dispatch] = useReducer(buttonReducer, initialState);

  return (
    <div className="p-4 flex gap-4 border border-gray-300">
      <div className="flex-none w-[500px]">
        <p className="text-lg font-bold">Button</p>
        <div className="flex justify-center items-center p-4">
          <CoreButton variant={state.variant} size={state.size}>
            {state.text}
          </CoreButton>
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
          <p className="flex-none w-[100px]">Variant：</p>
          <select
            className="mt-1 block w-full border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={state.variant}
            onChange={(e) => {
              const selectedVariant = e.target.value as VARIANT;
              if (Object.values(VARIANT).includes(selectedVariant)) {
                dispatch({ type: 'SET_VARIANT', payload: selectedVariant });
              }
            }}
          >
            {Object.values(VARIANT).map((variant) => (
              <option key={variant} value={variant}>
                {variant}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <p className="flex-none w-[100px]">Button Text：</p>
          <input
            type="text"
            className="mt-1 block w-full border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={state.text}
            onChange={(e) =>
              dispatch({ type: 'SET_TEXT', payload: e.target.value })
            }
          />
        </label>
      </div>
    </div>
  );
}
