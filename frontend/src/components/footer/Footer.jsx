const Footer = (dark ) => {
  return (
    <footer className={dark ? "bg-gray-700 py-5 mt-7.5 text-white" : "bg-white py-5 mt-7.5 text-black"}>
      <div className="container mx-auto flex justify-around items-center">
        <div className="legal">
          <p>
            2025 CSE-C students <span className="text-green-500">3Rd Year</span>
          </p>
        </div>
        <ul className="flex">
          <li className="ml-4">About Us</li>
          <li className="ml-4">Help</li>
          <li className="ml-4">Contact Us</li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
