export interface Artist {
	id: number;
	name: string;
	picture_medium: string;
	picture_small: string;
	nb_fan: number;
	nb_album: number;
	link: string;
	records: Record[];
}

export interface Record {
	id: number;
	title: string;
	cover_medium: string;
	tracks: { data: Track[] };
	record_type: string;
	link: string;
	artist: { id: string; name: string };
	release_date: string;
	nb_tracks: number;
	duration: number;
}

export interface Track {
	id: string;
	title: string;
	duration: number;
	explicit_lyrics: boolean;
	preview: string;
	link: string;
	album: {
		title: string;
		cover_small: string;
		cover_medium: string;
		cover: string;
		id: number;
	};
	artist: {
		name: string;
	};
	contributors: Array<{
		picture_medium: string;
		name: string;
		id: number;
	}>;
}
