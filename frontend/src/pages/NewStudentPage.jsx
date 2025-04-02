import React from 'react'
import StudentForm from '../components/StudentForm'
import PageHeader from '../components/PageHeader';

const NewStudentPage = () => {
  return (
    <div>
      <PageHeader btnText='Go to Students' btnLink='/students' />
      <StudentForm />
    </div>
  );
}

export default NewStudentPage