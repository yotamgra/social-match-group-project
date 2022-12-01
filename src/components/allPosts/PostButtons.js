import { ExpandMore } from "@mui/icons-material";
import { CardActions, IconButton, Tooltip } from "@mui/material";
import { usePosts } from "../../contexts/PostsContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EmailIcon from "@mui/icons-material/Email";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
    changeInPost,
    setEditor,
    setEditForm,
    editUserPost,
  } = usePosts();

  return (
    <CardActions disableSpacing>
      <IconButton>
        <FavoriteIcon />
      </IconButton>
      <IconButton>
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

          <IconButton
            onClick={() => {
              const participantsTempArray = [...post.participants];
              participantsTempArray.push(currentUser.uid);
              editUserPost({
                ...post,
                participants: [...participantsTempArray],
              });
            }}
          >
            <AddIcon /> APPLY
          </IconButton>
        </>
      ) : (
        <></>
      )}
    </CardActions>
  );
};

export default PostButtons;
