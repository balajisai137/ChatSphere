import React, {
    useContext,
    useEffect,
    useState,
} from "react";

import formatTime
    from "../../utils/formatTime";
import { signOut } from "firebase/auth";

import {
    collection,
    onSnapshot,
    doc,
    updateDoc,
    serverTimestamp,
} from "firebase/firestore";

import { useNavigate } from "react-router-dom";

import { LogOut } from "lucide-react";

import { auth, db } from "../../firebase/config";

import { AuthContext }
    from "../../tempContext/AuthContext";

const Sidebar = ({
    selectedUser,
    setSelectedUser,
    mobileSidebarOpen,
    setMobileSidebarOpen,
}) => {
    const [loading, setLoading] =
        useState(true);
    const [lastMessages, setLastMessages] =
        useState({});
    const [chatUsers, setChatUsers] =
        useState([]);
    const [users, setUsers] =
        useState([]);

    const [search, setSearch] =
        useState("");

    const navigate = useNavigate();

    const { user } =
        useContext(AuthContext);
    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, "chats"),
            (snapshot) => {
                const chatPartnerIds =
                    snapshot.docs
                        .map((doc) => doc.id)
                        .filter((id) =>
                            id.includes(
                                auth.currentUser.uid
                            )
                        )
                        .map((id) => {
                            const ids = id.split("_");

                            return ids.find(
                                (uid) =>
                                    uid !==
                                    auth.currentUser.uid
                            );
                        });

                setChatUsers(chatPartnerIds);
            }
        );

        return () => unsubscribe();
    }, []);
    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, "users"),
            (snapshot) => {
                const usersData =
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));

                setUsers(usersData);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, []);
    useEffect(() => {
        const unsubscribes = [];

        users.forEach((u) => {
            const chatId = [
                auth.currentUser.uid,
                u.id,
            ]
                .sort()
                .join("_");

            const unsubscribe = onSnapshot(
                collection(
                    db,
                    "chats",
                    chatId,
                    "messages"
                ),
                (snapshot) => {
                    const messages =
                        snapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }));

                    const lastMessage =
                        messages[messages.length - 1];

                    setLastMessages((prev) => ({
                        ...prev,
                        [u.id]: lastMessage,
                    }));
                }
            );

            unsubscribes.push(unsubscribe);
        });

        return () => {
            unsubscribes.forEach((u) => u());
        };
    }, [users]);

    const handleLogout = async () => {
        try {
            await updateDoc(
                doc(
                    db,
                    "users",
                    auth.currentUser.uid
                ),
                {
                    online: false,
                    lastSeen: serverTimestamp(),
                }
            );

            await signOut(auth);

            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {/* Mobile Overlay */}
            {mobileSidebarOpen && (
                <div
                    onClick={() =>
                        setMobileSidebarOpen(false)
                    }
                    className="
          fixed
          inset-0
          bg-black/50
          z-40
          md:hidden
        "
                ></div>
            )}

            <div
                className={`
        fixed
        md:relative
        z-50
        top-0
        left-0
        h-screen
        w-90
        bg-[#050505]
        border-r
        border-white/10
        px-5
        py-6
        flex
        flex-col
        transition-all
        duration-300

        ${mobileSidebarOpen
                        ? "translate-x-0"
                        : "-translate-x-full md:translate-x-0"
                    }
      `}
            >

                {/* Glow */}
                <div
                    className="
          absolute
          top-0
          left-1/2
          -translate-x-1/2
          w-75
          h-75
          bg-fuchsia-500/10
          blur-3xl
          rounded-full
        "
                ></div>

                {/* Top Section */}
                <div
                    className="
          relative
          z-10
          flex
          items-center
          justify-between
          mb-8
        "
                >
                    {/* Logo */}
                    <div>
                        <h1
                            className="
              text-white
              text-2xl
              font-bold
              tracking-wide
            "
                        >
                            ChatSphere
                        </h1>

                        <p className="text-gray-400 text-sm">
                            {user?.email}
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        {/* Avatar */}
                        <div
                            className="
              w-12
              h-12
              rounded-full
              bg-linear-to-br
              from-fuchsia-500
              to-violet-500
              flex
              items-center
              justify-center
              text-white
              font-semibold
              shadow-[0_0_20px_rgba(192,132,252,0.35)]
            "
                        >
                            {user?.email
                                ?.charAt(0)
                                .toUpperCase()}
                        </div>

                        {/* Logout */}
                        <button
                            onClick={handleLogout}
                            className="
              w-12
              h-12
              rounded-2xl
              border
              border-white/10
              bg-white/3
              hover:bg-white/6
              text-white
              flex
              items-center
              justify-center
              transition-all
              duration-300
            "
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>

                {/* Search */}
                <div className="relative z-10 mb-6">
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        className="
            w-full
            rounded-2xl
            border
            border-white/10
            bg-white/3
            px-5
            py-4
            text-white
            placeholder:text-gray-500
            outline-none
            focus:border-fuchsia-500/40
            transition-all
          "
                    />
                </div>

                {/* Users */}
                <div
                    className="
          relative
          z-10
          flex-1
          overflow-y-auto
          space-y-3
          pr-1
        "
                >{loading ? (
                    [...Array(5)].map((_, i) => (
                        <div
                            key={i}
                            className="
        p-4
        rounded-3xl
        border
        border-white/10
        bg-white/3
        animate-pulse
        flex
        items-center
        gap-4
      "
                        >
                            {/* Avatar Skeleton */}
                            <div
                                className="
          w-14
          h-14
          rounded-full
          bg-white/10
        "
                            ></div>

                            {/* Text Skeleton */}
                            <div className="flex-1">
                                <div
                                    className="
            h-4
            w-32
            rounded
            bg-white/10
            mb-2
          "
                                ></div>

                                <div
                                    className="
            h-3
            w-20
            rounded
            bg-white/10
          "
                                ></div>
                            </div>
                        </div>
                    ))
                ) : (
                    users
                        .filter((u) => {
                            if (u.email === user?.email)
                                return false;

                            const matchesSearch =
                                u.username
                                    ?.toLowerCase()
                                    .includes(
                                        search.toLowerCase()
                                    );

                            if (search) {
                                return matchesSearch;
                            }

                            return chatUsers.includes(u.id);
                        })
                        .map((user) => (
                            <div
                                key={user.id}
                                onClick={() => {
                                    setSelectedUser(user);
                                    setMobileSidebarOpen(false);
                                }}
                                className={`
          relative
          z-10
          p-4
          rounded-3xl
          border
          flex
          items-center
          gap-4
          transition-all
          duration-300
          cursor-pointer

          ${selectedUser?.id ===
                                        user.id
                                        ? "bg-fuchsia-500/20 border-fuchsia-400/30"
                                        : "bg-white/3 border-white/10"
                                    }

          hover:bg-white/6
        `}
                            >
                                {/* Avatar */}
                                <div className="relative">
                                    <div
                                        className="
              w-14
              h-14
              rounded-full
              bg-linear-to-br
              from-fuchsia-500
              to-violet-500
              flex
              items-center
              justify-center
              text-white
              font-semibold
            "
                                    >
                                        {user.username
                                            ?.charAt(0)
                                            .toUpperCase()}
                                    </div>

                                    {/* Online */}
                                    {user.online && (
                                        <div
                                            className="
                absolute
                bottom-0
                right-0
                w-4
                h-4
                rounded-full
                bg-green-400
                border-2
                border-[#050505]
              "
                                        ></div>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div
                                        className="
              flex
              items-center
              justify-between
            "
                                    >
                                        <h2
                                            className="
                text-white
                font-medium
                truncate
              "
                                        >
                                            {user.username}
                                        </h2>

                                        <span
                                            className="
                text-xs
                text-gray-500
              "
                                        >
                                            {formatTime(
                                            lastMessages[user.id]
                                            ?.createdAt
                                            )}
                                        </span>
                                    </div>

                                    <p
                                        className="
              text-sm
              text-gray-400
              truncate
              mt-1
            "
                                    >
                                        {lastMessages[user.id]
                                            ? `${lastMessages[user.id]
                                                ?.senderId ===
                                                auth.currentUser.uid
                                                ? "You: "
                                                : ""
                                            }${lastMessages[user.id]
                                                ?.text
                                            }`
                                            : user.online
                                                ? "Online"
                                                : "Offline"}
                                    </p>
                                </div>
                            </div>
                        ))
                )}
                </div>
            </div>
        </>
    );
};

export default Sidebar;