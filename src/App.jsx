import React, { useState, useEffect } from "react";
import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Menu from "./components/molecules/MainMenu/Menu";
import Login from "./views/login/Login";
import ServerGrid from "./views/serverGrid/serverGrid";
import { ServerView } from "./components/organisms/ServerView/ServerView";
import { useAuthState } from "./store/authState";
import { LoadingSpinner } from "./components/atoms/Loading/Loading";

const App = () => {
	const [loading, setLoading] = useState(true);
	const userLogin = useAuthState();

	useEffect(() => {
		const timeout = setTimeout(() => setLoading(false), 1000); // wait for 1 second
		return () => clearTimeout(timeout);
	}, []);

	if (loading) {
		return (
			<div>
				<LoadingSpinner />
			</div>
		);
	}

	return (
		<Router id="App">
			<Menu />
			<Routes>
				{!userLogin.isLoggedIn && [
					<Route path="/" element={<Login />} />,
					<Route path="/serverGrid" element={<Login />} />,
				]}
				{userLogin.isLoggedIn && [
					<Route key="serverGrid" path="/" element={<ServerGrid />} />,
					<Route
						key="serverView"
						path="/server/:serverId"
						element={<ServerView />}
					/>,
				]}
				<Route path="*" element={<h1>404</h1>} />
			</Routes>
		</Router>
	);
};

export default App;
