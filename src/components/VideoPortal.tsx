import React, { useState } from 'react';
import { Play, Clock, User, Calendar as CalendarIcon, Upload, X } from 'lucide-react';
import { VideoTutorial } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface VideoPortalProps {
  videos: VideoTutorial[];
  isTeacher: boolean;
  onUpload: (file: File, title: string, description: string) => Promise<void>;
}

export const VideoPortal: React.FC<VideoPortalProps> = ({ videos, isTeacher, onUpload }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadForm, setUploadForm] = useState({ title: '', description: '', file: null as File | null });
  const [selectedVideo, setSelectedVideo] = useState<VideoTutorial | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (uploadForm.file && uploadForm.title) {
      await onUpload(uploadForm.file, uploadForm.title, uploadForm.description);
      setUploadForm({ title: '', description: '', file: null });
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-serif italic text-stone-900">Violin Tutorials</h2>
          <p className="text-stone-500 mt-1">Master your technique with these brief video clips.</p>
        </div>
        {isTeacher && (
          <button
            onClick={() => setIsUploading(true)}
            className="flex items-center gap-2 px-6 py-3 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-all shadow-lg shadow-stone-200"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Clip</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <motion.div
            key={video.id}
            layoutId={video.id}
            onClick={() => setSelectedVideo(video)}
            className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-black/5 hover:shadow-xl transition-all"
          >
            <div className="aspect-video bg-stone-100 relative overflow-hidden">
              <video 
                src={video.videoUrl} 
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                muted
                playsInline
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all">
                <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 text-stone-900 fill-current" />
                </div>
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-medium text-stone-900 group-hover:text-stone-700 transition-colors line-clamp-1">
                {video.title}
              </h3>
              <p className="text-sm text-stone-500 mt-1 line-clamp-2">{video.description}</p>
              <div className="flex items-center gap-4 mt-4 text-[10px] uppercase tracking-widest font-bold text-stone-400">
                <div className="flex items-center gap-1">
                  <CalendarIcon className="w-3 h-3" />
                  <span>{new Date(video.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {isUploading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl"
            >
              <div className="p-6 border-bottom border-black/5 flex items-center justify-between">
                <h3 className="text-xl font-serif italic">Upload Tutorial Clip</h3>
                <button onClick={() => setIsUploading(false)} className="p-2 hover:bg-stone-100 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Title</label>
                  <input
                    type="text"
                    required
                    value={uploadForm.title}
                    onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                    className="w-full px-4 py-3 bg-stone-50 border border-black/5 rounded-xl focus:ring-2 focus:ring-stone-900 outline-none transition-all"
                    placeholder="e.g., Proper Bow Hold Technique"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Description</label>
                  <textarea
                    value={uploadForm.description}
                    onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                    className="w-full px-4 py-3 bg-stone-50 border border-black/5 rounded-xl focus:ring-2 focus:ring-stone-900 outline-none transition-all h-24"
                    placeholder="Briefly explain what this clip covers..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Video File</label>
                  <div className="relative group">
                    <input
                      type="file"
                      accept="video/*"
                      required
                      onChange={(e) => setUploadForm({ ...uploadForm, file: e.target.files?.[0] || null })}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="w-full px-4 py-8 bg-stone-50 border-2 border-dashed border-stone-200 rounded-2xl flex flex-col items-center justify-center group-hover:border-stone-400 transition-all">
                      <Upload className="w-8 h-8 text-stone-300 mb-2" />
                      <span className="text-sm text-stone-500">
                        {uploadForm.file ? uploadForm.file.name : 'Click or drag video file'}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-stone-900 text-white rounded-xl font-medium hover:bg-stone-800 transition-all shadow-lg"
                >
                  Start Upload
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Video Player Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <motion.div
              layoutId={selectedVideo.id}
              className="w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden relative"
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all"
              >
                <X className="w-6 h-6" />
              </button>
              <video
                src={selectedVideo.videoUrl}
                controls
                autoPlay
                className="w-full h-full"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent text-white">
                <h3 className="text-2xl font-serif italic">{selectedVideo.title}</h3>
                <p className="text-white/60 mt-2 max-w-2xl">{selectedVideo.description}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
