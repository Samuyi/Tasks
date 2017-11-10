import { connect } from 'react-redux'
import Login   from '../components/Login'
import { setToken } from '../actions'

const mapStateToProps = (state) => {
  return {
      name: state.name
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setToken: (token) => {
            return dispatch(setToken(token))
        }
    }
}

const LoginLink = connect(mapStateToProps, mapDispatchToProps)(Login)

export default LoginLink;