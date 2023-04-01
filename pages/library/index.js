import Spinner from '@components/common/Spinner';
import { withAuth } from '@context/AuthContext';
import { useAuth } from '@hooks/useAuth.hook'
import React from 'react'

const MyLibrary = () => {
    const { user, loading } = useAuth();

    console.log(user, loading, "has")

    if (loading) {
        return <Spinner />
    }
    return (
        <div>MyLibrary</div>
    )
}

export default withAuth(MyLibrary)