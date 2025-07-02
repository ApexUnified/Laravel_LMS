import Plyr from 'plyr'
import 'plyr/dist/plyr.css';
import React, { useEffect, useRef } from 'react'

export default function VideoPlayer({ video, thumbnail }) {

    useEffect(() => {
        const player = new Plyr('#player', {
            controls: ['play', 'rewind', 'fast-forward', 'progress', 'current-time',
                'duration', 'mute', 'volume', 'settings', 'pip', 'fullscreen'],
            disableContextMenu: true,
            previewThumbnails: true,
            quality: {
                default: 1080,
            }

        });



        const handleKeyDown = (e) => {
            if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;



            if (e.key.toLowerCase() === 'f') {
                e.preventDefault();
                player.fullscreen.toggle();
            }


            if (e.key.toLowerCase() === 'm') {
                e.preventDefault();
                player.muted = !player.muted;
            }

            if (e.code === 'Space') {
                e.preventDefault(); // Prevent page scroll
                if (player.playing) {
                    player.pause();
                } else {
                    player.play();
                }
            }
        }


        window.addEventListener('keydown', handleKeyDown);


        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, []);
    return (
        <video
            className="object-cover w-full h-[300px]"
            id='player'
            controls controlsList="nodownload"
            src={video}
            poster={thumbnail}
        >
            Your browser does not support the video tag.
        </video>
    )
}
