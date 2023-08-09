import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import Signin from "./component/Forms/Signin";
import Signup from "./component/Forms/Signup";
import UserRoute from "./component/Auth/User";
import AdminRoute from "./component/Auth/Admin";
import User from "./screens/User";
import JobDetail from "./component/Jobs/JobDetail";
import ApplyForJob from "./component/Forms/ApplyForJob";
import AppliedJobs from "./component/Jobs/AppliedJobs";
import Admin from "./screens/Admin";
import AddCompany from "./component/Forms/AddCompany";
import ApplicantList from "./component/Admin/ApplicantList";
import Footer from "./component/coman/Footer";
import AddJob from "./component/Forms/AddJob";
import ApplicantsJobList from "./component/Admin/ApplicantsJobList";
import Header from "./component/coman/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signin" element={<Signin />} />
        <Route exact path="/signup" element={<Signup />} />

        <Route exact path="/user">
          <Route path="" element={<UserRoute component={User} />} />
          <Route
            path="/user/:id"
            element={<UserRoute component={JobDetail} />}
          />
          <Route
            path="/user/applied-jobs"
            element={<UserRoute component={AppliedJobs} />}
          />
          <Route
            path="/user/apply/:id"
            element={<UserRoute component={ApplyForJob} />}
          />
        </Route>

        <Route path="/admin">
          <Route exact path="" element={<AdminRoute component={Admin} />} />
          <Route
            path="add-company"
            element={<AdminRoute component={AddCompany} />}
          />
          <Route
            path="applicants"
            element={<AdminRoute component={ApplicantList} />}
          />
          <Route path="add-job" element={<AdminRoute component={AddJob} />} />
          <Route
            path="jobs/:id"
            element={<AdminRoute component={ApplicantsJobList} />}
          />
        </Route>

        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </BrowserRouter>
  );
}
