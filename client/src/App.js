// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import HomePage from './components/HomePage';
// import AdminLogin from './components/AdminLogin';
// import AdminDashboard from './components/AdminDashboard';
// import Examination from './components/Examination';
// import About from './components/About';
// import TransferCertificate from './components/TransferCertificate';
// import Alumni from './components/Alumni';
// import Admission from './components/Admission';
// import AcademicCorner from './components/AcademicCorner';
// import Gallery from './components/Gallery';
// import Events from './components/Events';
// import Result from './components/Result';
// import Contact from './components/Contact';
// import './App.css';

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           <Route path="/admin" element={<AdminLogin />} />
//           <Route path="/admin/dashboard" element={<AdminDashboard />} />
//           <Route path="/*" element={
//             <div>
//               <Navbar />
//               <Routes>
//                 <Route path="/" element={<HomePage />} />
//                 {/* <Route path="/examination" element={<Examination />} /> */}
//                 <Route path="/about" element={<About />} />
//                 <Route path="/transfer" element={<TransferCertificate />} />
//                 <Route path="/alumni" element={<Alumni />} />
//                 <Route path="/admission" element={<Admission />} />
//                 <Route path="/academic" element={<AcademicCorner />} />
//                 <Route path="/gallery" element={<Gallery />} />
//                 <Route path="/events" element={<Events />} />
//                 <Route path="/result" element={<Result />} />
//                 <Route path="/contact" element={<Contact />} />
//               </Routes>
//             </div>
//           } />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

//src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import AboutMangalaSchool from './components/AboutMangalaSchool';
import Leadership from './components/Leadership';
import WhyMangalaSchool from './components/WhyMangalaSchool';
import TransferCertificate from './components/TransferCertificate';
import Alumni from './components/Alumni';
import Admission from './components/Admission';
import AcademicCorner from './components/AcademicCorner';
import Gallery from './components/Gallery';
import MandatoryPublicDisclosure from './components/MandatoryPublicDisclosure';
import NotificationsCircular from './components/NotificationsCircular';
import Result from './components/Result';
import Contact from './components/Contact';
import './App.css';
import Footer from './components/Footer';
import EventsNews from './components/EventsNews';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/*" element={
            <div>
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                {/* About routes */}
                <Route path="/about/mangala-school" element={<AboutMangalaSchool />} />
                <Route path="/about/leadership" element={<Leadership />} />
                <Route path="/about/why-mangala-school" element={<WhyMangalaSchool />} />
                {/* Other routes */}
                <Route path="/tc" element={<TransferCertificate />} />
                <Route path="/alumni" element={<Alumni />} />
                <Route path="/admissions" element={<Admission />} />
                <Route path="/academic-corner" element={<AcademicCorner />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/eventsnews" element={<EventsNews />} />
                <Route path="/mandatory-public-disclosure" element={<MandatoryPublicDisclosure />} />
                <Route path="/notifications-circular" element={<NotificationsCircular />} />
                <Route path="/contact" element={<Contact />} />
                {/* Keep result route for existing functionality */}
                <Route path="/result" element={<Result />} />
              </Routes>
              <Footer />
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;