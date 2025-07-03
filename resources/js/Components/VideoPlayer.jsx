import React, { useEffect, useRef, useState } from 'react';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
import Spinner from './Spinner';
import { router } from '@inertiajs/react';
import axios from 'axios';

export default function VideoPlayer({ videoUrl, thumbnail, startTime = 0, lesson, course, user, LessonMarkAsComplete = false }) {
    const [loading, setLoading] = useState(true);
    const loadingRef = useRef(loading);
    const videoRef = useRef(null);

    useEffect(() => {
        loadingRef.current = loading;
    }, [loading]);

    // Loading Video And Showing Loader
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const player = new Plyr(video, {
            controls: [
                'play', 'rewind', 'fast-forward', 'progress', 'current-time',
                'duration', 'mute', 'volume', 'settings', 'pip', 'fullscreen'
            ],
            disableContextMenu: true,
            previewThumbnails: true,
            quality: { default: 1080 }
        });


        // Loading Initial Video From Where it Left
        video.addEventListener('loadedmetadata', () => {
            if (startTime > 0) {
                video.currentTime = startTime;
            }
        });

        let isMounted = true;
        player.on('canplay', () => isMounted && setLoading(false));
        player.on('playing', () => isMounted && setLoading(false));
        player.on('waiting', () => isMounted && setLoading(true));
        player.on('seeked', () => isMounted && setLoading(false));


        const handleKeyDown = (e) => {
            if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
            if (e.key.toLowerCase() === 'f') {
                e.preventDefault();
                if (!loadingRef.current) {
                    player.fullscreen.toggle();
                }
            }

            if (e.key.toLowerCase() === 'm') {
                e.preventDefault();
                if (!loadingRef.current) {
                    player.muted = !player.muted;
                }
            }

            if (e.code === 'Space') {
                e.preventDefault();
                if (!loadingRef.current) {
                    player.playing ? player.pause() : player.play();
                }
            }

            if (
                e.code === 'F12' ||
                (e.ctrlKey && e.shiftKey && ['I', 'C'].includes(e.key)) ||
                (e.ctrlKey && e.key === 'u')
            ) {
                e.preventDefault();
            }

            if (e.key === 'ArrowRight') {
                e.preventDefault();
                player.currentTime += 5;
            }


            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                player.currentTime -= 5;
            }

            if (e.key === 'ArrowUp') {
                e.preventDefault();
                player.volume += 0.1;
            }

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                player.volume -= 0.1;
            }
        };


        window.addEventListener('keydown', handleKeyDown);
        document.addEventListener('contextmenu', e => e.preventDefault());


        return () => {
            isMounted = false;
            window.removeEventListener('keydown', handleKeyDown);
            player.destroy();
        };
    }, [videoUrl]);


    // Tracking Video Progress
    useEffect(() => {
        if (route().current() === 'lessons.player') {
            const interval = setInterval(() => {
                const video = videoRef.current;
                if (!video) return;

                if (lesson?.lesson_progress?.completed == 1) return;

                const isPlaying = (
                    !video.paused &&
                    !video.ended &&
                    video.readyState > 2
                );

                if (isPlaying) {
                    const currentTime = video.currentTime;

                    axios.post(route('lessons.update.progress'), {
                        lesson_id: lesson.id,
                        course_id: course.id,
                        user_id: user.id,
                        lesson_watched_time: currentTime,
                    }).catch(error => {
                        console.error('Progress update failed', error);
                    });
                }
            }, 5000); // Every 5 seconds

            return () => clearInterval(interval);
        }
    }, []);


    // Marking Lesson as Completed After Video Ends
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (lesson?.lesson_progress?.completed == 1) return;


        const handleEnded = () => {
            axios.post(route('lessons.update.progress'), {
                lesson_id: lesson.id,
                course_id: course.id,
                user_id: user.id,
                lesson_watched_time: video.currentTime,
                completed: true,
            }).then(response => {
                if (response.status) {
                    router.reload();
                } else {
                    alert('Failed to mark lesson complete');
                }
            }).catch(error => {
                console.error('Failed to mark lesson complete:', error);
            });
        };

        video.addEventListener('ended', handleEnded);

        return () => {
            video.removeEventListener('ended', handleEnded);
        };
    }, []);


    // Manually Marking lesson as Completed
    useEffect(() => {
        if (LessonMarkAsComplete) {
            const video = videoRef.current;
            if (!video) return;

            axios.post(route('lessons.update.progress'), {
                lesson_id: lesson.id,
                course_id: course.id,
                user_id: user.id,
                lesson_watched_time: video.duration,
                completed: true
            }).then(response => {
                if (response.status) {
                    LessonMarkAsComplete = false;
                    router.reload();

                } else {
                    alert('Failed to mark lesson complete');
                }
            }).catch(error => {
                console.error('Failed to mark lesson complete:', error);
            });
        }

    }, [LessonMarkAsComplete])



    // updateLessonProgress();
    return (
        <div className='relative'>
            <div
                className="absolute inset-0 z-20 flex mt-10 items-center justify-center  transition-opacity duration-200 pointer-events-none"
                style={{ opacity: loading ? 1 : 0, pointerEvents: loading ? 'all' : 'none' }}
            >
                <Spinner customSize="w-20 h-20" />
            </div>

            <video
                ref={videoRef}
                className="plyr-react plyr"
                controls
                controlsList="nodownload"
                src={videoUrl}
                playsInline
                poster={thumbnail}
            >
                Your browser does not support the video tag.
            </video>
        </div>
    );
}
