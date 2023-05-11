import './Photo.css';

import {uploads} from "../../utils/config";

//components
import Message from '../../components/Message';
import { Link } from 'react-router-dom';
import PhotoItem from '../../components/PhotoItem';
import LikeContainer from '../../components/LikeContainer';

//hooks
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage';

//redux
import { getPhoto, like, comment } from '../../slices/photoSlice';

const Photo = () => {

    const {id} = useParams();

    const dispatch = useDispatch();

    const resetMessage = useResetComponentMessage(dispatch);

    const {user} = useSelector((state) => state.auth);

    const {photo, loading, message, error} = useSelector((state) => state.photo);

    //comment

    const [commentText, setCommentText] = useState("")

    //load photo data
    useEffect(() => {
        dispatch(getPhoto(id))
    }, [dispatch, id]);

    //insert a like 
    const handleLike = () => {
      dispatch(like(photo._id))

      resetMessage();
    }

    //insert a comment
    const handleComment = (e) => {
      e.preventDefault();

      const commentData = {
        comment: commentText,
        id: photo._id
      }

      dispatch(comment(commentData));

      setCommentText("");

      resetMessage();
    }

    if(loading){
        return <p>Carregando...</p>
    }

  return (
    <div id='photo'>
        <PhotoItem photo={photo} />
        <LikeContainer photo={photo} user={user} handleLike={handleLike}/>
        <div className="message-container">
          {error && <Message msg={error} type="error"/>}
          {message && <Message msg={message} type="success"/>}
        </div>
        <div className="comments">
          <h3>Comentários ({photo.comments && photo.comments.length }):</h3>
          <form onSubmit={handleComment}>
            <input type="text" placeholder='Insira o seu comentario...' onChange={(e) => setCommentText(e.target.value)} value={commentText || ""} />
            <input type="submit" value="Enviar" />
          </form>
          {photo.comments && photo.comments.length === 0 && <p>Não ha comentarios!</p>}
          {Array.isArray(photo) && photo.comment.map((comment) => (
            <div className="comment" key={comment.comment}>
              <div className="author">
                {comment.userImage && (
                  <img src={`${uploads}/users/${comment.userImage}`} alt={comment.userName}></img>
                )}
                <Link to={`/user/${comment.userId}`}>
                  <p>{comment.userName}</p>
                </Link>
              </div>
              <p>{comment.comment}</p>
            </div>
          ))}
        </div>
    </div>
  )
}

export default Photo