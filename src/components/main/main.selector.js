import {createSelector} from 'reselect'

const mainSelector = ({main}) => main

export default createSelector(
  mainSelector,
  main => ({
    ...main
  })
)
