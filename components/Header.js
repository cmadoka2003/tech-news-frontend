import { useEffect, useState } from 'react';
import styles from '../styles/Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'antd';
import Moment from 'react-moment';
import Link from 'next/link';
import { useLogin, useLogout } from '../lib/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { Logout } from "../reducers/user";
import { removeAllBookmarks } from '../reducers/bookmarks';
import toast from 'react-hot-toast';


function Header() {
	const dispatch = useDispatch();
	const [date, setDate] = useState('2050-11-22T23:59:59');
	const [isModalVisible, setIsModalVisible] = useState(false);
	const user = useSelector((state) => state.user.value)
	console.log(user);

	useEffect(() => {
		setDate(new Date());
	}, []);

	const showModal = () => {
		setIsModalVisible(!isModalVisible);
	};

	function handleLogout() {
		dispatch(removeAllBookmarks())
		dispatch(Logout())
		toast("You are disconnected")
		setIsModalVisible()
	}

	// REGISTER
	const {
		usernameUp,
		passwordUp,
		setPasswordUp,
		setUsernameUp,
		handleClickUp
	} = useLogin();

	// CONNECT
	const {
		usernameIn,
		passwordIn,
		setUsernameIn,
		setPasswordIn,
		handleClickIn
	} = useLogout();

	let modalContent;


	if (user.token === null) {
		modalContent = (
			<div className={styles.registerContainer}>
				<div className={styles.registerSection}>
					<p>Sign-up</p>
					<input type="text" placeholder="Username" id="signUpUsername" value={usernameUp} onChange={(e) => setUsernameUp(e.target.value)} />
					<input type="password" placeholder="Password" id="signUpPassword" value={passwordUp} onChange={(e) => setPasswordUp(e.target.value)} />
					<button id="register" onClick={() => handleClickUp()}>Register</button>
				</div>
				<div className={styles.registerSection}>
					<p>Sign-in</p>
					<input type="text" placeholder="Username" id="signInUsername" value={usernameIn} onChange={(e) => setUsernameIn(e.target.value)} />
					<input type="password" placeholder="Password" id="signInPassword" value={passwordIn} onChange={(e) => setPasswordIn(e.target.value)} />
					<button id="connection" onClick={() => handleClickIn()}>Connect</button>
				</div>
			</div>
		);
	}


	let userSection;
	if (user.token !== null) {
		userSection = (
			<div className={styles.welcomeSection}>
				<p>Welcome {user.username} /</p>
				<button onClick={() => handleLogout()}>Logout</button>
			</div>
		);
	} else {
		if (isModalVisible) {
			userSection = (
				<FontAwesomeIcon
					icon={faXmark}
					onClick={() => showModal()}
					className={styles.userSection}
				/>
			);
		} else {
			userSection = (
				<FontAwesomeIcon
					icon={faUser}
					onClick={() => showModal()}
					className={styles.userSection}
				/>
			);
		}
	}

	return (
		<header className={styles.header}>
			<div className={styles.logoContainer}>
				<Moment className={styles.date} date={date} format="MMM Do YYYY" />
				<h1 className={styles.title}>Morning News</h1>
				{userSection}
			</div>

			<div className={styles.linkContainer}>
				<Link href='/'><span className={styles.link}>Articles</span></Link>
				<Link href='/bookmarks'><span className={styles.link}>Bookmarks</span></Link>
			</div>

			{isModalVisible && <div id="react-modals">
				<Modal getContainer="#react-modals" className={styles.modal} open={isModalVisible} closable={false} footer={null}>
					{modalContent}
				</Modal>
			</div>}
		</header >
	);
}

export default Header;
