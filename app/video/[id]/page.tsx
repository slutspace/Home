'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { 
  ArrowLeftIcon, 
  HeartIcon, 
  ChatBubbleLeftIcon, 
  ShareIcon,
  PlayIcon,
  PauseIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  ArrowsPointingOutIcon
} from '@heroicons/react/24/outline'
import AppLayout from '../../components/AppLayout'

export default function VideoPage({ params }: { params: { id: string } }) {
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();
  
  // Mock video data (in a real app, this would come from an API)
  const video = {
    id: params.id,
    title: 'Getting Started with React',
    videoUrl: 'https://player.vimeo.com/video/824804225?h=06525fe05e&autoplay=1&title=0&byline=0&portrait=0&controls=0&showinfo=0&modestbranding=1&rel=0',
    views: '120K views',
    date: '2 days ago',
    likes: 1234,
    comments: 89,
    channel: {
      id: 'codemaster',
      name: 'CodeMaster',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      isVerified: true
    }
  };

  // Mock comments data
  const comments = [
    {
      id: 1,
      user: 'TechEnthusiast',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      text: 'Great tutorial! Really helped me understand the basics.',
      likes: 24,
      time: '2 hours ago'
    },
    {
      id: 2,
      user: 'CodeNewbie',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      text: 'Can you make more videos like this? Very clear explanation!',
      likes: 15,
      time: '3 hours ago'
    },
    {
      id: 3,
      user: 'WebDevPro',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      text: 'The examples are really practical. Thanks for sharing!',
      likes: 8,
      time: '5 hours ago'
    }
  ];

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setCommentText('');
  };

  const handleMouseEnter = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
  };

  const handleMouseLeave = () => {
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 1000);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!videoContainerRef.current) return;
    
    if (!isFullscreen) {
      if (videoContainerRef.current.requestFullscreen) {
        videoContainerRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  useEffect(() => {
    // Add global right-click prevention for video elements
    const handleGlobalContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('video') || target.closest('iframe')) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleGlobalContextMenu);

    return () => {
      document.removeEventListener('contextmenu', handleGlobalContextMenu);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  return (
    <AppLayout>
      <div className="min-h-screen bg-gray-900">
        {/* Back Button */}
        <div className="container mx-auto px-4 py-4">
          <Link 
            href="/library"
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Library
          </Link>
        </div>

        {/* Video Player */}
        <div className="container mx-auto px-4">
          <div 
            ref={videoContainerRef}
            className="relative aspect-video rounded-lg overflow-hidden bg-black group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onContextMenu={handleContextMenu}
          >
            <iframe
              src={video.videoUrl}
              className="absolute inset-0 w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
            
            {/* Overlay */}
            <div 
              className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/80 transition-all duration-300 ease-in-out ${
                showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              {/* Top Bar */}
              <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
                <h2 className="text-white text-lg font-medium">{video.title}</h2>
              </div>

              {/* Center Play/Pause Button */}
              <button 
                onClick={togglePlay}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                {isPlaying ? (
                  <PauseIcon className="h-8 w-8 text-white" />
                ) : (
                  <PlayIcon className="h-8 w-8 text-white" />
                )}
              </button>

              {/* Bottom Controls */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                {/* Progress Bar */}
                <div className="relative h-1 bg-gray-600 rounded-full mb-4 cursor-pointer">
                  <div 
                    className="absolute h-full bg-red-600 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={togglePlay}
                      className="text-white hover:text-gray-300 transition-colors"
                    >
                      {isPlaying ? (
                        <PauseIcon className="h-6 w-6" />
                      ) : (
                        <PlayIcon className="h-6 w-6" />
                      )}
                    </button>
                    <button 
                      onClick={toggleMute}
                      className="text-white hover:text-gray-300 transition-colors"
                    >
                      {isMuted ? (
                        <SpeakerXMarkIcon className="h-6 w-6" />
                      ) : (
                        <SpeakerWaveIcon className="h-6 w-6" />
                      )}
                    </button>
                    <div className="text-white text-sm">
                      {formatTime(progress * 100)} / {formatTime(100)}
                    </div>
                  </div>

                  <button 
                    onClick={toggleFullscreen}
                    className="text-white hover:text-gray-300 transition-colors"
                  >
                    <ArrowsPointingOutIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Video Info */}
          <div className="mt-6">
            <h1 className="text-2xl font-bold text-white mb-4">{video.title}</h1>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href={`/profile/${video.channel.id}`} className="flex items-center gap-3">
                  <img 
                    src={video.channel.avatar} 
                    alt={video.channel.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium">{video.channel.name}</span>
                      {video.channel.isVerified && (
                        <span className="text-blue-500">✓</span>
                      )}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {video.views} • {video.date}
                    </div>
                  </div>
                </Link>
              </div>

              <div className="flex items-center gap-6">
                <button 
                  onClick={() => setIsLiked(!isLiked)}
                  className={`flex items-center gap-2 ${
                    isLiked ? 'text-red-500' : 'text-gray-400 hover:text-white'
                  } transition-colors`}
                >
                  <HeartIcon className="h-6 w-6" />
                  <span>{video.likes}</span>
                </button>
                <button 
                  onClick={() => setShowComments(!showComments)}
                  className={`flex items-center gap-2 ${
                    showComments ? 'text-blue-500' : 'text-gray-400 hover:text-white'
                  } transition-colors`}
                >
                  <ChatBubbleLeftIcon className="h-6 w-6" />
                  <span>{video.comments}</span>
                </button>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <ShareIcon className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Comments Section */}
            <div 
              className={`mt-6 overflow-hidden transition-all duration-300 ease-in-out ${
                showComments ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="border-t border-gray-700 pt-6">
                {/* Comment Form */}
                <form onSubmit={handleCommentSubmit} className="mb-6">
                  <div className="flex gap-4">
                    <img 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                      alt="Your avatar"
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <input
                        type="text"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Add a comment..."
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </form>

                {/* Comments List */}
                <div className="space-y-6">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-4">
                      <img 
                        src={comment.avatar}
                        alt={comment.user}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-white font-medium">{comment.user}</span>
                          <span className="text-gray-400 text-sm">{comment.time}</span>
                        </div>
                        <p className="text-gray-300 mb-2">{comment.text}</p>
                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-1 text-gray-400 hover:text-white">
                            <HeartIcon className="h-4 w-4" />
                            <span className="text-sm">{comment.likes}</span>
                          </button>
                          <button className="text-gray-400 hover:text-white text-sm">
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
} 