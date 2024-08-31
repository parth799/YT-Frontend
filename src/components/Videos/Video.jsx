/* eslint-disable react/prop-types */

function Video({src, poster}) {
    return (
        <>
            <video
                src={src}
                poster={poster}
                autoPlay
                controls
                playsInline
                className="sm:h-[68vh] sm:max-w-4xl h-80 w-full ml-7 object-contain"
            ></video>
        </>
    );
}

export default Video
