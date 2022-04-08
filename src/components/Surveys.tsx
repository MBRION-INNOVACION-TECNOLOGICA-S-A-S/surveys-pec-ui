import React, { useEffect } from 'react'
import { add, load, remove } from '../redux/surveys'
import { useReduxDispatch, useReduxSelector } from '../redux'
import { Link } from 'react-router-dom'

const Surveys = (): React.ReactElement => {
    const surveys = useReduxSelector(state => state.surveys.surveys)
    const dispatch = useReduxDispatch()

    const postStatus = useReduxSelector(state => state.surveys.status)

    useEffect(() => {
      if (postStatus === 'idle') {
        dispatch(load())
      }
    }, [postStatus, dispatch])    

    return (<table className='sjs-surveys-list'>
                <tr>
                    <th>Survey name</th>
                    <th>
                        <span className='sjs-button' title='increment' onClick={() => dispatch(add())}>Add survey</span>                        
                    </th>
                </tr>
            {surveys.map(survey => 
                <tr key={survey.id} className='sjs-surveys-list__row'>
                    <td><span>{survey.name}</span></td>
                    <td>
                        <Link className='sjs-button' to={'run/' + survey.id}><span>Run</span></Link>
                        <Link className='sjs-button' to={'edit/' + survey.id}><span>Edit</span></Link>
                        <span className='sjs-button' onClick={() => dispatch(remove(survey.id))}>Remove</span>
                    </td>
                </tr>
            )}
    </table>)
}

export default Surveys