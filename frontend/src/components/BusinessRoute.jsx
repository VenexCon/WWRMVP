import {Navigate} from 'react-router-dom'
import {useSelector} from 'react-redux'

const BusinessRoute = ({children}) => {
    const {business} = useSelector((state) => state.businessAuth)
    if( business) return children

    return <Navigate to='/login'/>
}

export default BusinessRoute