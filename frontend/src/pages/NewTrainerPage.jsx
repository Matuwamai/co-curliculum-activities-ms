import React from 'react'
import TrainerForm from '../components/TrainerForm'
import PageHeader from '../components/PageHeader'

const NewTrainerPage = () => {
  return (
    <div>
      <PageHeader btnText="Go to Trainers" btnLink="/trainers" />
      <TrainerForm />
    </div>
  )
}

export default NewTrainerPage