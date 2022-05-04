import "react-loading-skeleton/dist/skeleton.css";
import "./general.scss";

import Routers from "./routes/Routers";



export function App() {
  return (
    <div className="app">
      <Routers />
    </div>
  );
}
