import React, { useState, useEffect } from 'react';
import locationImg from '../assets/location.svg';
import UzbFlag from '../assets/uzb.svg';
import RusFlag from '../assets/rus.svg';
import UzumLogo from '../assets/uzumLogo.svg';
import KatalogImg from '../assets/katalog.png';
import Profile from '../assets/profile.svg';
import Like from '../assets/like.svg';
import MobileLogo from '../assets/mobilLogo.png';
import Cart from '../assets/cart.svg';
import TrueHeaderImg from '../assets/true.png';
import StarHeaderImg from '../assets/star.png';
import Search from '../assets/search.svg';
import MobileIcon from '../assets/mobileIcon.png';
import { Link, useNavigate } from 'react-router-dom';

function Header({ onSearch }) {
  const [location, setLocation] = useState("Joylashuv aniqlanmoqda...");
  const [langBtn, setLangBtn] = useState(false);
  const [lang, setLang] = useState(localStorage.getItem('lang') || "O'zbekcha");
  const [flag, setFlag] = useState(localStorage.getItem('lang') === "Русский" ? RusFlag : UzbFlag);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await response.json();
            setLocation(data.address.city || data.address.town || data.address.village || "Joylashuv aniqlanmadi");
          } catch (error) {
            setLocation("Joylashuvni aniqlashda xatolik yuz berdi");
          }
        },
        () => {
          setLocation("Joylashuvga ruxsat berilmadi");
        }
      );
    } else {
      setLocation("Brauzeringiz geolokatsiyani qo‘llab-quvvatlamaydi");
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 65) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const storedLang = localStorage.getItem('lang');
    if (storedLang) {
      setLang(storedLang);
      setFlag(storedLang === "Русский" ? RusFlag : UzbFlag);
    }
  }, []);

  function handleNavigateDownload() {
    window.open("https://play.google.com/store/apps/details?id=uz.uzum.app&hl=ru&pli=1", "_blank");
  }

  function handleNavigateLiked() {
    navigate("/liked");
  }

  function handleNavigateCart() {
    navigate("/cart");
  }

  function handleLanguageChange() {
    const newLang = lang === "O'zbekcha" ? "Русский" : "O'zbekcha";
    const newFlag = newLang === "Русский" ? RusFlag : UzbFlag;

    setLang(newLang);
    setFlag(newFlag);
    setLangBtn(false);

    localStorage.setItem('lang', newLang);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
    navigate(`/search?query=${searchTerm}`);
  };

  return (
    <div className='font-display text-sm font-medium'>
      <div className='xl:block max-[1280px]:hidden'>
        <div className='flex items-center justify-between px-36 py-1.5 bg-[#F2F4F7]'>
          <div className='flex items-center gap-6'>
            <div className='flex items-center gap-1.5'>
              <img src={locationImg} alt="Location" />
              <Link to="/" className='underline cursor-pointer'>{location}</Link>
            </div>
            <Link to="/" className='cursor-pointer'>Topshirish punktlari</Link>
          </div>
          <div className='flex items-center gap-4'>
            <Link to="/" className='text-[#7F4DFF] hover:text-[#7000FF] cursor-pointer'>Stouvchi bo'lish</Link>
            <div className='w-[2px] h-[12px] bg-slate-400'></div>
            <Link to="/" className='text-[#7F4DFF] hover:text-[#7000FF] cursor-pointer'>Topshirish punktini ochish</Link>
            <Link to="/" className='text-[#595B66] cursor-pointer hover:text-black'>Savol-javoblar</Link>
            <Link to="/" className='text-[#595B66] cursor-pointer hover:text-black'>Buyurtmalarim</Link>
            <div className='relative'>
              <button onClick={() => { setLangBtn(!langBtn) }} className='cursor-pointer flex items-center gap-1.5'>
                <img src={flag} alt="" width={20} />
                {lang}
              </button>
              <button onClick={handleLanguageChange} className={`transition-all duration-500 ${langBtn ? "opacity-100" : "opacity-0 hidden"} flex items-center gap-1.5 absolute -bottom-[38px] bg-white rounded-bl-[10px] rounded-br-[10px] shadow-md px-3 w-[120px] cursor-pointer hover:bg-gray-100 py-1.5`}>
                <img src={flag === RusFlag ? UzbFlag : RusFlag} alt="" width={20} />
                {lang === "O'zbekcha" ? "Русский" : "O'zbekcha"}
              </button>
            </div>
          </div>
        </div>
        <div className='px-36 flex items-center gap-8 pt-[18px] pb-2.5'>
          <Link to="/"><img src={UzumLogo} alt="" /></Link>
          <div className='flex items-center gap-2 flex-grow'>
            <button className='text-[#7000FF] transition-all duration-200 bg-[#F0F0FF] py-2 px-[18px] rounded hover:bg-[#CECCFF] flex items-center cursor-pointer gap-2'>
              <img src={KatalogImg} alt="" />Katalog
            </button>
            <div className='flex flex-grow'>
              <form onSubmit={handleSearch} className='flex flex-grow'>
                <input
                  className='outline-none border-2 border-[#D7D7D9] border-r-0 rounded-tr-[0px] rounded-br-[0px] py-1.5 h-[41px] pl-4 flex-grow'
                  type="text"
                  placeholder='Mahsulotlarni izlash'
                  value={searchTerm}
                  onChange={(e) => onSearch(e.target.value)}
                />
                <button type="submit" className='py-1 border-2 border-[#D7D7D9] border-l-0 rounded-tl-[0px] rounded-bl-[0px] bg-[#F2F4F7] cursor-pointer rounded-sm px-6'>
                  <img src={Search} alt="" />
                </button>
              </form>
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <button className='cursor-pointer flex items-center gap-2 hover:bg-gray-200 py-2 rounded-sm px-2'>
              <img src={Profile} alt="" />Kirish
            </button>
            <button onClick={handleNavigateLiked} className='cursor-pointer flex items-center gap-2 hover:bg-gray-200 py-2 rounded-sm px-2'>
              <img src={Like} alt="" />Saralangan
            </button>
            <button onClick={handleNavigateCart} className='cursor-pointer flex items-center gap-2 hover:bg-gray-200 py-2 rounded-sm px-2'>
              <img src={Cart} alt="" />Savat
            </button>
          </div>
        </div>
        <div className='py-4 px-36 sm:hidden xl:flex items-center justify-center gap-5'>
          <div className='flex items-center gap-5'>
            <Link className='flex gap-1 items-center font-semibold' to='/'><img src={StarHeaderImg} alt="" width={25} />Hafta tovarlari</Link>
            <Link className='flex gap-1 items-center font-semibold' to='/'><img src={TrueHeaderImg} alt="" width={25} />Hafta tovarlari</Link>
          </div>
          <ul className='items-center flex gap-5'>
            <li><Link className='font-normal text-[#6E707A] transition-all duration-150 hover:text-black' to='/'>Elektronika</Link></li>
            <li><Link className='font-normal text-[#6E707A] transition-all duration-150 hover:text-black' to='/'>Maishiy texnika</Link></li>
            <li><Link className='font-normal text-[#6E707A] transition-all duration-150 hover:text-black' to='/'>Kiyim</Link></li>
            <li><Link className='font-normal text-[#6E707A] transition-all duration-150 hover:text-black' to='/'>Poyabzallar</Link></li>
            <li><Link className='font-normal text-[#6E707A] transition-all duration-150 hover:text-black' to='/'>Aksessuarlar</Link></li>
            <li><Link className='font-normal text-[#6E707A] transition-all duration-150 hover:text-black' to='/'>Goʻzallik va parvarish</Link></li>
            <li><Link className='font-normal text-[#6E707A] transition-all duration-150 hover:text-black' to='/'>Salomatlik</Link></li>
            <li><Link className='font-normal text-[#6E707A] transition-all duration-150 hover:text-black' to='/'>Uy-roʻzgʻor buyumlari</Link></li>
          </ul>
        </div>
      </div>
      <div className='xl:hidden bg-white text-base sm:block'>
        <div>
          <div className='flex border-b-1 border-gray-100 items-center justify-between px-8 py-2'>
            <div className='flex items-center gap-3'>
              <img src={MobileLogo} alt="" width={35} />
              <div className='flex flex-col items-start'>
                <span className='text-md font-normal'>Uzum Market</span>
                <span className='text-[10px] font-normal'>Ilovani yuklab olish</span>
              </div>
            </div>
            <button onClick={handleNavigateDownload} className='py-1.5 text-md font-medium px-6 bg-[#7000FF] text-white rounded-xl'>Yuklab olish</button>
          </div>
          <div className={`px-8 fixed py-2 gap-4 flex bg-white w-full items-center justify-between ${isFixed ? "fixed top-0 z-40" : "static"}`}>
            <div className='rounded-xl px-3 gap-2.5 flex bg-[#DEE0E5] items-center flex-1'>
              <img src={Search} alt="" width={25} />
              <input className='w-full py-2.5 border-0 outline-0 bg-transparent' type="text" placeholder='Mahsulotlar va turkumlar izlash' />
            </div>
            <Link to="/liked">
              <img src={Like} alt="" width={30} />
            </Link>
          </div>
        </div>

        <div className='fixed z-40 bottom-0 border-t-1 bg-white border-gray-300 w-full py-2.5 px-4'>
          <nav>
            <ul className='flex items-center justify-between'>
              <li><Link className='flex text-sm gap-1 text-gray-500 flex-col items-center' to='/'><img src={MobileIcon} alt='' width={25} />Bosh sahifa</Link></li>
              <li><Link className='flex text-sm gap-1 text-gray-500 flex-col items-center' to='/'><img src={Search} alt='' width={25} />Katalaog</Link></li>
              <li><Link className='flex text-sm gap-1 text-gray-500 flex-col items-center' to='/cart'><img src={Cart} alt='' width={25} />Savat</Link></li>
              <li><Link className='flex text-sm gap-1 text-gray-500 flex-col items-center' to='/liked'><img src={Like} alt='' width={25} />Saralangan</Link></li>
              <li><Link className='flex text-sm gap-1 text-gray-500 flex-col items-center' to='/'><img src={Profile} alt='' width={25} />Kabinet</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Header;
