import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import Header from "../Header";
import Home from "../Home";
import Movie from "../Movie";
import Session from "../Session";
import Success from "../Success";

export default function App() {
    const [session, setSession] = useState([]);
    return (
        <div>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/movie/:movieId" element={<Movie />} />
                    <Route path="/session/:sessionId" element={<Session setSession={setSession}/>} />
                    <Route path="/success" element={<Success  session={session}/>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}