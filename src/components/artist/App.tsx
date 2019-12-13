import React, { useState } from "react";
import "./App.scss";
import Searchbar from "./Searchbar";
import { cors } from "../../constants";
import { Artist as IArtist } from "../../interfaces";
import Artist from "./Artist";
import ArtistInfo from "./ArtistInfo";
import RecordsDisplay from "./RecordsDisplay";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AlbumInfo from "../album/AlbumInfo";
import DiscographyDisplay from "../discography/Discography";

interface SearchResult {
	data: Array<IArtist>;
}

const App: React.FC = () => {
	const [artist, setArtist] = useState<IArtist>();
	const [loading, setLoading] = useState(false);

	async function handleSubmit(
		event: React.FormEvent<HTMLFormElement>,
		searchText: string
	) {
		event.preventDefault();
		setArtist(undefined);
		setLoading(true);
		const searchResp = await fetch(
			`https://${cors}api.deezer.com/search/artist?q=${searchText}`
		);
		const searchData: SearchResult = await searchResp.json();
		const artist = searchData.data[0];
		const records = await fetch(
			`https://${cors}api.deezer.com/artist/${artist.id}/albums`
		);
		const recordsData = await records.json();
		artist.records = recordsData.data;

		setArtist(artist);
		setLoading(false);
	}
	function getRandomArtistIds(limit: number) {
		let artistIds = [];
		for (let i = 0; i < 16; i++) {
			let number = Math.floor(Math.random() * limit);
			artistIds.push(number);
		}
		return artistIds;
	}
	console.log(getRandomArtistIds(10000000));
	return (
		<Router>
			<Switch>
				<Route exact path="/artist">
					<div className="content">
						<Searchbar onSubmit={handleSubmit} />
						{artist && (
							<Artist>
								<ArtistInfo artist={artist} />
								<RecordsDisplay
									records={artist.records.filter(
										r => r.record_type !== "single"
									)}
									title="Albums"
									classname="artist-albums"
								/>
								<RecordsDisplay
									records={artist.records.filter(
										r => r.record_type === "single"
									)}
									title="Singles"
									classname="artist-singles"
								/>
								<Link
									className="artist-btnlink"
									to={`/${artist.id}/discography`}
								>
									<button className="artist-btn">View Discography</button>
								</Link>
							</Artist>
						)}
						{loading && <div className="loader"></div>}
					</div>
				</Route>
				<Route path="/album/:id">
					<div className="content">
						<AlbumInfo></AlbumInfo>
					</div>
				</Route>
				<Route path="/:artistid/discography">
					<div className="content">
						<DiscographyDisplay></DiscographyDisplay>
					</div>
				</Route>
			</Switch>
		</Router>
	);
};

export default App;
