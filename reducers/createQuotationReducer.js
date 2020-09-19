import * as actionTypes from 'src/actions';

const initialState = {
  formBasicInfo: {
    projectId: 0,
    projectTitle: '',
    projectType: '',
    projectObjective: '',
    termOfPayment: 0,
    numberOfStudy: 0,
    studyType: '',
    descriptionOfWork: '',
    quotationNumber: '',
    customerNumber: '',
    companyName: '',
    printedName: '',
    position: '',
    PICBD: '',
    projectLead: '',
  },
  formCostInfo: {
    quotationItem: [
      {
        name: '',
        qty: '',
        unitPrice: '',
      },
      {
        name: '',
        qty: '',
        unitPrice: '',
      },
      {
        name: '',
        qty: '',
        unitPrice: '',
      },
    ],
    additionalRemarks: '',
    discount: '',
    vat: '',
  },
};

const createQuotationReducer = (state = initialState, actions) => {
  const { payload, type } = actions;
  switch (type) {
    case actionTypes.SET_QUOTATION_BASIC_INFO:
      return {
        ...state,
        formBasicInfo: {
          ...payload,
        },
      };
    case actionTypes.SET_QUOTATION_COST_INFO:
      return {
        ...state,
        formCostInfo: {
          ...payload,
        },
      };
    case actionTypes.CLEAR_QUOTATION:
      return {
        ...state,
        formBasicInfo: {
          ...initialState.formBasicInfo,
          projectId: 0,
          projectTitle: '',
          projectType: '',
          projectObjective: '',
          quotationNumber: '',
        },
        formCostInfo: {
          ...initialState.formCostInfo,
        },
      };
    default:
      return state;
  }
};

export default createQuotationReducer;
