// 엑션 타입 정의
const SHOW_ALL = 'redux-start/filter/SHOW_ALL';
const SHOW_COMPLETE = 'redux-start/filter/SHOW_COMPLETE';

// 엑션 생성 합수
export function showAll() {
  return { type: SHOW_ALL };
}

export function showComplete() {
  return { type: SHOW_COMPLETE };
}

// 초기값
const initialState = 'ALL';

// 리듀서
export default function filter(previousState = initialState, action) {
  // 초기값을 설정해주는 부분
  
  if (action.type === SHOW_COMPLETE) {
    return "COMPLETE";
  }
  
 
  if (action.type === SHOW_ALL) {
    return "ALL";
  }
  

  return previousState;
}