import { Link } from "react-router-dom";
import Login from "../pages/login";
import Dashboard from "../pages/dashboard";

function Home() {
    return (
      <>
        <main>
          <h2>Welcome to the homepage!</h2>
          <p>You can do this, I believe in you.</p>
        </main>
        <nav>
          <Link to="/about">About</Link>
        </nav>
      </>
    );
  }
  
  function About() {
    return (
      <>
        <main>
          <h2>Who are we?</h2>
          <p>
            That feels like an existential question, don't you
            think?
          </p>
        </main>
        <nav>
          <Link to="/">Home</Link>
        </nav>
      </>
    );
  }

const publicRoutes = [
    { path:"/", component: Home },
    { path:"/about", component: About },
    { path:"/login", component: Login },
    { path:"/dashboard", component: Dashboard },
];

const privateRoutes = [

];

export { publicRoutes, privateRoutes };