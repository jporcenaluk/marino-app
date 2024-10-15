import { useNavigate } from "react-router-dom";

function Footer() {

  const navigate = useNavigate()
  const handleNavigateStats = () => {
    navigate('/stats');
  };

  return (
    <footer className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <div>
        Made by <a className="underline" href="https://jaredporcenaluk.com">Jared Porcenaluk</a> & <a className="underline" href="https://sarahporcenaluk.com">Sarah Porcenaluk</a>. Made with the assistance of Gen AI.
      </div>
      <button className="underline" onClick={handleNavigateStats}>Stats</button>
    </footer>
  )
}

export default Footer;