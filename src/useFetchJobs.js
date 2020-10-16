import { useReducer, useEffect } from "react";
import axios from "axios";

const ACTION = {
  MAKE_REQUEST: "make-request",
  GET_DATA: "get-data",
  ERROR: "error",
  UPADATE_HAS_NEXT_PAGE: "update_has_next_page",
};

const base_url =
  "https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json";

function reducer(state, action) {
  switch (action.type) {
    case ACTION.MAKE_REQUEST:
      return { loading: true, jobs: [] };
    case ACTION.GET_DATA:
      return { ...state, loading: false, jobs: action.payload.jobs };
    case ACTION.ERROR:
      return { ...state, loading: false, err: true, jobs: [] };
    case ACTION.UPADATE_HAS_NEXT_PAGE:
      return { ...state, hasNextPage: action.payload.hasNextPage };
    default:
      return state;
  }
}

const initialState = {
  jobs: [],
  loading: true,
};

export default function useFetchJobs(param, page) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const cancelToken1 = axios.CancelToken.source();
    dispatch({
      type: ACTION.MAKE_REQUEST,
    });
    axios
      .get(base_url, {
        cancelToken: cancelToken1.token,
        params: { markdown: true, page: page, ...param },
      })
      .then((res) => {
        dispatch({ type: ACTION.GET_DATA, payload: { jobs: res.data } });
      })
      .catch((e) => {
        if (axios.isCancel) return;
        dispatch({
          type: ACTION.ERROR,
          payload: { e: Error },
        });
      });

    const cancelToken2 = axios.CancelToken.source();
    axios
      .get(base_url, {
        cancelToken: cancelToken2.token,
        params: { markdown: true, page: page + 1, ...param },
      })
      .then((res) => {
        dispatch({
          type: ACTION.UPADATE_HAS_NEXT_PAGE,
          payload: { hasNextPage: res.data.length !== 0 },
        });
      })
      .catch((e) => {
        if (axios.isCancel) 
        return dispatch({
          type: ACTION.ERROR,
          payload: { e: Error },
        });
      });

    return () => {
      cancelToken1.cancel();
      cancelToken2.cancel();
    };
  }, [param, page]);

  return state;
}
