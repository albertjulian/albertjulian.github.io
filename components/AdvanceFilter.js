import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import {
  Dialog,
  DialogTitle as MuiDialogTitle,
  DialogActions,
  DialogContent,
  Typography,
  IconButton,
  Divider,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Box,
  FormHelperText,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/styles';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import PopButton from 'src/components/PopButton';
import {
  advanceFilterLogicOperators,
  FILTER_OPERATOR,
  DAILY_QUESTION,
} from 'src/utils/variables';
import { showSnackbar } from 'src/actions';

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    display: 'flex',
    alignItems: 'center',
  },
  closeButton: {
    padding: 0,
    marginRight: theme.spacing(1),
  },
  dialog: {
    width: '25% !important',
    left: '75% !important',
    [theme.breakpoints.down('md')]: {
      width: '50% !important',
      left: '50% !important',
    },
  },
  dialogContent: {
    padding: 0,
  },
  dialogActions: {
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
    display: 'block',
    '& .MuiButtonBase-root': {
      marginLeft: 0,
      '&:first-child': {
        marginBottom: 10,
      },
    },
  },
  filterHeaderContainer: {
    marginBottom: theme.spacing(2),
  },
  filterHeaderTitle: {
    padding: `0 ${theme.spacing(3)}px`,
  },
  filterHeaderData: {
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
    '& .MuiFormControl-root': {
      marginBottom: theme.spacing(1),
    },
  },
  filterList: {
    overflowY: 'auto',
    maxHeight: 'calc(100% - 330px)',
    minHeight: 200,
  },
  filterListItem: {
    padding: `${theme.spacing(1)}px ${theme.spacing(3)}px`,
  },
  closeButtonFilterItem: {
    padding: 0,
    float: 'right',
  },
  lastUpdate: {
    border: `1px solid ${theme.palette.warning.main}`,
    borderRadius: 4,
    marginLeft: 5,
    padding: '0 10px',
    backgroundColor: '#FFF5DC',
  },
  lastUpdateText: {
    color: '#828282',
    fontStyle: 'italic',
    marginLeft: 3,
  },
  lastUpdateIcon: {
    color: theme.palette.warning.main,
  },
  filterDataContainer: {
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#F2F2F2',
    border: '1px solid #E0E0E0',
    borderRadius: '4px',
  },
  filterDataList: {
    padding: '3px 0',
    color: '#828282',
  },
  filterDataListItem: {
    color: '#828282',
    fontStyle: 'italic',
  },
}));

const DialogTitle = ({ children, onClose, ...other }) => {
  const classes = useStyles();
  return (
    <MuiDialogTitle
      disableTypography
      className={classes.dialogTitle}
      {...other}
    >
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
          size="small"
        >
          <CloseIcon />
        </IconButton>
      ) : null}
      <Typography variant="h6">{children}</Typography>
    </MuiDialogTitle>
  );
};

