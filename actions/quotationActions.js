export const SET_QUOTATION_BASIC_INFO = 'SET_QUOTATION_BASIC_INFO';
export const SET_QUOTATION_COST_INFO = 'SET_QUOTATION_COST_INFO';
export const CLEAR_QUOTATION = 'CLEAR_QUOTATION';

export const setQuotationBasicInfo = (payload) => {
  return (dispatch) => {
    dispatch({ type: SET_QUOTATION_BASIC_INFO, payload });
  };
};

export const setQuotationCostInfo = (payload) => {
  return (dispatch) => {
    dispatch({ type: SET_QUOTATION_COST_INFO, payload });
  };
};

export const resetQuotationInfo = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR_QUOTATION });
  };
};
