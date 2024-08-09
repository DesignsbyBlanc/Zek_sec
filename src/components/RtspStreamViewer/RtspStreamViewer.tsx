import React from "react"
import ReactPlayer from "react-player";

const RtspStreamViewer = (streamUrl) => {

	return (
		<div className="rounded-lg overflow-hidden" >
			<ReactPlayer
				url={streamUrl.url}
				playing={true}
				controls={true}
				width="43rem"
				height="auto"
				muted
			/>
		</div>
	);
};

export default RtspStreamViewer;
