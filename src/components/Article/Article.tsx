import { Dispatch, SetStateAction, useState } from 'react';
import placeholder from '../../assets/loading-image.gif';
import { Photo } from '../../models/Photo';
import './style.css';

interface ArticleProps {
  image: Photo;
  onClick: Dispatch<SetStateAction<string>>;
}

export default function Article({ image, onClick }: ArticleProps) {

  const { id, user, created_at, likes, alt_description, urls } = image;

  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className="article-container">
      <article key={id} className="article">
        <img
          src={isLoaded ? urls.regular : placeholder}
          alt={alt_description}
          onClick={() => onClick(id)}
          loading="lazy"
          onLoad={handleLoad}
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