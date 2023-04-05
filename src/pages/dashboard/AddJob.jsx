import { FormRow } from '../../components';
import FormRowSelect from '../../components/FormRowSelect';
import { useSelector, useDispatch } from 'react-redux';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { toast } from 'react-toastify';
import {
  handleChange,
  clearValues,
  editJob,
} from '../../features/job/jobSlice';
import { createJob } from '../../features/job/jobSlice';
import { useEffect } from 'react';

const AddJob = () => {
  const {
    isLoading,
    isEditing,
    position,
    company,
    jobLocation,
    jobTypeOptions,
    jobType,
    statusOptions,
    status,
    editJobId,
  } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isEditing) {
      dispatch(handleChange({ name: 'jobLocation', value: user.location }));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      toast.error('Please Fill Out All Fields');
      return;
    }
    if (isEditing) {
      dispatch(
        editJob({
          jobId: editJobId,
          job: {
            position,
            company,
            jobLocation,
            jobType,
            status,
          },
        })
      );
      return;
    }
    dispatch(createJob({ position, company, jobLocation, jobType, status }));
  };
  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };
  return (
    <Wrapper>
      <h3>{isEditing ? 'Edit Job' : 'Add Job'}</h3>
      <form className='form' onSubmit={handleSubmit}>
        <div className='form-center'>
          <FormRow
            type='text'
            name='position'
            value={position}
            handleChange={handleJobInput}
          />
          <FormRow
            type='text'
            name='company'
            value={company}
            handleChange={handleJobInput}
          />
          <FormRow
            type='text'
            name='jobLocation'
            labelText='job location'
            value={jobLocation}
            handleChange={handleJobInput}
          />
          <FormRowSelect
            name='status'
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />
          <FormRowSelect
            name='jobType'
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
            labelText='Job Type'
          />
          <div className='btn-container'>
            <button
              type='button'
              className='btn btn-block clear-btn'
              onClick={() => dispatch(clearValues())}
            >
              clear
            </button>
            <button
              type='submit'
              className='btn btn-block submit-btn'
              disabled={isLoading}
            >
              {isLoading
                ? 'Please wait...'
                : isEditing
                ? 'save changes'
                : 'add job'}
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};
export default AddJob;
