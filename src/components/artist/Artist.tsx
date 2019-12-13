import React from "react";
import "./Artist.scss";
const Artist: React.FC = ({ children }) => {
	return <div className="artist">{children}</div>;
};

export default Artist;
