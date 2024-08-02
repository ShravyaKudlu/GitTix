import Link from "next/link";

export default ({ currentUser }) => {
  const links = [
    !currentUser && { label: "Sign Up", href: "/auth/signup" },
    !currentUser && { label: "Sign In", href: "/auth/signin" },
    currentUser && { label: "Sell Tickets", href: "/tickets/new" },
    currentUser && { label: "My Order", href: "/orders" },
    currentUser && { label: "Sign Out", href: "/auth/signout" },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <li
          key={href}
          className="nav-item"
        >
          <Link
            href={href}
            passHref
            legacyBehavior
          >
            <a
              className="nav-link"
              style={{ color: "white", textDecoration: "none" }}
            >
              {label}
            </a>
          </Link>
        </li>
      );
    });

  return (
    <nav className="navbar navbar-dark bg-dark">
      <Link
        href="/"
        className="navbar-brand"
        style={{ color: "white" }}
      >
        GitTix
      </Link>
      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">{links}</ul>
      </div>
    </nav>
  );
};
