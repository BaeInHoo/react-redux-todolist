import axios from "axios";

// 액션 타입 정의

// 깃험 API 호출을 시작하는 것을 의미
export const GET_USERS_START = "redux-start/users/GET_USERS_START"; 

// Github API 호출에 대한 응답이 성공적으로 돌아온 경우
export const GET_USERS_SUCCESS = "redux-start/users/GET_USERS_SUCCESS";  

// Github API 호출에 대한 응답이 실패한 경우
export const GET_USERS_FAIL = "redux-start/users/GET_USERS_FAIL";

// redux-promise-middleware
const GET_USERS = 'redux-start/users/GET_USERS';

export const GET_USERS_PENDING = 'redux-start/users/GET_USERS_PENDING';
export const GET_USERS_FULFILLED = 'redux-start/users/GET_USERS_FULFILLED';
export const GET_USERS_REJECTED = 'redux-start/users/GET_USERS_REJECTED';

// 액션 생성 함수
export function getUsersStart() {
  return {
    type: GET_USERS_START,
  }
}

export function getUsersSuccess(data) {
  return {
    type: GET_USERS_SUCCESS,
    data,
  }
}

export function getUsersFail(error) {
  return {
    type: GET_USERS_FAIL,
    error,
  }
}
// 초기값
const initialState = {
  loading: false,
  data: [],
  error: null,
};

// 리듀서
export default function users(state = initialState, action) {
  if (action.type === GET_USERS_START || action.type === GET_USERS_PENDING) {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }

  if (action.type === GET_USERS_SUCCESS) {
    return {
      ...state,
      loading: false,
      data: action.data,
    };
  }

  if (action.type === GET_USERS_FULFILLED) {
    return {
      ...state,
      loading: false,
      data: action.paylaod,
    };
  }

  if (action.type === GET_USERS_FAIL) {
    return {
      ...state,
      loading: false,
      error: action.GET_USERS_FAIL,
    };
  }

  if (action.type === GET_USERS_REJECTED) {
    return {
      ...state,
      loading: false,
      error: action.PAYLOAD,
    };
  }

  return state;
} 

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

// redux-thunk
export function getUsersThunk() {
  return (async (dispatch, getState, { history }) => {
    try {
      console.log(history);
      dispatch(getUsersStart());  
      // sleep
      await sleep(2000);
      const res = await axios.get('https://api.github.com/users');
      dispatch(getUsersSuccess(res.data));
      history.push("/");
    } catch (err) {
      dispatch(getUsersFail(err));
    }
  });
}

// redux-promise-middleware
export function getUsersPromise() {
  return {
    type: GET_USERS,
    payload: async () => {
      const res = await axios.get('https://api.github.com/users');
      return res.data;
    }
  }
}