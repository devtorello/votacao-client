import Auth from '../utils/auth'
import User from '../utils/user'

export const AuthGuard = (redirectPath) => ({ next }) => {
	if (Auth.isLoggedIn)
        return next(redirectPath)
        
	next()
}

export const GuestGuard = (redirectPath) => ({ next }) => {
	if (Auth.isGuest)
        return next(redirectPath)
        
	next()
}

export const UserGuard = (redirectPath) => ({ next }) => {
	if (User.data.level === 'USER')
        return next(redirectPath)
        
	next()
}

export const AdminGuard = (redirectPath) => ({ next }) => {
    if (User.data.level === 'ADMIN')
        return next(redirectPath)
        
	next()
}