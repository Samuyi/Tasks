import { connect } from 'react-redux';
import App from '../components/App';


const mapStateToProps = state => {
    console.log(state)
    return {
        token: state.Token
    }
}

const AppLink = connect(mapStateToProps)(App);

export default AppLink;