import { connect } from 'react-redux';
import { sendTask, fetchTasks, taskUpdate, removeToken, taskDelete }from '../actions';
import User from '../components/User';

const mapStateToProps = (state) => {
    return {
        tasks: state.Tasks,
        isFetching: state.isFetching
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        sendTask: (task) => {
            return dispatch(sendTask(task))
        },
        fetchTask: () => {
            return dispatch(fetchTasks())
        },
        taskUpdate: (task) => {
            return dispatch(taskUpdate(task))
        },
        deleteTask: (task) => {
            return dispatch(taskDelete(task))
        },
        removeToken: () => {
            return dispatch(removeToken())
        }
    }
}

const UserLink = connect(mapStateToProps, mapDispatchToProps)(User)

export default UserLink;