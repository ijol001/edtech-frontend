import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/signuploginmodel');
  };

  const features = [
    { name: 'Data Structure',  originalPrice: 1000, discount: 10 },
    { name: 'Web Development',  originalPrice: 2000, discount: 10 },
    { name: 'Machine Learning',   originalPrice: 3000, discount: 10 },
  ];
  
    const handleFeatureClick = (feature) => {
        navigate('/signuploginmodel', {state: { feature }})
        

    };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <header className="w-full bg-fuchsia-900 p-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-right">
          <h1 className="text-white text-3xl font-bold italic font-serif">LearnWell</h1>
          <nav className="space-x-4 mt-4 md:mt-0 font-serif">
            <a href="#" className="text-white">Home</a>
            <a href="#" className="text-white">Features</a>
            <a href="#" className="text-white">Pricing</a>
            <a href="#" className="text-white">Contact</a>
          </nav>
        </div>
      </header>

      <main className=" flex flex-col items-center mt-8 px-4 md:px-0 ">
    
        <section className="text-center mb-12 mt-8 ">
          <h2 className="text-5xl font-bold text-gray-800 mb-4 font-serif text-black">Welcome to LearnWell</h2>
          <p className="text-black text-lg text-gray-600 mb-9 italic">The best place to learn and grow your skills</p>
          <button className="bg-orange-600 text-white px-8 py-4 rounded" onClick={handleSignUpClick}>Sign Up Now</button>
        </section>

        <section className="container mx-auto mb-12">
          <h3 className="text-4xl font-bold text-gray-800 text-center mb-8 text-black font-sans">Courses We Offer</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature) => (
          <div key={feature.name} className="bg-white p-6 rounded shadow-md text-center">
            <h2 className="text-2xl font-bold mb-4">{feature.name}</h2>
            <p className="text-gray-700 mb-2">Original Price: ${feature.originalPrice}</p>
            <p className="text-green-500 mb-4">Discount: {feature.discount}%</p>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => handleFeatureClick(feature)}
            >
              Learn More
            </button>
          </div>
        ))}
      </div>
        </section>

        <section className="bg-indigo-200 w-full py-12 mb-12">
          <div className="container mx-auto text-center">
            <h3 className="text-3xl font-bold text-gray-800 mb-8">What Our Users Say</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6">
                <p className="text-gray-600 mb-4">"This platform has transformed the way I learn. The courses are amazing!"</p>
                <h4 className="text-xl font-bold">John Doe</h4>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">"I love the flexibility and the quality of the content. Highly recommend it!"</p>
                <h4 className="text-xl font-bold">Jane Smith</h4>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">"The instructors are top-notch and the courses are very engaging."</p>
                <h4 className="text-xl font-bold">Michael Johnson</h4>
              </div>
            </div>
          </div>
        </section>

        <section className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-800 mb-8 text-black">Ready to Start Learning?</h3>
          <button className="bg-blue-600 text-white px-8 py-4 rounded" onClick={handleSignUpClick}>Join us Today</button>
        </section>
      </main>

      <footer className="w-full bg-fuchsia-900 p-4 mt-auto">
        <div className="container mx-auto text-white flex flex-col md:flex-row justify-between items-center">
          <p className="mb-4 md:mb-0">&copy; 2024 LearnWell</p>
          <div className="space-x-4">
            <a href="#" className="text-white">Privacy Policy</a>
            <a href="#" className="text-white">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
