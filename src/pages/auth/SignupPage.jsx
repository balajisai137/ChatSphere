import React from 'react'
import { Link } from "react-router-dom";
import { useState } from "react";

import { auth, db } from "../../firebase/config";
import {
    signupUser,
} from "../../services/authService";

const SignupPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const handleSignup = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            await signupUser(
                username,
                email,
                password
            );

            alert(
                "Account created successfully!"
            );
        } catch (error) {
            console.log(error.message);
            alert(error.message);
        }
    };
    return (

        <div className="min-h-screen bg-[#050505] flex items-center justify-center overflow-hidden relative px-4">
            {/* Premium Background */}
            <div className="absolute inset-0 bg-[#050505]"></div>

            {/* Top Glow */}
            <div className="absolute -top-30 left-1/2 -translate-x-1/2 w-225 h-125 bg-fuchsia-600/25 blur-3xl rounded-full"></div>

            {/* Bottom Right Glow */}
            <div className="absolute -bottom-37.5 -right-25 w-125 h-125 bg-violet-500/20 blur-3xl rounded-full"></div>

            {/* Left Accent Glow */}
            <div className="absolute top-1/3 -left-25 w-75 h-75 bg-pink-500/10 blur-3xl rounded-full"></div>

            {/* Subtle Grid */}
            <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-size-[60px_60px]"></div>

            {/* Signup Card */}
            <div className="relative z-10 w-full max-w-md rounded-4xl border border-white/15 bg-white/4 backdrop-blur-2xl shadow-[0_0_60px_rgba(192,132,252,0.35)] p-8 text-white">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-semibold tracking-tight mb-2">
                        Create Account
                    </h1>

                    <p className="text-sm text-gray-400">
                        Join and start chatting instantly
                    </p>
                </div>

                {/* Form */}
                <form className="space-y-5"
                    onSubmit={handleSignup}
                >
                    {/* Username */}
                    <div>
                        <label className="block text-sm mb-2 text-gray-300">
                            Username
                        </label>

                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            placeholder="Enter your username"
                            className="w-full rounded-2xl border border-white/10 bg-white/3 px-4 py-3 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-400 focus:shadow-[0_0_20px_rgba(192,132,252,0.25)]"
                        />
                    </div>


                    {/* Email */}
                    <div>
                        <label className="block text-sm mb-2 text-gray-300">
                            Email Address
                        </label>

                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Enter your email"
                            className="w-full rounded-2xl border border-white/10 bg-white/3 px-4 py-3 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-400 focus:shadow-[0_0_20px_rgba(192,132,252,0.25)]"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm mb-2 text-gray-300">
                            Password
                        </label>

                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Create a password"
                            className="w-full rounded-2xl border border-white/10 bg-white/3 px-4 py-3 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-400 focus:shadow-[0_0_20px_rgba(192,132,252,0.25)]"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm mb-2 text-gray-300">
                            Confirm Password
                        </label>

                        <input
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                            type="password"
                            placeholder="Confirm your password"
                            className="w-full rounded-2xl border border-white/10 bg-white/3 px-4 py-3 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-400 focus:shadow-[0_0_20px_rgba(192,132,252,0.25)]"
                        />
                    </div>

                    {/* Terms */}
                    <div className="flex items-start gap-2 text-sm text-gray-400">
                        <input type="checkbox" className="accent-fuchsia-500 mt-1" />

                        <p>
                            I agree to the
                            <span className="text-fuchsia-400 cursor-pointer hover:text-fuchsia-300 ml-1">
                                Terms & Conditions
                            </span>
                        </p>
                    </div>

                    {/* Signup Button */}
                    <button
                        type="submit"
                        className="w-full rounded-2xl bg-white text-black py-3 font-medium hover:bg-gray-200 transition-all duration-300"
                    >
                        Create Account
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-4 my-6">
                    <div className="flex-1 h-px bg-white/10"></div>
                    <span className="text-sm text-gray-500">OR</span>
                    <div className="flex-1 h-px bg-white/10"></div>
                </div>

                {/* Social Buttons */}
                <div className="space-y-3">
                    <button className="w-full rounded-2xl border border-white/10 bg-white/3 py-3 hover:bg-white/6 transition-all duration-300">
                        Continue with Google
                    </button>

                    <button className="w-full rounded-2xl border border-white/10 bg-white/3 py-3 hover:bg-white/6 transition-all duration-300">
                        Continue with GitHub
                    </button>
                </div>

                {/* Footer */}
                <p className="text-center text-sm text-gray-400 mt-8">
                    Already have an account?

                    <Link
                        to='/'
                        className="text-fuchsia-400 ml-1 hover:text-fuchsia-300 cursor-pointer transition-colors">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>

    )
}

export default SignupPage
