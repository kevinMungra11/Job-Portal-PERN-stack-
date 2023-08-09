import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";
import { toast } from "react-toastify";

const Header = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white fs-5 shadow-sm p-3 bg-white rounded">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarExample01">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item active">
                <Link className="nav-link" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              {!user.isSignedIn && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signin">
                      Signin
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">
                      Signup
                    </Link>
                  </li>
                </>
              )}
              {user.isSignedIn && user.isAdmin && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin/add-company">
                      Add Company
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin/add-job">
                      Add Job
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin/applicants">
                      See Applicants
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin">
                      Job list
                    </Link>
                  </li>
                </>
              )}
              {user.isSignedIn && !user.isAdmin && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/user">
                      Explore
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/user/applied-jobs">
                      Applied-Jobs
                    </Link>
                  </li>
                </>
              )}
              {user.isSignedIn && (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      onClick={() => {
                        localStorage.clear();
                        toast("logout");
                        dispatch(setUser(""));
                      }}
                      to={"/"}
                    >
                      Logout
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
