import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Web3Context } from '../context/Web3Context';

const FloatingActions = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentAccount } = useContext(Web3Context);

  const actions = [
    ...(currentAccount ? [
      { 
        to: '/dashboard', 
        icon: '📊', 
        label: 'Dashboard',
        color: 'from-blue-500 to-cyan-500'
      }
    ] : []),
    { 
      to: '/faq', 
      icon: '❓', 
      label: 'FAQ',
      color: 'from-purple-500 to-pink-500'
    },
    { 
      href: 'mailto:van45.1050252@st.qnu.edu.vn', 
      icon: '✉️', 
      label: 'Liên hệ',
      color: 'from-green-500 to-emerald-500'
    },
  ];

  return (
    <div className="fixed bottom-8 right-8 z-40 flex flex-col-reverse items-end gap-4">
      {/* Action Buttons */}
      {isOpen && actions.map((action, index) => (
        action.to ? (
          <Link
            key={index}
            to={action.to}
            onClick={() => setIsOpen(false)}
            className={`group flex items-center gap-3 animate-fadeIn`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <span className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 rounded-full shadow-lg text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {action.label}
            </span>
            <div className={`w-14 h-14 bg-gradient-to-br ${action.color} rounded-full shadow-2xl flex items-center justify-center text-2xl hover:scale-110 transition-transform cursor-pointer`}>
              {action.icon}
            </div>
          </Link>
        ) : (
          <a
            key={index}
            href={action.href}
            onClick={() => setIsOpen(false)}
            className={`group flex items-center gap-3 animate-fadeIn`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <span className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 rounded-full shadow-lg text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {action.label}
            </span>
            <div className={`w-14 h-14 bg-gradient-to-br ${action.color} rounded-full shadow-2xl flex items-center justify-center text-2xl hover:scale-110 transition-transform cursor-pointer`}>
              {action.icon}
            </div>
          </a>
        )
      ))}

      {/* Main FAB Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:shadow-3xl transition-all duration-300 ${
          isOpen ? 'rotate-45' : ''
        }`}
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
};

export default FloatingActions;
