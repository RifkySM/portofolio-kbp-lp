"use client"

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import Image from "next/image";
import Head from "next/head";
import CommentSection from "@/components/news/comments";

export default function Page() {
    const params = useParams();
    const seo = params.seo;
    const [post, setPost] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/news/${seo}`);
                const json = await response.json();
                setPost(json.data || {});
            } catch (error) {
                console.error("Error fetching post:", error);
                setPost({});
            }
        };
        fetchData();
    }, [seo]);

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
                        {post.id && <CommentSection post={post} />}
                    </div>
                </div>
            </main>
        </>
    );
}
