import React from 'react'
import { motion } from 'framer-motion'
import Logo from '../assets/images/ChatGPT Image 28 mars 2025, 10_49_49.png'
import { FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const navMenu = [
  {
    id: 1,
    title: 'Accueil',
    path: '/',
    delay: 0.1,
  },
  {
    id: 2,
    title: 'Recettes',
    path: '/recettes',
    delay: 0.2,
  },
  {
    id: 3,
    title: 'Ingrédients',
    path: '/ingrédients',
    delay: 0.3,
  },
  {
    id: 4,
    title: 'Contact',
    path: '/contact',
    delay: 0.4,
  },
]

const SlideDown = (delay) => {
  return {
    initial: {
      y: '-100%',
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: delay,
      },
    },
  }
}

const NavBar = () => {
  return (
    <nav className="container flex justify-between  items-center  ">
      {/*logo section */}
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        src={Logo}
        alt="logo"
        className="w-36 rounded-full"
      />
      {/* menu */}
      <div className="flex">
        <div className="hidden md:block">
          <ul className="flex gap-6">
            {navMenu.map((menu) => {
              return (
                <motion.li
                  variants={SlideDown(menu.delay)}
                  initial="initial"
                  animate="animate"
                  key={menu.id}
                  className="nav-menu"
                  data-delay={menu.delay}
                >
                  <a
                    href={menu.path}
                    className="inline-block px-2 py-2 text-2xl"
                  >
                    {menu.title}
                  </a>
                </motion.li>
              )
            })}
          </ul>
        </div>
        {/* button */}
      </div>
      <motion.div variants={SlideDown(1)} initial="initial" animate="animate">
        {/* Bouton Connexion */}
        <Link
          to="/login"
          className="flex items-center bg-black text-white text-sm px-4 py-2 rounded-full hover:bg-red-700 transition"
        >
          <FaUser className="mr-2" />
          Connexion
        </Link>
      </motion.div>
    </nav>
  )
}

export default NavBar
