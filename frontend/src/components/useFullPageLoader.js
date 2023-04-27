import React, {useState} from 'react'
import LoadingSpinner from './LoadingSpinner'

const useFullPageLoader = () => {
    const [loading, setLoading] = useState(false)   
    
    return([
        loading ? <LoadingSpinner /> : null,
        () => setLoading(true), 
        () => setLoading(false)
    ]
    )
}
export default useFullPageLoader