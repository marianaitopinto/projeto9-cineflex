import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../Header";
import Home from "../Home";
import Movie from "../Movie";
import Session from "../Session";
import Success from "../Success";

export default function App() {
    return (
        <div>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/movie" element={<Movie />} />
                    <Route path="/session" element={<Session />} />
                    <Route path="/success" element={<Success />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}