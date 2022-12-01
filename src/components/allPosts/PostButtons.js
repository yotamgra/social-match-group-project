import { ExpandMore } from "@mui/icons-material";
import { CardActions, IconButton } from "@mui/material";
import { usePosts } from "../../contexts/PostsContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EmailIcon from "@mui/icons-material/Email";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useAuth } from "../../contexts/AuthContext";

const PostButtons = ({ post, index, expanded, setExpanded }) => {
  const { currentUser } = useAuth();
  const { editUserPost } = usePosts();

  return (
    <CardActions disableSpacing>
      <IconButton>
        <FavoriteIcon />
      </IconButton>
      <IconButton>
        <EmailIcon />
      </IconButton>
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
        <AddIcon /> Apply
      </IconButton>
    </CardActions>
  );
};

export default PostButtons;
