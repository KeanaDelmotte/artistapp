import React, { useState } from "react";
import "../artist/Searchbar.scss";
import Searchbar from "../artist/Searchbar";
import { Artist } from "../../interfaces";
import { Artist as IArtist } from "../../interfaces";
import { cors } from "../../constants";
import { Link, useParams, Redirect } from "react-router-dom";

interface SearchResult {
	data: Array<IArtist>;
}

interface HomeSearchParams {
	artistId: string;
}
const HomeSearch: React.FC = () => {
	let [artist, setArtist] = useState<Artist>();
	const [loading, setLoading] = useState(false);
	const { artistId } = useParams<HomeSearchParams>();

	async function handleSubmit(
		event: React.FormEvent<HTMLFormElement>,
		searchtext: string
	) {
		event.preventDefault();

		let artistResp = await fetch(
			`https://${cors}api.deezer.com/search?q=${searchtext}`
		);
		let artistData = await artistResp.json();
		setArtist(artistData);
	}

	return (
		<div className="content">
			<Searchbar onSubmit={handleSubmit} />
			{artist && <Redirect to={`/artist/${artistId}`} />}
		</div>
	);
};

export default HomeSearch;
