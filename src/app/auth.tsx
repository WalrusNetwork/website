import React, { createContext, useReducer, useEffect } from "react";

interface IState {
  isAuthenticated: boolean;
  isAdmin: boolean;
  user: any;
}

interface IContextProps {
  state: IState;
  dispatch: any;
}

const initialState: IState = {
  isAuthenticated: false,
  isAdmin: false,
  user: null,
};

export const AuthContext = createContext({} as IContextProps);

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        isAuthenticated: true,
        isAdmin:
          action.payload &&
          action.payload.apiPermissions.includes("api.mutation.*"),
        user: action.payload,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        isAdmin: false,
        user: null,
      };
    default:
      return state;
  }
};

export default function Auth(props: any) {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    let user;

    try {
      user = localStorage.getItem("user");
      if (user == null || undefined) {
        return;
      }

      dispatch({
        type: "LOGIN",
        payload: JSON.parse(user),
      });
    } catch (error) {}
  }, [props]);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
