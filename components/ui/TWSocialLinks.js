import React from 'react';
import { FaTwitter, FaInstagram, FaDev } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { SiGithub, SiMedium, SiHashnode } from 'react-icons/si';

import { BlogConfig } from '../../blog-config';

const IconButton = ({ iconName, iconLink }) => {
  return (
    <a
      href={iconLink}
      className="text-purple-500 text-lg hover:bg-purple-200 rounded-md p-2"
      target="_blank"
      rel="noreferrer">
      {iconName}
    </a>
  );
};

const TWSocialLinks = () => {
  return (
    <div className="flex justify-around items-center md:pb-8 md:pt-4 md:mb-4">
      <IconButton iconName={<FaTwitter />} iconLink={BlogConfig.twitter} />
      <IconButton iconName={<SiGithub />} iconLink={BlogConfig.github} />
      <IconButton iconName={<SiMedium />} iconLink={BlogConfig.medium} />
      <IconButton iconName={<FaDev />} iconLink={BlogConfig.devto} />
      <IconButton iconName={<SiHashnode />} iconLink={BlogConfig.hashnode} />
      <IconButton
        iconName={<HiOutlineMail />}
        iconLink={BlogConfig.mailAddress}
      />
    </div>
  );
};

export default TWSocialLinks;
