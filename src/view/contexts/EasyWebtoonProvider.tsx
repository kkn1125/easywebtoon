import { ReactElement, createContext, useReducer } from "react";
import { EasyWebtoon } from "../../easywebtoon/easy.webtoon";

const initailValue: { easywebtoon: EasyWebtoon } = {
  easywebtoon: new EasyWebtoon(),
};

const EasyWebtoonAction = {
  Load: "alert/load",
} as const;
type EasyWebtoonAction =
  (typeof EasyWebtoonAction)[keyof typeof EasyWebtoonAction];

export const EasyWebtoonContext = createContext(initailValue);
export const EasyWebtoonDispatchContext = createContext(
  (_: EasyWebtoonActionType) => {}
);

const reducer = (
  state: { easywebtoon: EasyWebtoon },
  action: EasyWebtoonActionType
) => {
  switch (action.type) {
    case EasyWebtoonAction.Load: {
      return {
        easywebtoon: action.easywebtoon,
      };
    }
    default: {
      return state;
    }
  }
};

function EasyWebtoonProvider({ children }: { children: ReactElement }) {
  const [state, dispatch] = useReducer(reducer, initailValue);
  return (
    <EasyWebtoonDispatchContext.Provider value={dispatch}>
      <EasyWebtoonContext.Provider value={state}>
        {children}
      </EasyWebtoonContext.Provider>
    </EasyWebtoonDispatchContext.Provider>
  );
}

export default EasyWebtoonProvider;
