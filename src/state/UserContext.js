import * as React from 'react'
const UserContext = React.createContext()
function useUser() {
    const context = React.useContext(UserContext)
    if (!context) {
        throw new Error(`useUser must be used within a UserProvider`)
    }
    return context
}
function UserProvider(props) {
    const [user, setUser] = React.useState(0)
    const value = React.useMemo(() => [user, setUser], [user])
    return <UserContext.Provider value={value} {...props} />
}
export { UserProvider, useUser }