import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deleteContact } from 'redux/thunks';
import { faEdit, faEllipsisVertical, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { globalIcons } from 'assets/globalIcons';
import ContactModaledit from './partials/ContactModaledit';
import { Confirm } from 'notiflix';

function Contact({ contact }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);

  const [openModalEdit, setOpenModalEdit] = useState(false);

  const dispatch = useDispatch();

  const randomColor = useMemo(() => {
    const r = Math.floor(Math.random() * 96 + 128);
    const g = Math.floor(Math.random() * 96 + 128);
    const b = Math.floor(Math.random() * 96 + 128);

    return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
  }, []);

  const clickSummary = (step) => {
    switch (step) {
      case 1:
        setOpenMenu(!openMenu);
        break;
      case 2:
        setOpenMenu(false);
        setOpenDetail(false);
        break;
      default:
        setOpenDetail(!openDetail);
    }
  };

  const confirmDelete = (contact) => {
    Confirm.show(
      'Delete Confirm',
      `Be sure to delete the contact with the name: ${contact.name} ?`,
      'Yes',
      'No',
      () => {
        dispatch(deleteContact(contact.id))
      },
      () => {
        setOpenModalEdit(false)
      },
      {
        titleColor: '#c63232',
        titleFontSize: '24px',
        okButtonBackground: '#c63232',
      },
      );
  }

  return (
    <>
      <div className="border rounded-lg transition-all duration-300">
        <div className={`cursor-pointer list-none border-b flex items-center justify-between`}>
          <div onClick={() => (openMenu ? clickSummary(2) : clickSummary())} className={`pl-4 py-2 flex w-full items-center gap-[10px] ${openDetail ? '' : 'border-r'}`}>
            {!openMenu ?
              <>
                <div
                  style={{ background: randomColor }}
                  className={`w-[30px] h-[30px] rounded-[50%] uppercase flex justify-center items-center text-[18px] text-white font-light`}>{contact.name.charAt(0)}</div>
                <span className='font-semibold'>{contact.name}</span>
              </>
              :
              <div className='w-full flex gap-[10px] items-center' onClick={()=>setOpenModalEdit(true)}>
                <span>Edit</span>
                <FontAwesomeIcon icon={faEdit} />
              </div>
            }
          </div>
          <div className='relative w-[20px] h-[20px] z-[999] mx-[5px]'>
            <img onClick={clickSummary} src={globalIcons.arrowDown} alt="arrow Down icon" className={`absolute right-0 transition-all duration-300 ${openDetail ? 'opacity-0 rotate-180' : ''}`} />
            <button
              onClick={() => (openMenu ? clickSummary(2) : clickSummary(1))}
              className={`absolute ${!openDetail ? 'pointer-events-none' : ''} w-[20px] h-[20px] opacity-0 transition-all duration-300 z-[-1 ${openDetail ? '!opacity-100 rotate-180 z-[2]' : ''}]`}
            >
              <FontAwesomeIcon icon={openMenu ? faXmark : faEllipsisVertical} />
            </button>
          </div>
        </div>
        <div className={`pt-3 px-4 pb-2 absolute top-[100%] flex gap-[10px] items-center ${openDetail ? 'relative' : ''}`}>
          {!openMenu ?
            <p>{contact.number}</p>
            :
            <div className='w-full flex gap-[10px] items-center' onClick={()=>confirmDelete(contact)}>
              <span>Delete</span>
              <FontAwesomeIcon icon={faTrash} />
            </div>}
        </div>
      </div>
      <ContactModaledit setOpenModalEdit={setOpenModalEdit} openModalEdit={openModalEdit} contact={contact}/>
    </>
  );
}

Contact.propTypes = {
  contact: PropTypes.object,
};
export default Contact;
