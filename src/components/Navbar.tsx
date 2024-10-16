import LogoutIcon from '../assets/logout.svg'
export default function Navbar() {
  return (
    <nav className="w-full h-[100px] bg-[#0EA5E9] flex justify-between items-center px-20">
      <h1 className="text-4xl text-white font-black tracking-[15px]">CINEMA</h1>
      <ul className="flex gap-12 text-white items-center">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/favorites">Favorites</a>
        </li>
        <li>
          <a href="/watchlists">Watchlists</a>
        </li>
        <li>
          <a href="/logout">
            <img src={LogoutIcon} alt="logout" />
          </a>
        </li>
      </ul>
    </nav>
  )
}
