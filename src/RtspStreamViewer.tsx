import React from "react";
import ReactPlayer from "react-player";

const RtspStreamViewer = () => {
	const streamUrl = "http://localhost:8100/stream.m3u8";

	return (
		<div>
			<h1>Live Stream Player</h1>
			<ReactPlayer
				url={streamUrl}
				playing={true}
				controls={true}
				width="100%"
				height="auto"
			/>
		</div>
	);
};

export default RtspStreamViewer;
