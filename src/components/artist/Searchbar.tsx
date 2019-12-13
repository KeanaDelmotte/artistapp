import React, { useState } from "react";
import "./Searchbar.scss";

interface SearchbarProps {
	onSubmit: (
		event: React.FormEvent<HTMLFormElement>,
		searchText: string
	) => void;
}

const Searchbar: React.FC<SearchbarProps> = ({ onSubmit }) => {
	const [searchText, setsearchText] = useState("");

	return (
		<form
			className={`searchform ${searchText ? "searchform--filled" : ""}`}
			onSubmit={e => onSubmit(e, searchText)}
		>
			<input
				value={searchText}
				onChange={e => setsearchText(e.target.value)}
				type="text"
				className="searchform--input"
				autoComplete="off"
			/>
		</form>
	);
};

export default Searchbar;
