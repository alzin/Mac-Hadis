import React from "react";

interface IVideoTemplate {
    content: VideoContent
}

const VideoTemplate: React.FC<IVideoTemplate> = ({ content }) => {
    return (
        <div className="pt-5">
            <div className=" flex flex-col md:flex-row items-center gap-4 justify-between mx-auto mb-4">
                {
                    content.list.map(item =>
                        <video key={item.id} width="301" height="469" className="max-h-[469px]" poster={item.poster} controls>
                            <source src={item.videoSrc} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    )
                }
            </div>
        </div>
    )
};

export default VideoTemplate;
