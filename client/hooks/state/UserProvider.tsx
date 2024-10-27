import React, { createContext, useReducer, useContext } from 'react';

// Define the initial state and reducer function
const initialState = {
  username: 'johndoerocks',
  dailyExperience: 0,
  joinDate: '2021-01-01',
  email: 'johndoe@email.com',
  firstName: 'Shawn',
  lastName: 'Doe',
  caregiver: {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'janedoecares@email.com',
  },
  goals: [
    "Short-term Memory"
  ],
  skills: {
    shortTermMemory: 0.8, // Value from 0 to 1 representing progress
    concentration: 0.6,
    problemSolving: 0.7,
    numericalReasoning: 0.4,
    visualSpatial: 0.9,
  },
  statistics: {
    exercisesCompleted: 176,
    lifetimeXP: 1879,
    memoryLevel: 10,
    cognitiveLevel: 11,
    focusLevel: 100,
    netImprovement: '+10%',
  },
};

function reducer(state: any, action: { type: any; payload: any; }) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, ...action.payload };
    case 'INCREMENT_DAILY_EXPERIENCE':
      return { 
        ...state, 
        dailyExperience: state.dailyExperience + action.payload, 
        statistics : {
          ...state.statistics,
          exercisesCompleted: state.statistics.exercisesCompleted + 1,
          lifetimeXP: state.statistics.lifetimeXP + action.payload,
        }};
    case 'SET_CAREGIVER':
      return { ...state, caregiver: action.payload };
    case 'SET_GOALS':
      return { ...state, goals: action.payload };
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
}

// Create context
const UserContext = createContext<{
  state: typeof initialState;
  dispatch: React.Dispatch<{ type: any; payload: any }>;
}>({
  state: initialState,
  dispatch: () => null,
});

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);

// Provider component
import { ReactNode } from 'react';

export function UserProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}
