import { useEffect, useState } from 'react';
import axios from 'axios';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Spinner } from 'reactstrap';
import { toast } from 'react-toastify';

const UserSelection = (props) => {
    const [users, setUsers] = useState([]);
    const [userName, setUserName] = useState('Select Users');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { setUserId, userId } = props;

    const toggleDropDown = () => setDropdownOpen(prev => !prev);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                let users = await axios.get("/user/all");
                setUsers(users.data);
            } catch (error) {
                toast.error(error?.message);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [])

    const selectUser = (event) => {
        console.log('selected', event.target);
        setUserName(event.target.name);
        setUserId(event.target.value);
    }

    if (userId !== null) return ''

    return (
        <div>
            {isLoading ?
                <Spinner color="primary" /> :
                <div>
                    {users.length > 0 && <Dropdown isOpen={dropdownOpen} toggle={toggleDropDown}>
                        <DropdownToggle caret>
                            {userName}
                        </DropdownToggle>
                        <DropdownMenu>
                            {
                                users.map(user => {
                                    return (<DropdownItem value={user.userId} name={user.name} onClick={selectUser}>{user.name}</DropdownItem>);
                                })
                            }
                        </DropdownMenu>
                    </Dropdown>}
                </div>
            }
        </div>
    )
}

export default UserSelection;