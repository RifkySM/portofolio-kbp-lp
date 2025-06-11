"use client"

import axiosClient from "@/lib/axiosClient";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import Image from "next/image";
import Head from "next/head";

export default function Page() {
    const params = useParams();
    const seo = params.seo;
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosClient.get(`/post/slug/${seo}`);
                setPost(response.data.data || {});
            } catch (error) {
                console.error("Error fetching post:", error);
                setPost({});
            }
        };
        fetchData();
    }, [seo]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axiosClient.get(`/post-comment?post_id=${post.id}&paginate=false`);
                setComments(response.data.data || []);
            } catch (error) {
                console.error("Error fetching comments:", error);
                setComments([]);
            }
        };
        if (post.id) {
            fetchComments();
        }
    }, [post.id]);

    const handleLike = async () => {
        try {
            await axiosClient.patch(`/post/like/${post.id}`);

            setPost(prev => ({
                ...prev,
                total_likes: (prev.total_likes || 0) + 1
            }));
        } catch (error) {
            console.error("Error liking the post:", error);
        }
    };

    return (
        <>
            <Head>
                <title>{post.title || 'Detail Postingan'}</title>
                <meta name="description" content={post.meta_description || 'Deskripsi tidak tersedia'} />
            </Head>
            <main className="min-h-screen bg-white">
                <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <p className="text-black text-sm mb-2">
                            {dayjs(post.created_at).locale('id').format('dddd, D MMMM YYYY')}
                        </p>
                        <h1 className="text-3xl sm:text-4xl text-black font-bold mb-4">
                            {post.title}
                        </h1>

                        <div className="relative w-full max-h-[400px] overflow-hidden rounded-lg mb-8">
                            <Image
                                src={post.thumbnail || '/default-thumbnail.jpg'}
                                alt={post.title || 'News article thumbnail image'}
                                width={800}
                                height={400}
                                className="w-full h-auto object-cover"
                                priority
                            />
                            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-b from-transparent to-black" />
                        </div>

                        <div className="text-black prose max-w-none mb-10" dangerouslySetInnerHTML={{ __html: post.content }} />

                        {/* Comment Section */}
                        <div className="mt-10">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-semibold text-black">Komentar ({post.comment_count})</h2>

                                <button
                                    onClick={handleLike}
                                    className="text-2xl font-semibold text-black flex items-center gap-2 focus:outline-none"
                                    aria-label="Like this post"
                                >
                                    Likes ({post.total_likes})
                                    <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                    </svg>
                                </button>
                            </div>

                            {comments.length > 0 ? (
                                <div className="space-y-6">
                                    {comments.map((comment) => (
                                        <div key={comment.id} className="p-4 border border-gray-200 rounded-lg">
                                            <p className="text-sm font-semibold text-gray-700">
                                                {comment.user.name || "Anonim"}
                                            </p>
                                            <p className="text-sm text-gray-500 mb-2">
                                                {dayjs(comment.created_at).locale('id').format('D MMMM YYYY HH:mm')}
                                            </p>
                                            <p className="text-gray-800">{comment.comment}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500">Belum ada komentar.</p>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
