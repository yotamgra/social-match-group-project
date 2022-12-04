import { CardActions, IconButton, Tooltip } from "@mui/material";
import { usePosts } from "../../contexts/PostsContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EmailIcon from "@mui/icons-material/Email";
import { useAuth } from "../../contexts/AuthContext";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

const PostButtons = ({ post, index, expanded, setExpanded }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const {
    deleteUserPost,
    setChangeInPosts,
    setEditor,
    setEditForm,
    editUserPost,
  } = usePosts();

  return (
    <CardActions disableSpacing>
      <IconButton>
        <FavoriteIcon />
      </IconButton>
      <IconButton
        onClick={() => (window.location = `mailto:${post.user.email}`)}
      >
        <EmailIcon />
      </IconButton>
      {expanded[index] ? (
        <>
          {currentUser.uid === post.user.userId ? (
            <>
              {" "}
              <Tooltip title="Delete" placement="top">
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    deleteUserPost(post.id);

                    setChangeInPosts(true);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit" placement="top">
                <IconButton
                  aria-label="edit"
                  onClick={() => {
                    setChangeInPosts(true);
                    setEditor(true);
                    setEditForm({ ...post });
                    navigate("/new-post");
                  }}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <></>
          )}
          {currentUser.uid !== post.user.userId ? (
            <>
              {post.participants.includes(currentUser.uid) ? (
                <IconButton
                  onClick={() => {
                    setChangeInPosts(true);
                    let participantsTempArray = [...post.participants];
                    const participantToDelete = currentUser.uid;

                    participantsTempArray = participantsTempArray.filter(
                      (participant) => participant !== participantToDelete
                    );

                    editUserPost({
                      ...post,
                      participants: [...participantsTempArray],
                    });
                  }}
                >
                  REMOVE
                </IconButton>
              ) : (
                <IconButton
                  onClick={() => {
                    setChangeInPosts(true);
                    const participantsTempArray = [...post.participants];
                    participantsTempArray.push(currentUser.uid);
                    editUserPost({
                      ...post,
                      participants: [...participantsTempArray],
                    });
                  }}
                >
                  APPLY
                </IconButton>
              )}
            </>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </CardActions>
  );
};

export default PostButtons;
