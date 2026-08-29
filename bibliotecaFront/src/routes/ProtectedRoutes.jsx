import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const ProtectedRoutes = ({children}) => {
    const {loading, isAuthenticated} = useAuth()

    if (loading) {
        return <p>Carregando...</p>
    }

    if (!isAuthenticated) {
        return <Navigate to={'/login'} replace/>
    }

    return children
}

export default ProtectedRoutes