const FilterHeader = ({
  type,
  title,
  filterOptions,
  onAddFilter,
  filterList,
}) => {
  const classes = useStyles();
  const refElem = useRef(null);
  const [menuItemWidth, setMenuItemWidth] = useState('100px');
  useEffect(() => {
    if (refElem.current) {
      setMenuItemWidth(refElem.current.offsetWidth);
    }
  }, [refElem.current]);

  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [answers, setAnswers] = useState([]);
  const [operators, setOperators] = useState([]);
  useEffect(() => {
    const question = filterOptions.find(
      (filter) => filter.question === selectedQuestion,
    );
    if (question) {
      setOperators(advanceFilterLogicOperators[question.type]);
      setAnswers(question.answers);
    }
  }, [selectedQuestion, filterOptions]);

  const questionPlaceholder =
    type === 'RESULT' ? 'Select Screening' : 'Select Question';
  const answerPlaceholder =
    type === 'RESULT' ? 'Select Criteria' : 'Select Options';
  return (
    <div className={classes.filterHeaderContainer}>
      <div className={classes.filterHeaderTitle}>
        <Typography variant="h5">{title}</Typography>
      </div>
      <div className={classes.filterHeaderData}>
        <Formik
          initialValues={{ question: '', operator: '', answers: [] }}
          validationSchema={Yup.object().shape({
            question: Yup.string().required(
              `${type === 'RESULT' ? 'Screening' : 'Question'} cannot be empty`,
            ),
            operator: Yup.string().required('Operator cannot be empty'),
            answers: Yup.array().min(
              1,
              `${type === 'RESULT' ? 'Criteria' : 'Options'} cannot be empty`,
            ),
          })}
          onSubmit={(values, { resetForm }) => {
            onAddFilter(values);
            resetForm();
            setSelectedQuestion();
            setOperators([]);
            setAnswers([]);
          }}
        >
          {({ values, handleSubmit, setFieldValue, errors, touched }) => {
            const _handleChangeQuestion = ({ target }) => {
              setSelectedQuestion(target.value);
              setFieldValue('question', target.value);
              setFieldValue('answers', []);
            };

            const _handleChangeOperator = ({ target }) => {
              setFieldValue('operator', target.value);
            };

            const _handleChangeAnswer = (event, value) => {
              setFieldValue('answers', value);
            };

            return (
              <>
                <FormControl
                  fullWidth
                  variant="outlined"
                  error={
                    !!(touched && touched.question && errors && errors.question)
                  }
                >
                  <Select
                    value={values.question}
                    onChange={_handleChangeQuestion}
                    ref={refElem}
                    autoWidth
                    style={{
                      color: !values.question && 'grey',
                    }}
                    displayEmpty
                    renderValue={(val) => val || questionPlaceholder}
                  >
                    {(!filterOptions || filterOptions.length === 0) && (
                      <MenuItem
                        value=""
                        style={{ width: menuItemWidth }}
                        disabled
                      >
                        No Options
                      </MenuItem>
                    )}
                    {filterOptions &&
                      Array.isArray(filterOptions) &&
                      filterOptions.map((filterOption) => (
                        <MenuItem
                          disabled={filterList.find(
                            (filter) =>
                              filter.question === filterOption.question,
                          )}
                          key={filterOption.question}
                          value={filterOption.question}
                          style={{ width: menuItemWidth, whiteSpace: 'normal' }}
                        >
                          {filterOption.question}
                        </MenuItem>
                      ))}
                  </Select>
                  {!!(
                    touched &&
                    touched.question &&
                    errors &&
                    errors.question
                  ) && <FormHelperText>{errors.question}</FormHelperText>}
                </FormControl>
                <FormControl
                  fullWidth
                  variant="outlined"
                  error={
                    !!(touched && touched.operator && errors && errors.operator)
                  }
                >
                  <Select
                    value={values.operator}
                    onChange={_handleChangeOperator}
                    ref={refElem}
                    autoWidth
                    style={{
                      color: !values.operator && 'grey',
                    }}
                    displayEmpty
                    renderValue={(val) =>
                      FILTER_OPERATOR[val] || 'Select Operator'
                    }
                  >
                    {(!operators || operators.length === 0) && (
                      <MenuItem
                        value=""
                        style={{ width: menuItemWidth }}
                        disabled
                      >
                        No Options
                      </MenuItem>
                    )}
                    {operators &&
                      operators.map((opt) => (
                        <MenuItem
                          key={opt.key}
                          value={opt.key}
                          style={{ width: menuItemWidth, whiteSpace: 'normal' }}
                        >
                          {opt.value}
                        </MenuItem>
                      ))}
                  </Select>
                  {!!(
                    touched &&
                    touched.operator &&
                    errors &&
                    errors.operator
                  ) && <FormHelperText>{errors.operator}</FormHelperText>}
                </FormControl>
                <Autocomplete
                  multiple
                  disableCloseOnSelect
                  options={answers}
                  getOptionLabel={(option) => option}
                  value={values.answers}
                  filterSelectedOptions
                  onChange={_handleChangeAnswer}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={
                        !!(
                          touched &&
                          touched.answers &&
                          errors &&
                          errors.answers
                        )
                      }
                      helperText={
                        touched && touched.answers && errors && errors.answers
                      }
                      variant="outlined"
                      placeholder={
                        values.answers.length === 0 ? answerPlaceholder : ''
                      }
                    />
                  )}
                />
                <PopButton
                  color="warning"
                  variant="contained"
                  fullWidth
                  onClick={handleSubmit}
                >
                  Add Filter
                </PopButton>
              </>
            );
          }}
        </Formik>
      </div>
      <Divider />
    </div>
  );
};

