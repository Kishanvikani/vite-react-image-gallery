import { Dispatch, SetStateAction } from 'react';
import { Photo } from '../../models/Photo';
import './style.css';

interface ArticleProps {
  image: Photo;
  onClick: Dispatch<SetStateAction<string>>;
}

export default function Article({ image, onClick }: ArticleProps) {

  const { id, user, created_at, likes, alt_description, urls } = image;

  return (
    <div className="article-container">
      <article key={id} className="article">
        <img
          src={urls.regular}
          alt={alt_description}
          onClick={() => onClick(id)}
          loading="lazy"
        />
        <div className="article-content">
          <div className="user-info">
            <img
              src={user.profile_image.medium}
              alt={user.username}
              className="user-img"
            />
            <ul>
              <li className="username">{user.name}</li>
              <li className="date">
                {new Date(created_at).toDateString()}
              </li>
            </ul>
          </div>

          <div className="user-links">
            <a
              href={`https://instagram.com/${user.instagram_username}`}
              target="_blank"
              rel="noreferrer"
            >
              {user.instagram_username}
            </a>
            <small>{likes} Likes</small>
          </div>
        </div>
      </article>
    </div>
  );
}