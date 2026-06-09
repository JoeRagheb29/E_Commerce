import { Link, useLocation } from "react-router";
import { useState } from "react";
import "./Nav.css";

function Navbar() {
  const [cartCount, setCartCount] = useState(3);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      setSearchQuery("");
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid px-lg-5">
          {/* Logo */}
          <Link className="navbar-brand" to="/">
            <span className="brand-icon">🛍️</span>
            <span className="brand-text">E-Commerce</span>
          </Link>

          {/* Mobile Toggle */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Desktop Navigation */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === "/About" ? "active" : ""}`}
                  to="/About"
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Contact
                </Link>
              </li>
            </ul>

            {/* Search Bar */}
            <form
              className="search-form me-lg-3 mb-2 mb-lg-0"
              onSubmit={handleSearch}
            >
              <div className="search-container">
                <input
                  className="search-input"
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search"
                />
                <button className="search-btn" type="submit">
                  <span>🔍</span>
                </button>
              </div>
            </form>

            {/* Right Actions */}
            <div className="navbar-actions d-flex align-items-center gap-2">
              {/* Cart Icon */}
              <Link
                to="/"
                className="action-btn cart-btn"
                title="Shopping Cart"
              >
                <span className="cart-icon">🛒</span>
                {cartCount > 0 && (
                  <span className="cart-badge">{cartCount}</span>
                )}
              </Link>

              {/* Wishlist Icon */}
              <Link to="/" className="action-btn wishlist-btn" title="Wishlist">
                <span className="wishlist-icon">❤️</span>
              </Link>

              {/* User Menu */}
              <div className="user-menu-wrapper">
                <button
                  className="action-btn user-btn"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  title="User Account"
                >
                  <span className="user-icon">👤</span>
                </button>
                {showUserMenu && (
                  <div className="user-dropdown">
                    <Link to="/" className="dropdown-item">
                      My Account
                    </Link>
                    <Link to="/" className="dropdown-item">
                      Orders
                    </Link>
                    <Link to="/" className="dropdown-item">
                      Wishlist
                    </Link>
                    <hr className="dropdown-divider" />
                    <button className="dropdown-item">Logout</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasLabel">
            E-Commerce
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav flex-grow-1 pe-3">
            <li className="nav-item">
              <Link className="nav-link" to="/" data-bs-dismiss="offcanvas">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/About"
                data-bs-dismiss="offcanvas"
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/" data-bs-dismiss="offcanvas">
                Contact
              </Link>
            </li>
            <hr />
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <span className="me-2">🛒</span> Cart{" "}
                <span className="badge bg-primary ms-2">{cartCount}</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <span className="me-2">❤️</span> Wishlist
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <span className="me-2">👤</span> My Account
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;