import React from 'react'
import PageHeader from '../components/PageHeader'
import ActivityForm from '../components/ActivivtyForm'

const NewActivityPage = () => {
  return (
    <div>
      <PageHeader btnText='Go to Activities' btnLink='/activities' />
      <ActivityForm />
    </div>
  )
}

export default NewActivityPage