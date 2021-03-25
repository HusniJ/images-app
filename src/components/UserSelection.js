import { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Spinner,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    Label,
    Input,
    FormGroup,
    Col
} from 'reactstrap';
import { toast } from 'react-toastify';

const UserSelection = ({ setUserId, userId }) => {
    const [users, setUsers] = useState([]);
    const [userName, setUserName] = useState('Select Users');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [newUserId, setNewUserId] = useState('');
    const [newName, setNewName] = useState('');

    const toggle = () => setModal(!modal);
    const toggleDropDown = () => setDropdownOpen(prev => !prev);

    const fetchData = () => {
        setIsLoading(true);
        axios.get("/user/all")
            .then((users) => { setUsers(users.data) })
            .catch(error => { toast.error(error) })
            .finally(() => { setIsLoading(false) });
    }

    useEffect(() => {
        fetchData();
    }, [])

    const selectUser = (event) => {
        setUserName(event.target.name);
        setUserId(event.target.value);
    }

    const saveUser = () => {
        if (newUserId === '' || newUserId.trim().length === 0) {
            toast.error('Invalid User Id');
            return;
        }

        if (newName === '' || newName.trim().length === 0) {
            toast.error('Invalid User Name');
            return;
        }
        setIsLoading(true);
        axios.post("/user/insert", {
            userId: newUserId,
            name: newName
        }).then((response) => {
            toast.success('Saved Successfully');
            setUsers(prev => [...prev, response.data])
            toggle();
        }).catch((error) => {toast.error(error?.message)})
        .finally(() => { setIsLoading(false); })
    }

    if (userId !== null) return ''

    return (
        <div>
            {isLoading ?
                <Spinner color="primary" /> :
                <div className="User-Div">
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
                    &nbsp;
                    <div>
                        <Button color="secondary" onClick={toggle}>Create User</Button>
                        <Modal isOpen={modal} toggle={toggle}>
                            <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                            <ModalBody>
                                {
                                    <Form>
                                        <FormGroup row>
                                            <Label for="userId" sm={2}>User Id</Label>
                                            <Col sm={10}>
                                                <Input type="text" name="userId" id="userId" placeholder="enter user id" onChange={(e) => setNewUserId(`${e.target.value}`)} />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="userName" sm={2}>Name</Label>
                                            <Col sm={10}>
                                                <Input type="text" name="userId" id="userName" placeholder="enter name" onChange={(e) => setNewName(`${e.target.value}`)} />
                                            </Col>
                                        </FormGroup>
                                    </Form>
                                }
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={saveUser}>Save</Button>{' '}
                                <Button color="secondary" onClick={toggle}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                </div>
            }
        </div>
    )
}

export default UserSelection;