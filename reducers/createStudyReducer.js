import * as actionTypes from 'src/actions';

const initialState = {
  // persist this one until create study is complete or dismount from create study component
  formBasicInfo: {
    title: '',
    description: '',
    study_url: '',
    requiredParticipants: '',
    duration: '',
    minDuration: '',
    reward: '',
    studyGroupType: 'ONLINE_SURVEY',
    studyType: '',
    screeningType: '',
    deviceTypes: ['Android', 'Web', 'IOS'],
  },
  dailyQuestions: [],
  whitelists: [],
  codes: [],
  formCriteria: {
    Gender: [],
    Age: [18, 35],
    MaritalStatus: [],
    Religion: [],
    JobStatus: [],
    Nationality: [],
    Domicile: [],
    Occupation: [],
    JobDepartmen: [],
    CompanyField: [],
    CompanyType: [],
    WorkHour: [],
    WorkingHoursInAWeek: [],
    WorkingPreferenceInCompany: [],
    WorkingPeriodInCurrentCompany: [],
    UsingTransportation: [],
    HighestEducation: [],
    NativeLanguage: [],
    NumberOfSiblings: [],
    NumberOfChildren: [],
    ResidenceType: [],
    MonthlyIncome: [],
    MonthlyExpenses: [],
    Car: [],
    Motorcycle: [],
    CreditCard: [],
    EWallet: [],
    PhoneBrand: [],
    HouseholdIncome: [],
    Smoking: [],
    ECigarette: [],
    Glasses: [],
    Hijab: [],
    Pet: [],
    SocialMedia: [],
    WorkoutFrequency: [],
    Sports: [],
    DominantHand: [],
    Ecommerce: [],
    EcommerceActivity: [],
    EcommerceActivityMultiple: [],
    MonthlyPersonalExpenses: [],
    NumberOfFamilyMember: [],
  },
  isEditingStudy: null,
  quotaObjects: [],
  portraits: [],
  selectedPortrait: null,
};

const studyReducer = (state = initialState, actions) => {
  const { payload, type } = actions;
  switch (type) {
    case actionTypes.SET_BASIC_INFO:
      return {
        ...state,
        formBasicInfo: {
          ...payload,
        },
      };
    case actionTypes.SET_DAILY_QUESTIONS:
      return {
        ...state,
        dailyQuestions: [...payload],
      };
    case actionTypes.SET_WHITELIST:
      return {
        ...state,
        whitelists: [...payload],
      };
    case actionTypes.SET_CODE:
      return {
        ...state,
        codes: [...payload],
      };
    case actionTypes.UPDATE_STUDY_BASIC_INFO:
      return {
        ...state,
        formBasicInfo: {
          ...state.formBasicInfo,
          [actions.name]: payload,
        },
      };
    case actionTypes.CHANGE_FORM_CRITERIA:
      return {
        ...state,
        formCriteria: {
          ...state.formCriteria,
          [actions.name]: payload,
        },
      };
    case actionTypes.RESET_CHANGE:
      return initialState;
    case actionTypes.SAVE_STUDY_INFO:
      return {
        ...state,
        formBasicInfo: {
          ...state.formBasicInfo,
          ...payload,
        },
      };
    case actionTypes.EDIT_STUDY:
      return {
        ...state,
        isEditingStudy: payload,
      };
    case actionTypes.ADD_QUOTA:
    case actionTypes.REMOVE_QUOTA:
      return {
        ...state,
        quotaObjects: payload,
      };
    case actionTypes.SET_BASIC_INFO_SNAPSHOT: {
      return {
        ...state,
        formBasicInfoSnapshot: {
          ...state.formBasicInfoSnapshot,
          required_participant: payload,
        },
      };
    }
    case actionTypes.ADD_PORTRAIT: {
      return {
        ...state,
        portraits: [...state.portraits, payload],
      };
    }
    case actionTypes.EDIT_PORTRAIT: {
      return {
        ...state,
        selectedPortrait: payload,
      };
    }
    case actionTypes.UPDATE_CRITERIA: {
      const allPortraits = [...state.portraits];
      allPortraits[payload.id].criteria = payload.data;

      return {
        ...state,
        portraits: allPortraits,
      };
    }
    case actionTypes.UPDATE_QUOTA: {
      const newQuota = [...state.portraits];
      newQuota[payload.id].criteriaQuota = {
        ...newQuota[payload.id].criteriaQuota,
        [payload.label]: payload.data,
      };
      return {
        ...state,
        portraits: newQuota,
      };
    }
    case actionTypes.REMOVE_PORTRAIT: {
      const newPortraits = [...state.portraits];
      newPortraits.splice(payload, 1);

      return {
        ...state,
        portraits: newPortraits,
      };
    }
    case actionTypes.UPDATE_PORTRAIT: {
      const allPortraits = [...state.portraits];
      allPortraits[payload.index] = payload.data;

      return {
        ...state,
        portraits: allPortraits,
      };
    }
    case actionTypes.REMOVE_PORTRAIT_QUOTA: {
      const newPortraits = [...state.portraits];
      delete newPortraits[payload.index].criteriaQuota[payload.label];

      return {
        ...state,
        portraits: newPortraits,
      };
    }
    case actionTypes.RESET_PORTRAIT: {
      return {
        ...state,
        portraits: [],
      };
    }
    default:
      return state;
  }
};

export default studyReducer;
