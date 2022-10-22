import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.scss';
import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Moon from '../public/assets/icon-moon.svg';
import Sun from '../public/assets/icon-sun.svg';
import Search from '../public/assets/icon-search.svg';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { NavbarBrand, NavItem } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import type { ImageLoaderProps } from 'next/image';
import Stack from 'react-bootstrap/Stack';
import Locator from '../public/assets/icon-location.svg';
import Twitter from '../public/assets/icon-twitter.svg';
import Blog from '../public/assets/icon-website.svg';
import Company from '../public/assets/icon-company.svg';
import { useTheme } from 'next-themes';

type StateType = {
	image: string;
};

const Home: React.FC = (props: Record<string, string>) => {
	const [name, setName] = useState('tuanah252');
	const [image, setImage] = useState([]);
	const [avaName, setAvaName] = useState([]);
	const [bio, setBio] = useState([]);
	const [date, setDate] = useState([]);
	const [repos, setRepos] = useState([]);
	const [follower, setFollower] = useState([]);
	const [following, setFollowing] = useState([]);
	const [location, setLocation] = useState([]);
	const [twitter, setTwitter] = useState([]);
	const [blog, setBlog] = useState([]);
	const [company, setCompany] = useState([]);
	const [realName, setRealName] = useState([]);
	const [click, setClick] = useState(false);
	const [notFound, setNotfound] = useState(false);
	const [user, setUser] = useState('');
	const { theme, setTheme } = useTheme();
	const [light, setLight] = useState(false);
	const handleDarkMode = () => {
		setTheme(light ? 'light' : 'dark');
		setLight(!light);
	};
	const getData = async () => {
		try {
			let res = await axios.get(`https://api.github.com/users/${name}`);
			setImage(res.data.avatar_url);
			setAvaName(res.data.login);
			setBio(res.data.bio);
			setDate(res.data.created_at);
			setRepos(res.data.public_repos);
			setFollower(res.data.followers);
			setFollowing(res.data.following);
			setLocation(res.data.location);
			setTwitter(res.data.twitter_username);
			setBlog(res.data.blog);
			setCompany(res.data.company);
			setRealName(res.data.name);
			setUser('');
			setNotfound(false);
		} catch (error) {
			setNotfound(true);
			setUser('No results');
		}
	};

	const handleClick = () => {
		setClick(!click);
		return;
	};

	useEffect(() => {
		getData();
	}, [click]);

	useEffect(() => {
		getData();
	}, []);

	const myLoader = ({ src }: ImageLoaderProps) => {
		return `${image}`;
	};

	const handleMonth = () => {
		let month = `${date.slice(5, 7)}`;
		switch (month) {
			case '01':
				return 'Jan';
				break;
			case '02':
				return 'Feb';
				break;
			case '03':
				return 'Mar';
				break;
			case '04':
				return 'Apr';
				break;
			case '05':
				return 'May';
				break;
			case '06':
				return 'Jun';
				break;
			case '07':
				return 'Jul';
				break;
			case '08':
				return 'Aug';
				break;
			case '09':
				return 'Sep';
				break;
			case '10':
				return 'Oct';
				break;
			case '11':
				return 'Nov';
				break;
			case '12':
				return 'Deb';
				break;
			case 'undefined':
				break;
			default:
				break;
		}
	};

	const { imageResource } = props;
	return (
		<div className={styles.container}>
			<Head>
				<title>Github Name Finder</title>
				<meta
					name='Github-Users-Finder'
					content='Find Github Users Infomation'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className={styles.main}>
				<>
					<Navbar bg='white' className={styles.header}>
						<Container className={styles.devfinder}>
							<Navbar.Brand className={styles.devfinder}>
								devfinder
							</Navbar.Brand>
						</Container>
						<Container
							className={styles.lightMode}
							onClick={handleDarkMode}>
							{light ? (
								<>
									<p>DARK</p>
									<span>
										<Image
											className={styles.modes}
											src={Sun}
										/>
									</span>
								</>
							) : (
								<>
									<p>LIGHT</p>
									<span>
										<Image
											className={styles.modes}
											src={Moon}
										/>
									</span>
								</>
							)}
						</Container>
					</Navbar>
					<Card border='none' className={styles.mainSearchBar}>
						<Card.Header className={styles.searchBar}>
							<div className={styles.iconInput}>
								<Image
									src={Search}
									className={styles.searchIcon}
								/>
								<Form.Control
									className={styles.input}
									type='text'
									id='inputPassword5'
									aria-describedby='passwordHelpBlock'
									plaintext={true}
									placeholder='Search GitHub username…'
									inputMode='search'
									onChange={(e) => setName(e.target.value)}
								/>
							</div>

							<Stack
								direction='horizontal'
								className={styles.notFound}>
								{notFound ? <p>{user}</p> : ''}
								<Button
									variant='primary'
									size='lg'
									type='submit'
									className={styles.searchBtn}
									onClick={handleClick}>
									Search
								</Button>
							</Stack>
						</Card.Header>
					</Card>

					<Card border='none'>
						<Card.Body className={styles.mainCard}>
							<div className={styles.avatarContainer}>
								<Image
									loader={myLoader}
									src={`${imageResource}`}
									className={styles.avatar}
									alt='avatar'
									width={117}
									height={117}
									objectFit='cover'
								/>
							</div>
							<Stack className={styles.bioInfo}>
								<Stack
									direction='horizontal'
									gap={3}
									className={styles.heading}>
									<h2 className={styles.bigName}>
										{realName || 'This user has no name'}
									</h2>
								</Stack>

								<p className={styles.smName}>{`@${avaName}`}</p>
								<p className={styles.bio}>
									{bio || `This profile has no bio`}
								</p>
							</Stack>
							<p className={styles.joinTime}>
								{`Joined ${date.slice(
									8,
									10
								)} ${handleMonth()} ${date.slice(0, 4)}`}
							</p>
							<Stack className={styles.infoBody}>
								<Stack
									direction='horizontal'
									gap={3}
									className={styles.infoColored}>
									<Stack
										className={`${styles.subInfo1} ${styles.subInfo}`}>
										<p>Repos</p>
										<h2>{repos}</h2>
									</Stack>
									<Stack
										className={`${styles.subInfo2} ${styles.subInfo}`}>
										<p>Followers</p>
										<h2>{follower}</h2>
									</Stack>
									<Stack
										className={`${styles.subInfo3} ${styles.subInfo}`}>
										<p>Following</p>
										<h2>{following}</h2>
									</Stack>
								</Stack>
								<Stack className={styles.iconMainBox}>
									<Stack
										direction='horizontal'
										className={`${styles.iconBox} ${styles.location}`}>
										<Image
											className={styles.subIcon}
											src={Locator}
											objectFit='cover'
										/>
										<p>{location || 'Not Available'}</p>
									</Stack>
									<Stack
										direction='horizontal'
										className={`${styles.iconBox} ${styles.twitter}`}>
										<Image
											className={styles.subIcon}
											src={Twitter}
											objectFit='cover'
										/>
										<p>{twitter || 'Not Available'}</p>
									</Stack>
									<Stack
										direction='horizontal'
										className={`${styles.iconBox} ${styles.blog}`}>
										<Image
											className={styles.subIcon}
											src={Blog}
											objectFit='cover'
										/>

										<a href={`${blog}`} target='_blank'>
											{blog || 'Not Available'}
										</a>
									</Stack>
									<Stack
										direction='horizontal'
										className={`${styles.iconBox} ${styles.company}`}>
										<Image
											className={styles.subIcon}
											src={Company}
											objectFit='cover'
										/>
										<p>{company || 'Not Available'}</p>
									</Stack>
								</Stack>
							</Stack>
						</Card.Body>
					</Card>
				</>
			</main>
		</div>
	);
};

export default Home;
