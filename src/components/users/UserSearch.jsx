import { useState, useContext } from 'react'
import GitHubContext from '../../context/github/GitHubContext'
import AlertContext from '../../context/alert/AlertContext'
import { searchUsers } from '../../context/github/GithubActions'
import Alert from '../layout/Alert'

function UserSearch() {
	const [text, setText] = useState('')
	const { users, dispatch } = useContext(GitHubContext)
	const { setAlert } = useContext(AlertContext)

	const onSubmitForm = async e => {
		e.preventDefault()
		if (text === '') {
			setAlert('Please enter something', 'error')
		} else {
			dispatch({ type: 'SET_LOADING' })
			dispatch({ type: 'GET_USERS', payload: await searchUsers(text) })
		}
	}

	const onClickClear = e => {
		e.preventDefault()
		dispatch({ type: 'CLEAR_USERS' })
		setText('')
	}

	return (
		<>
			<Alert />
			<div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-4 gap-4'>
				<div>
					<form onSubmit={onSubmitForm}>
						<div className='form-control'>
							<div className='relative'>
								<input type='text' className='w-full pre-40 bg-gray-200 input input-lg text-black' placeholder='Search' value={text} onChange={e=>setText(e.target.value)} />
								<button className='absolute top-0 right-0 rounded-l-none w-36 btn btn-lg'>Go</button>
							</div>
						</div>
					</form>
				</div>
				{users.length > 0 && (
					<div>
						<button className='btn btn-ghost btn-lg' onClick={onClickClear}>
							Clear
						</button>
					</div>
				)}
			</div>
		</>
	)
}

export default UserSearch