"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/id";
import Cookies from "js-cookie";

const CommentSection = ({ post }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [alreadyLiked, setAlreadyLiked] = useState(false);
    const [userData, setUserData] = useState({});
    const [likesCount, setLikesCount] = useState(0);

    useEffect(() => {
        const token = Cookies.get("access_token");
        setIsLoggedIn(!!token);
        fetchUserData();
        fetchComments(1);
        fetchLikeCount(); // <- Tambahkan ini
    }, []);


    useEffect(() => {
        if (userData?.id && post?.id) {
            checkLikeStatus();
        }
    }, [userData?.id]);

    const fetchUserData = async () => {
        try {
            const res = await fetch("/api/auth/me");
            const data = await res.json();
            setUserData(data?.data || {});
        } catch (err) {
            console.error("Failed to fetch user data:", err);
        }
    };

    const fetchComments = async (page = 1, append = false) => {
        try {
            const res = await fetch(`/api/post-comment?post_id=${post.id}&page=${page}`);
            const data = await res.json();

            const fetchedComments = data?.data?.data || [];
            const pagination = data?.data?.pagination;

            if (append) {
                setComments((prev) => [...prev, ...fetchedComments]);
            } else {
                setComments(fetchedComments);
            }

            setCurrentPage(pagination?.currentPage || page);
            setHasNextPage(pagination?.nextPage !== null);
        } catch (error) {
            console.error("Failed to load comments:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchLikeCount = async () => {
        try {
            const res = await fetch(`/api/post-like/${post.id}`);
            const data = await res.json();
            setLikesCount(data?.data?.count || 0);
        } catch (err) {
            console.error("Failed to fetch like count:", err);
        }
    };

    const checkLikeStatus = async () => {
        try {
            const res = await fetch(`/api/post-like?post_id=${post.id}&user_id=${userData.id}`);
            const data = await res.json();
            console.log("Like status:", data);
            setAlreadyLiked(data?.data?.liked || false);
        } catch (err) {
            console.error("Failed to check like status:", err);
        }
    };

    const handleLike = async () => {
        if (!isLoggedIn || !userData?.id) return;

        try {
            const method = alreadyLiked ? "DELETE" : "POST";

            const res = await fetch("/api/post-like", {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    post_id: post.id,
                    user_id: userData.id,
                }),
            });

            if (!res.ok) {
                const err = await res.json();
                console.error("Error liking/unliking post:", err);
                return;
            }

            await fetchLikeCount();
            setAlreadyLiked((prev) => !prev);
        } catch (error) {
            console.error("Error liking/unliking post:", error);
        }
    };

    const handleSubmitComment = async () => {
        if (!newComment.trim()) return;
        setSubmitting(true);

        try {
            const res = await fetch("/api/post-comment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    post_id: post.id,
                    comment: newComment,
                }),
            });

            if (res.ok) {
                const newData = await res.json();
                setComments((prev) => [newData.data, ...prev]);
                setNewComment("");
            } else {
                const err = await res.json();
                alert(err?.error || "Gagal mengirim komentar");
            }
        } catch (error) {
            console.error("Gagal kirim komentar:", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="mt-10">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-black">
                    Komentar ({comments.length})
                </h2>

                <button
                    onClick={handleLike}
                    disabled={!isLoggedIn}
                    className={`text-2xl font-semibold text-black flex items-center gap-2 focus:outline-none ${!isLoggedIn ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    aria-label="Like or unlike this post"
                >
                    Likes ({likesCount})
                    {alreadyLiked ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            className="bi bi-heart-fill text-red-500"
                            viewBox="0 0 16 16"
                        >
                            <path
                                fillRule="evenodd"
                                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            className="bi bi-heart text-red-500"
                            viewBox="0 0 16 16"
                        >
                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                        </svg>
                    )}

                </button>


            </div>

            {
                isLoggedIn ? (
                    <div className="mb-6">
                        <textarea
                            className="w-full p-3 border rounded-lg resize-none text-sm text-black"
                            rows={3}
                            placeholder="Tulis komentar..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <button
                            onClick={handleSubmitComment}
                            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm disabled:opacity-50"
                            disabled={submitting || !newComment.trim()}
                        >
                            {submitting ? "Mengirim..." : "Kirim Komentar"}
                        </button>
                    </div>
                ) : (
                    <div className="mb-6 p-4 border border-yellow-300 bg-yellow-50 rounded-lg flex items-center gap-3">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-yellow-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-9 3a1 1 0 112 0v1a1 1 0 01-2 0v-1zm1-7a1 1 0 00-.993.883L9 7v4a1 1 0 001.993.117L11 11V7a1 1 0 00-1-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <p className="text-sm text-yellow-800">
                            Anda harus{" "}
                            <a href="/login" className="font-semibold text-blue-600 hover:underline">
                                login
                            </a>{" "}
                            terlebih dahulu untuk menulis komentar.
                        </p>
                    </div>
                )
            }

            {
                loading ? (
                    <p className="text-gray-500">Memuat komentar...</p>
                ) : comments.length > 0 ? (
                    <>
                        <div className="space-y-6">
                            {comments.map((comment) => (
                                <div key={comment.id} className="p-4 border border-gray-200 rounded-lg">
                                    <p className="text-sm font-semibold text-gray-700">
                                        {comment.user?.name || "Anonim"}
                                    </p>
                                    <p className="text-sm text-gray-500 mb-2">
                                        {dayjs(comment.created_at).locale("id").format("D MMMM YYYY HH:mm")}
                                    </p>
                                    <p className="text-gray-800">{comment.comment}</p>
                                </div>
                            ))}
                        </div>
                        {hasNextPage && (
                            <div className="mt-4 flex justify-center">
                                <button
                                    onClick={() => fetchComments(currentPage + 1, true)}
                                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm"
                                >
                                    Muat Komentar Lainnya
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <p className="text-gray-500">Belum ada komentar.</p>
                )
            }
        </div >
    );
};

export default CommentSection;
