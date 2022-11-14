import React from 'react';
import './feed.css';
import imgPost from '../../img/tennis.png';

export const Post = () => {
    return (
        <div className="post-container">
            <div>
                <img src={imgPost} alt="post_image" />
                <div className="post-user">Posted by Mattias</div>
                <div className="post-time">4 days ago</div>
                <div className="post-text">
                    <textarea className="post-textarea" readOnly={true}>
                        I like to play tennis.
                        Have played since 2015.
                        Looking for a challenge.
                    </textarea>
                </div>
            </div>
        </div>
    )
}