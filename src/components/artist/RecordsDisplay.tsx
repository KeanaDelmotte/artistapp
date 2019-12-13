import React from "react";
import { Record } from "../../interfaces";
import "./RecordsDisplay.scss";
import { Link } from "react-router-dom";
interface RecordsDisplayProps {
	title: string;
	records: Record[];
	classname: string;
}

const RecordsDisplay: React.FC<RecordsDisplayProps> = ({
	title,
	records,
	classname
}) => {
	return (
		<div className={classname}>
			<h2 className={`${classname}-title`}>{title}</h2>
			<ul className={`${classname}-records`}>
				{records.map(record => (
					<li className={`${classname}-records--record`} key={record.id}>
						<span className={`${classname}-records--record_title`}>
							{record.title}
						</span>
						<Link
							to={`/album/${record.id}`}
							className={`${classname}-records--record_img`}
						>
							<img
								src={record.cover_medium}
								alt="Album cover"
								className={`${classname}-records--record_img`}
							/>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default RecordsDisplay;
