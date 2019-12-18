import React from 'react'
import { css } from '@emotion/core'
import avatar from '../../assets/avatar.jpg'
import SUPPORT_IMAGE from '../../assets/SupportMe_blue.png'

const BlogPostFooter = () => (
  <div
    style={{
      display: 'flex'
    }}
  >
    <div
      style={{
        paddingRight: 20
      }}
    >
      <img
        src={avatar}
        alt="Aman Mittal"
        style={{
          maxWidth: 80,
          borderRadius: '50%'
        }}
      />
    </div>

    <p>
      I'm <strong>Aman</strong>
      {`
           a Computer Science engineer working as an independent fullstack developer. I specialize in web & mobile platforms working with technologies such as Node.js, ReactJS, and React Native.
           I write tutorials for JavaScript Web and Mobile developers.
        `}
      .
    </p>
  </div>
)

export default BlogPostFooter
