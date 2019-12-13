import React, { useEffect, useState } from "react";
import { Record } from "../../interfaces";
import { useParams } from "react-router";
import { cors } from "../../constants";
import "./AlbumInfo.scss";
import { MdPlayCircleOutline } from "react-icons/md";
import { formatTime } from "../../helpers";

interface AlbumInfoParams {
	id: string;
}

const AlbumInfo: React.FC = () => {
	const [albumInfo, setAlbumInfo] = useState<Record>();
	const { id } = useParams<AlbumInfoParams>();

	useEffect(() => {
		fetch(`https://${cors}api.deezer.com/album/${id}`).then(async response => {
			const albumData: Record = await response.json();
			setAlbumInfo(albumData);
		});
	}, [id]);

	if (!albumInfo) {
		return <div className="loader"></div>;
	}

	const releasYear = albumInfo.release_date.substr(0, 4);
	return (
		<div className="album">
			<div className="album-info">
				<h1 className="album-info--title">{albumInfo.title}</h1>
				<a
					href={`https://www.deezer.com/en/artist/${albumInfo.artist.id}`}
					className="album-info--artist"
				>
					{albumInfo.artist.name}
				</a>
				<img
					src={albumInfo.cover_medium}
					alt="Album cover"
					className="album-info--cover"
				/>
				<p className="album-info--date">
					{releasYear} <span className="album-info--dot">&bull;</span>
					<span className="album-info--tracktotal">
						{`${albumInfo.nb_tracks} songs`}
					</span>
				</p>
				{/* <p className="album-info--tracktotal</p> */}
				<p className="album-info--duration">{`${formatTime(
					albumInfo.duration
				)} minutes`}</p>
			</div>
			<ul className="album-tracklist">
				{albumInfo.tracks.data.map((track, index) => (
					<li className="album-tracklist--track" key={track.id}>
						<a className="album-tracklist--track_iconlink" href={track.link}>
							<MdPlayCircleOutline className="album-tracklist--track_icon" />
						</a>
						<p className="album-tracklist--track_tracknumber">{index + 1}</p>
						<p className="album-tracklist--track_name">{track.title}</p>
						<p className="album-tracklist--track_tracklength">
							{formatTime(track.duration)}
						</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default AlbumInfo;
