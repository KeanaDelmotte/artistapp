import React from "react";
import { Artist } from "../../interfaces";
import "./ArtistInfo.scss";

interface ArtistInfoProps {
	artist: Artist;
}

const ArtistInfo: React.FC<ArtistInfoProps> = ({ artist }) => {
	return (
		<div className="artist-info">
			<a href={artist.link} className="artist-info--photo">
				<picture>
					<img
						src={artist.picture_medium}
						alt="artist"
						className="artist-info--photo"
					/>
				</picture>
			</a>
			<div className="artist-info--text">
				<a href={artist.link} className="artist-info--name">
					{artist.name}
				</a>

				<p className="artist-info--fans">{artist.nb_fan} fans</p>
				<p className="artist-info--albums">
					{artist.nb_album} albums and singles
				</p>
			</div>
		</div>
	);
};

export default ArtistInfo;
