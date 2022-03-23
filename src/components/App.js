import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import PaginaPrincipal from "./PaginaPrincipal";
import Filme from "./Filme";
import Sessao from "./Sessao";
import Sucesso from "./Sucesso";

export default function App() {
    return (
        <div>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<PaginaPrincipal />} />
                    <Route path="/filme" element={<Filme />} />
                    <Route path="/sessao" element={<Sessao />} />
                    <Route path="/sucesso" element={<Sucesso />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}