const FilterList = ({ items, onDeleteItem }) => {
  const classes = useStyles();

  const _handleDeleteItem = (index) => {
    // TODO : Change index with some key
    onDeleteItem(index);
  };

  return (
    <div className={classes.filterList}>
      {items &&
        Array.isArray(items) &&
        items.map((filter, filterIdx) => (
          <div key={filterIdx}>
            <div className={classes.filterListItem}>
              <IconButton
                aria-label="close"
                className={classes.closeButtonFilterItem}
                onClick={() => _handleDeleteItem(filterIdx)}
                size="small"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h5">{filter.question}</Typography>
              <Typography variant="body1" style={{ padding: '2px 0' }}>
                {FILTER_OPERATOR[filter.operator]} :
              </Typography>
              <ul style={{ paddingLeft: '16px' }}>
                {filter.answers &&
                  Array.isArray(filter.answers) &&
                  filter.answers.map((answer, answerIdx) => (
                    <li key={answerIdx} style={{ padding: '3px 0' }}>
                      <Typography>{answer}</Typography>
                    </li>
                  ))}
              </ul>
            </div>
            <Divider />
          </div>
        ))}
    </div>
  );
};

const AdvanceFilterDialog = ({
  type,
  open,
  onClose,
  title,
  filterOptions,
  onApplyFilters,
  filteredData,
  minSelectedQuestion,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [filterList, setFilterList] = useState([]);
  const [isApplyFilters, setIsApplyFilters] = useState(false);

  const _handleAddFilter = (newFilter) => {
    const existingQuestion = filterList.find(
      (filter) => filter.question === newFilter.question,
    );
    if (!existingQuestion) {
      setFilterList((prevState) => [...prevState, newFilter]);
    } else {
      dispatch(
        showSnackbar('Cannot add duplicate question.', 'error', {
          vertical: 'bottom',
          horizontal: 'center',
        }),
      );
    }
  };

  const _handleDeleteFilterData = (index) => {
    const filterListTmp = [...filterList];
    filterListTmp.splice(index, 1);
    setFilterList(filterListTmp);
  };

  const _handleDeleteAllFilterData = () => {
    setFilterList([]);
  };

  const _handleApplyFilters = async () => {
    if (minSelectedQuestion && minSelectedQuestion > filterList.length) {
      const questionPlaceholder = type === 'RESULT' ? 'screening' : 'question';
      dispatch(
        showSnackbar(
          `Cannot apply filter. Please add minimum ${minSelectedQuestion} ${questionPlaceholder}`,
          'error',
          {
            vertical: 'bottom',
            horizontal: 'center',
          },
        ),
      );
      return;
    }

    setIsApplyFilters(true);
    await onApplyFilters(filterList);
    setIsApplyFilters(false);
    onClose();
  };

  useEffect(() => {
    let isCancelled = false;

    if (
      filteredData &&
      Array.isArray(filteredData) &&
      filteredData.length > 0 &&
      !isCancelled
    ) {
      setFilterList(filteredData);
    }

    return () => {
      isCancelled = true;
    };
  }, [filteredData]);

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={onClose}
      fullScreen
      className={classes.dialog}
    >
      <DialogTitle onClose={onClose}>CLOSE</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <FilterHeader
          type={type}
          title={title}
          filterOptions={filterOptions}
          onAddFilter={_handleAddFilter}
          filterList={filterList}
        />
        <FilterList
          items={filterList}
          onDeleteItem={_handleDeleteFilterData}
          minSelectedQuestion={minSelectedQuestion}
        />
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <PopButton
          variant="contained"
          fullWidth
          onClick={_handleDeleteAllFilterData}
          startIcon={<DeleteIcon />}
          disabled={isApplyFilters}
        >
          Clear
        </PopButton>
        <PopButton
          color="primary"
          variant="contained"
          fullWidth
          onClick={_handleApplyFilters}
          disabled={isApplyFilters}
        >
          Apply Filters
        </PopButton>
      </DialogActions>
    </Dialog>
  );
};

