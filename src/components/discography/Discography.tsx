import React, { useState, useEffect } from "react";
import { cors } from "../../constants";
import { string } from "prop-types";
import { useParams } from "react-router";
import { Track } from "../../interfaces";
import { formatTime } from "../../helpers";
import "./Discography.scss";
import { MdExplicit } from "react-icons/md";
import { Link } from "react-router-dom";

interface DiscographyDisplayParams {
	artistid: string;
}

interface Discography {
	data: Track[];
}

const DiscographyDisplay: React.FC = () => {
	let [artistSongs, setArtistSongs] = useState<Track[]>();
	const { artistid } = useParams<DiscographyDisplayParams>();

	useEffect(() => {
		fetch(
			`https://${cors}api.deezer.com/artist/${artistid}/top?limit=2000`
		).then(async response => {
			let discogData: Discography = await response.json();
			setArtistSongs(discogData.data);
		});
	}, [artistid]);
	if (!artistSongs) {
		return <div className="loader"></div>;
	}

	const getArtist = (tracks: Track[]) => {
		if (artistSongs) {
			return tracks[0].contributors.find(artist => `${artist.id}` == artistid);
		}
	};

	console.log(artistid);

	return (
		<ul className="discography">
			<div className="discography-artist">
				<img
					src={getArtist(artistSongs)?.picture_medium}
					alt="artist"
					className="discography-artist--img"
				/>
				<h1 className="discography-artist--title">{`${
					getArtist(artistSongs)?.name
				} discography`}</h1>
			</div>

			{artistSongs.map(song => (
				<li className="discography-track">
					<img
						src={song.album.cover_small}
						alt="Album art"
						className="discography-track--albumart"
					/>

					<p className="discography-track--artist">
						{song.artist.name} <span className="bullet">&bull;</span>{" "}
						<Link
							to={`/album/${song.album.id}`}
							className="discography-track--album"
						>
							{song.album.title}
						</Link>
					</p>

					<p className="discography-track--name">
						{song.title}
						{song.explicit_lyrics && (
							<span className="discography-track--explicit">
								<MdExplicit />
							</span>
						)}
					</p>

					<p className="discography-track--duration">
						{formatTime(song.duration)}
					</p>
				</li>
			))}
		</ul>
	);
};

export default DiscographyDisplay;
