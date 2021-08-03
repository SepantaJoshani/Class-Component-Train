import { Fragment, Component } from "react";
import UsersContext from "../store/users-context";
import classes from "./UserFinder.module.css";
import Users from "./Users";


class UserFinder extends Component {
  static contextType =UsersContext
  constructor() {
    super();
    this.state = {
      filteredUsers: [],
      searchTerm: "",
    };
  }

  componentDidMount() {
    this.setState({ filteredUsers: this.context.users });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchTerm !== this.state.searchTerm) {
      this.setState({
        filteredUsers: this.context.users .filter((user) =>
          user.name.toLowerCase().includes(this.state.searchTerm)
        ),
      });
    }
  }

  searchChangeHandler(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    return (
      <Fragment>
        <div className={classes.finder}>
          <input type="search" onChange={this.searchChangeHandler.bind(this)} />
        </div>
        <Users users={this.state.filteredUsers} />
      </Fragment>
    );
  }
}

// const UserFinder = () => {
//   const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS);
//   const [searchTerm, setSearchTerm] = useState("");

// useEffect(() => {
//   setFilteredUsers(
//     DUMMY_USERS.filter((user) => user.name.toLowerCase().includes(searchTerm))
//   );
// }, [searchTerm]);

// const searchChangeHandler = (event) => {
//   setSearchTerm(event.target.value);
// };

// };

export default UserFinder;