const AdvanceFilter = ({
  type,
  dialogTitle,
  buttonText,
  filterOptions,
  filteredData,
  onApplyFilters,
  lastUpdate,
  totalParticipants,
  minSelectedQuestion,
  studyType,
}) => {
  const classes = useStyles();
  const [openAdvanceFilter, setOpenAdvanceFilter] = useState(false);

  const _appendTotalParticipantsSuffix = () => {
    return parseInt(totalParticipants, 10) > 1 ? 'Participants' : 'Participant';
  };

  return (
    <>
      <Box display="flex">
        <AdvanceFilterDialog
          type={type}
          open={openAdvanceFilter}
          onClose={() => setOpenAdvanceFilter(false)}
          filterOptions={filterOptions}
          onApplyFilters={onApplyFilters}
          title={dialogTitle}
          filteredData={filteredData}
          minSelectedQuestion={minSelectedQuestion}
        />
        <PopButton
          variant="outlined"
          color="primary"
          onClick={() => setOpenAdvanceFilter(true)}
          startIcon={<FilterListIcon />}
          size="small"
        >
          {buttonText}
        </PopButton>
        {studyType && studyType === DAILY_QUESTION && lastUpdate && (
          <Box
            display="flex"
            alignItems="center"
            className={classes.lastUpdate}
          >
            <ErrorOutlineIcon
              fontSize="small"
              className={classes.lastUpdateIcon}
            />
            <Typography className={classes.lastUpdateText}>
              {`Last Updated ${moment(lastUpdate).format(
                'DD MMMM YYYY, HH:mm',
              )}`}
            </Typography>
          </Box>
        )}
      </Box>
      {/* start filter data */}
      {filteredData && Array.isArray(filteredData) && filteredData.length > 0 && (
        <Box display="flex" className={classes.filterDataContainer}>
          <ul style={{ paddingLeft: '16px' }}>
            {Array.isArray(filteredData) &&
              filteredData.map((filter, idx) => {
                const answer = filter.answers
                  .map((ans) => `"${ans}"`)
                  .join(' ,');
                return (
                  <li key={idx} className={classes.filterDataList}>
                    <Typography className={classes.filterDataListItem}>
                      {`${filter.question} ${
                        FILTER_OPERATOR[filter.operator]
                      } : ${answer}`}
                    </Typography>
                  </li>
                );
              })}
            {totalParticipants && (
              <li className={classes.filterDataList}>
                {totalParticipants && (
                  <Typography className={classes.filterDataListItem}>
                    Total Participants:
                    <Box
                      component="div"
                      display="inline"
                      fontWeight="fontWeightBold"
                    >
                      {` ${totalParticipants} `}
                    </Box>
                    {_appendTotalParticipantsSuffix()}
                  </Typography>
                )}
              </li>
            )}
          </ul>
        </Box>
      )}
      {/* end filter data */}
    </>
  );
};

DialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
};

FilterHeader.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  filterOptions: PropTypes.array,
  onAddFilter: PropTypes.func,
  filterList: PropTypes.array,
};

FilterList.propTypes = {
  items: PropTypes.array,
  onDeleteItem: PropTypes.func,
};

AdvanceFilterDialog.propTypes = {
  type: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  filterOptions: PropTypes.array,
  onApplyFilters: PropTypes.func,
  filteredData: PropTypes.array,
  minSelectedQuestion: PropTypes.number,
};

AdvanceFilter.propTypes = {
  type: PropTypes.oneOf(['RESULT', 'PANEL']),
  studyType: PropTypes.string,
  dialogTitle: PropTypes.string,
  buttonText: PropTypes.string,
  filterOptions: PropTypes.array,
  filteredData: PropTypes.array,
  onApplyFilters: PropTypes.func,
  lastUpdate: PropTypes.string,
  totalParticipants: PropTypes.string,
  minSelectedQuestion: PropTypes.number,
};

export default AdvanceFilter;
