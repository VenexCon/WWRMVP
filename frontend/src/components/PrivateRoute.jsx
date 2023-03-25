import {Navigate} from 'react-router-dom'
import {useSelector} from 'react-redux'

const PrivateRoute = ({children}) => {
    const {user} =useSelector((state) => state.auth)
    const {business} = useSelector((state) => state.businessAuth)
    if(user || business) return children

    return <Navigate to='/login'/>
}

export default PrivateRoute