import React from "react";

interface IVideoTemplate {
    content: VideoContent
}

const VideoTemplate: React.FC<IVideoTemplate> = ({ content }) => {
    return (
        <section id={content.title} className="bg-white rounded-xl p-8 lg:p-12 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
            {content.title && (
                <div className="flex items-start mb-6 pb-6 border-b-2 border-gray-100">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center text-white text-2xl mr-4 flex-shrink-0">
                        🎬
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 leading-tight">
                        {content.title}
                    </h2>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {content.list.map(item => (
                    <div key={item.id} className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <video
                            width="100%"
                            height="auto"
                            className="w-full h-auto max-h-[400px] object-cover"
                            poster={item.poster}
                            controls
                        >
                            <source src={item.videoSrc} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default VideoTemplate;